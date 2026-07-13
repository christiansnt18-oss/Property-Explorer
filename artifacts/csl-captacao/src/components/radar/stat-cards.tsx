import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Clock, History } from "lucide-react";

interface StatCardsProps {
  novos: number;
  quintoAndar: number;
  auxiliadora: number;
  guarida: number;
  ultimaAtualizacao: Date | null;
  ultimasDuasHoras: number;
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
const timeFormatter = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" });

export function StatCards({
  novos,
  quintoAndar,
  auxiliadora,
  guarida,
  ultimaAtualizacao,
  ultimasDuasHoras,
}: StatCardsProps) {
  const stats = [
    { label: "Novos desde a última consulta", value: novos, accent: true },
    { label: "QuintoAndar", value: quintoAndar },
    { label: "Auxiliadora Predial", value: auxiliadora },
    { label: "Guarida", value: guarida },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="border-border/60 shadow-none transition-colors hover:border-border"
        >
          <CardContent className="flex items-center justify-between p-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-semibold tracking-tight text-foreground">{stat.value}</p>
            </div>
            {stat.accent && (
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <Card className="border-border/60 shadow-none transition-colors hover:border-border">
        <CardContent className="flex items-center justify-between p-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Última atualização</p>
            {ultimaAtualizacao ? (
              <div className="leading-tight">
                <p className="text-lg font-semibold tracking-tight text-foreground">
                  {dateFormatter.format(ultimaAtualizacao)}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  {timeFormatter.format(ultimaAtualizacao)}
                </p>
              </div>
            ) : (
              <p className="text-lg font-semibold tracking-tight text-muted-foreground">—</p>
            )}
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <Clock className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 shadow-none transition-colors hover:border-border">
        <CardContent className="flex items-center justify-between p-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Últimas 2 horas</p>
            <p className="text-2xl font-semibold tracking-tight text-foreground">{ultimasDuasHoras}</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <History className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
