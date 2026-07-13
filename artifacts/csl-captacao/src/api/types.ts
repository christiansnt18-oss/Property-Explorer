import type { SearchResult } from "@/types/search";

// Filtros de busca aceitos por um provider. Hoje o formulário de filtros (Filters)
// ainda não está conectado a nenhuma busca real, então este tipo fica propositalmente
// aberto/flexível — será refinado quando os filtros forem de fato ligados a um provider.
export type PropertyFilters = Record<string, unknown>;

// Contrato único que toda imobiliária (provider) deve implementar. É a única coisa que
// o ProviderManager e o restante do sistema conhecem — a forma como cada provider obtém
// os dados (JSON server-side, API interna, HTML, etc.) fica encapsulada na implementação.
export interface PropertyProvider {
  readonly source: string;
  search(filters?: PropertyFilters): Promise<SearchResult>;
}
