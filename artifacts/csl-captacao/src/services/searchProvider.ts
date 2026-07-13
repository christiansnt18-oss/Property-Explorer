import type { SearchResult } from "@/types/search";
import { searchProperties as searchQuintoAndar } from "@/services/quintoandar";
import { searchProperties as searchAuxiliadora } from "@/services/auxiliadora";
import { searchProperties as searchGuarida } from "@/services/guarida";

const SERVICE_TIMEOUT_MS = 10_000;

interface RegisteredService {
  source: string;
  run: () => Promise<SearchResult>;
}

// Registro central dos serviços de busca. Adicionar uma nova imobiliária no futuro
// significa apenas registrar sua função `searchProperties` aqui.
const REGISTERED_SERVICES: RegisteredService[] = [
  { source: "QuintoAndar", run: searchQuintoAndar },
  { source: "Auxiliadora Predial", run: searchAuxiliadora },
  { source: "Guarida", run: searchGuarida },
];

function runWithTimeout(service: RegisteredService): Promise<SearchResult> {
  const start = performance.now();

  return new Promise((resolve) => {
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      resolve({
        success: false,
        source: service.source,
        properties: [],
        executionTime: (performance.now() - start) / 1000,
        error: `Tempo limite excedido (${SERVICE_TIMEOUT_MS / 1000}s)`,
      });
    }, SERVICE_TIMEOUT_MS);

    service
      .run()
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
        resolve({
          success: false,
          source: service.source,
          properties: [],
          executionTime: (performance.now() - start) / 1000,
          error: err instanceof Error ? err.message : "Erro desconhecido",
        });
      });
  });
}

// Centraliza todas as buscas: executa cada serviço isoladamente, aplicando um timeout
// e tratamento de erro individual — a falha (ou lentidão) de um serviço nunca impede
// que os demais retornem seus resultados normalmente.
export const SearchProvider = {
  searchAll(): Promise<SearchResult[]> {
    return Promise.all(REGISTERED_SERVICES.map(runWithTimeout));
  },
};
