import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SearchResult } from "@/types/search";

interface ServiceStatusProps {
  statuses: SearchResult[];
}

// Exibe o status (online/erro) e o tempo de resposta de cada serviço da última busca.
// Alimentado pelos objetos SearchResult retornados pelo SearchProvider.
export function ServiceStatus({ statuses }: ServiceStatusProps) {
  if (statuses.length === 0) return null;

  return (
    <Card className="border-border/60 shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-foreground">Status dos serviços</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-x-8 gap-y-3">
        {statuses.map((status) => (
          <div key={status.source} className="flex items-center gap-2">
            <span
              className={cn("h-2 w-2 shrink-0 rounded-full", status.success ? "bg-green-500" : "bg-red-500")}
              aria-hidden
            />
            <span className="text-sm font-medium text-foreground">{status.source}</span>
            <span className={cn("text-xs font-medium", status.success ? "text-muted-foreground" : "text-red-600")}>
              {status.success ? "Online" : "Erro"}
            </span>
            <span className="text-xs text-muted-foreground">
              {status.success ? `${status.executionTime.toFixed(1)}s` : "—"}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
