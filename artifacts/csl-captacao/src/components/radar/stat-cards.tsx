import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface StatCardsProps {
  novos: number;
  quintoAndar: number;
  auxiliadora: number;
  guarida: number;
}

export function StatCards({ novos, quintoAndar, auxiliadora, guarida }: StatCardsProps) {
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
    </div>
  );
}
