// Ponto de entrada da camada de API/Backend do CSL Radar. Centraliza as exportações
// públicas desta camada para que o restante do app (ex.: hooks) possa migrar
// gradualmente para ela sem precisar conhecer a estrutura interna de `providers/`.
export type { PropertyProvider, PropertyFilters } from "@/api/types";
export { ProviderManager, providerManager } from "@/api/providerManager";
export type { AggregatedSearchResult } from "@/api/providerManager";
export { QuintoAndarProvider, quintoAndarProvider } from "@/api/providers/quintoandar";
export { AuxiliadoraProvider, auxiliadoraProvider } from "@/api/providers/auxiliadora";
export { GuaridaProvider, guaridaProvider } from "@/api/providers/guarida";
