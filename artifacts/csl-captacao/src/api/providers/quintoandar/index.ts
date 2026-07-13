import type { PropertyProvider, PropertyFilters } from "@/api/types";
import type { SearchResult } from "@/types/search";
import { searchProperties } from "@/services/quintoandar";

// Adapter para o QuintoAndar. Hoje delega para o serviço mock existente em
// src/services/quintoandar.ts. Quando a integração real for implementada (ex.: extração
// do JSON server-side da página de busca), apenas o corpo de `search()` muda — o
// ProviderManager, o hook e a UI continuam funcionando sem nenhuma alteração.
export class QuintoAndarProvider implements PropertyProvider {
  readonly source = "QuintoAndar";

  async search(_filters?: PropertyFilters): Promise<SearchResult> {
    return searchProperties();
  }
}

export const quintoAndarProvider = new QuintoAndarProvider();
