import type { PropertyProvider, PropertyFilters } from "@/api/types";
import type { Property } from "@/types/property";
import type { SearchResult } from "@/types/search";
import { quintoAndarProvider } from "@/api/providers/quintoandar";
import { auxiliadoraProvider } from "@/api/providers/auxiliadora";
import { guaridaProvider } from "@/api/providers/guarida";

const PROVIDER_TIMEOUT_MS = 10_000;

export interface AggregatedSearchResult {
  properties: Property[];
  providerResults: SearchResult[];
}

function timeoutResult(provider: PropertyProvider, start: number): SearchResult {
  return {
    success: false,
    source: provider.source,
    properties: [],
    executionTime: (performance.now() - start) / 1000,
    error: `Tempo limite excedido (${PROVIDER_TIMEOUT_MS / 1000}s)`,
  };
}

function errorResult(provider: PropertyProvider, start: number, err: unknown): SearchResult {
  return {
    success: false,
    source: provider.source,
    properties: [],
    executionTime: (performance.now() - start) / 1000,
    error: err instanceof Error ? err.message : "Erro desconhecido",
  };
}

// Centraliza o ciclo de vida de todos os providers de imóveis: registro, execução em
// paralelo, timeout individual e tratamento de erro isolado por provider — a falha (ou
// lentidão) de um nunca impede que os demais retornem seus resultados normalmente.
// Adicionar uma nova imobiliária no futuro é apenas chamar `register(...)` com um novo
// PropertyProvider; nenhuma outra parte do sistema precisa mudar.
export class ProviderManager {
  private providers: PropertyProvider[] = [];

  register(provider: PropertyProvider): void {
    this.providers.push(provider);
  }

  private runWithTimeout(provider: PropertyProvider, filters?: PropertyFilters): Promise<SearchResult> {
    const start = performance.now();

    return new Promise((resolve) => {
      let settled = false;

      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        resolve(timeoutResult(provider, start));
      }, PROVIDER_TIMEOUT_MS);

      provider
        .search(filters)
        .then((result) => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          resolve(result);
        })
        .catch((err) => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          resolve(errorResult(provider, start, err));
        });
    });
  }

  async searchAll(filters?: PropertyFilters): Promise<AggregatedSearchResult> {
    const providerResults = await Promise.all(
      this.providers.map((provider) => this.runWithTimeout(provider, filters)),
    );

    return {
      properties: providerResults.flatMap((result) => result.properties),
      providerResults,
    };
  }
}

// Instância padrão da aplicação, já com os três providers atuais registrados.
export const providerManager = new ProviderManager();
providerManager.register(quintoAndarProvider);
providerManager.register(auxiliadoraProvider);
providerManager.register(guaridaProvider);
