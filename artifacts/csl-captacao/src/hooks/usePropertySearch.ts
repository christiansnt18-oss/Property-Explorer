import { useState, useCallback } from "react";
import type { Property } from "@/types/property";
import { searchProperties as searchQuintoAndar } from "@/services/quintoandar";
import { searchProperties as searchAuxiliadora } from "@/services/auxiliadora";
import { searchProperties as searchGuarida } from "@/services/guarida";

interface UsePropertySearchResult {
  results: Property[];
  isLoading: boolean;
  error: Error | null;
  hasSearched: boolean;
  lastUpdatedAt: Date | null;
  search: () => Promise<void>;
}

// Preparado para futuras integrações com QuintoAndar, Auxiliadora Predial e Guarida.
// Por enquanto, cada serviço retorna dados fictícios (mock); quando as integrações reais
// forem implementadas, esta função continuará com a mesma assinatura e comportamento.
export function usePropertySearch(): UsePropertySearchResult {
  const [results, setResults] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);

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
      setLastUpdatedAt(new Date());
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Erro ao buscar imóveis"));
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  }, []);

  return { results, isLoading, error, hasSearched, lastUpdatedAt, search };
}
