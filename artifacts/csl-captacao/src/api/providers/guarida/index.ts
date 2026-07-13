import type { PropertyProvider, PropertyFilters } from "@/api/types";
import type { SearchResult } from "@/types/search";
import { searchProperties } from "@/services/guarida";

// Adapter para a Guarida. Hoje delega para o serviço mock existente em
// src/services/guarida.ts. Quando a integração real for implementada, apenas o corpo
// de `search()` muda — o restante da arquitetura permanece intacto.
export class GuaridaProvider implements PropertyProvider {
  readonly source = "Guarida";

  async search(_filters?: PropertyFilters): Promise<SearchResult> {
    return searchProperties();
  }
}

export const guaridaProvider = new GuaridaProvider();
