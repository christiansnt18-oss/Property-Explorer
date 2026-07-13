import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, RefreshCw } from "lucide-react";
import { StatCards } from "@/components/radar/stat-cards";
import { Filters } from "@/components/radar/filters";
import { ResultsTable } from "@/components/radar/results-table";
import { usePropertySearch } from "@/hooks/usePropertySearch";

// Valor fictício enquanto não existe cálculo real de imóveis publicados nas últimas 2 horas.
const MOCK_ULTIMAS_DUAS_HORAS = 4;

export function Home() {
  const { results, isLoading, hasSearched, lastUpdatedAt, search } = usePropertySearch();

  const novos = results.length;
  const quintoAndar = results.filter((p) => p.imobiliaria === "QuintoAndar").length;
  const auxiliadora = results.filter((p) => p.imobiliaria === "Auxiliadora Predial").length;
  const guarida = results.filter((p) => p.imobiliaria === "Guarida").length;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 p-4 md:p-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">CSL Radar</h1>
        <p className="text-sm text-muted-foreground">
          Monitore novos anúncios de imóveis nos principais portais parceiros.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Pesquisar por endereço, bairro ou código do anúncio" className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button className="sm:w-auto" onClick={() => search()} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <span aria-hidden>🔍</span>}
            Buscar oportunidades
          </Button>
          <Button
            variant="secondary"
            className="sm:w-auto"
            onClick={() => search()}
            disabled={isLoading}
            aria-label="Atualizar"
          >
            <RefreshCw className={isLoading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
            Atualizar
          </Button>
        </div>
      </div>

      <StatCards
        novos={novos}
        quintoAndar={quintoAndar}
        auxiliadora={auxiliadora}
        guarida={guarida}
        ultimaAtualizacao={lastUpdatedAt}
        ultimasDuasHoras={hasSearched ? MOCK_ULTIMAS_DUAS_HORAS : 0}
      />

      <Filters />

      <ResultsTable properties={results} isLoading={isLoading} hasSearched={hasSearched} />
    </div>
  );
}
