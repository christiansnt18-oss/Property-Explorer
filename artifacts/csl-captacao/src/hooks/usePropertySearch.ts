import { useState, useCallback } from "react";
import type { Property } from "@/types/property";
import { searchProperties as searchQuintoAndar } from "@/services/quintoandar";
import { searchProperties as searchAuxiliadora } from "@/services/auxiliadora";
import { searchProperties as searchGuarida } from "@/services/guarida";

interface UsePropertySearchResult {
  results: Property[];
  isLoading: boolean;
  error: Error | null;
  search: () => Promise<void>;
}

// Preparado para futuras integrações com QuintoAndar, Auxiliadora Predial e Guarida.
// Nenhuma busca real é executada ainda — cada serviço retorna uma lista vazia por enquanto.
export function usePropertySearch(): UsePropertySearchResult {
  const [results, setResults] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [quintoAndar, auxiliadora, guarida] = await Promise.all([
        searchQuintoAndar(),
        searchAuxiliadora(),
        searchGuarida(),
      ]);

      setResults([...quintoAndar, ...auxiliadora, ...guarida]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Erro ao buscar imóveis"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { results, isLoading, error, search };
}
