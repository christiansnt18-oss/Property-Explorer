import { useState, useCallback } from "react";
import type { Property } from "@/types/property";
import type { SearchResult } from "@/types/search";
import { SearchProvider } from "@/services/searchProvider";

interface UsePropertySearchResult {
  results: Property[];
  serviceStatuses: SearchResult[];
  isLoading: boolean;
  error: Error | null;
  hasSearched: boolean;
  lastUpdatedAt: Date | null;
  search: () => Promise<void>;
}

// Preparado para futuras integrações com QuintoAndar, Auxiliadora Predial e Guarida.
// Toda a orquestração das buscas (timeout, erro individual por serviço) é responsabilidade
// do SearchProvider; este hook apenas expõe o resultado agregado para a interface.
export function usePropertySearch(): UsePropertySearchResult {
  const [results, setResults] = useState<Property[]>([]);
  const [serviceStatuses, setServiceStatuses] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);

  const search = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const searchResults = await SearchProvider.searchAll();

      setServiceStatuses(searchResults);
      setResults(searchResults.flatMap((result) => result.properties));
      setLastUpdatedAt(new Date());
    } catch (err) {
      // SearchProvider já trata falhas por serviço individualmente; este catch cobre
      // apenas um erro inesperado na própria orquestração.
      setError(err instanceof Error ? err : new Error("Erro ao buscar imóveis"));
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  }, []);

  return { results, serviceStatuses, isLoading, error, hasSearched, lastUpdatedAt, search };
}
