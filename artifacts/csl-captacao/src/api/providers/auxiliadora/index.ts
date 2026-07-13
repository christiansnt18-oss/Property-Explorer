import type { PropertyProvider, PropertyFilters } from "@/api/types";
import type { SearchResult } from "@/types/search";
import { searchProperties } from "@/services/auxiliadora";

// Adapter para a Auxiliadora Predial. Hoje delega para o serviço mock existente em
// src/services/auxiliadora.ts. Quando a integração real for implementada, apenas o
// corpo de `search()` muda — o restante da arquitetura permanece intacto.
export class AuxiliadoraProvider implements PropertyProvider {
  readonly source = "Auxiliadora Predial";

  async search(_filters?: PropertyFilters): Promise<SearchResult> {
    return searchProperties();
  }
}

export const auxiliadoraProvider = new AuxiliadoraProvider();
