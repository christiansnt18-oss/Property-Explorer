import type { Property } from "./property";

// Formato padronizado que cada serviço de busca (QuintoAndar, Auxiliadora, Guarida, e
// futuras integrações) deve retornar. Permite que o SearchProvider e o dashboard tratem
// todos os serviços da mesma forma, independente da fonte de dados.
export interface SearchResult {
  success: boolean;
  source: string;
  properties: Property[];
  executionTime: number;
  error?: string;
}
