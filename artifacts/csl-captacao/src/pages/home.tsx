import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { StatCards } from "@/components/radar/stat-cards";
import { Filters } from "@/components/radar/filters";
import { ResultsTable } from "@/components/radar/results-table";
import { usePropertySearch } from "@/hooks/usePropertySearch";

export function Home() {
  const { results, isLoading, hasSearched, search } = usePropertySearch();

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
        <Button className="sm:w-auto" onClick={() => search()} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Buscar imóveis
        </Button>
      </div>

      <StatCards novos={novos} quintoAndar={quintoAndar} auxiliadora={auxiliadora} guarida={guarida} />

      <Filters />

      <ResultsTable properties={results} isLoading={isLoading} hasSearched={hasSearched} />
    </div>
  );
}
