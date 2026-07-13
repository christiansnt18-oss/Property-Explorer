import { cn } from "@/lib/utils";

// Identidade visual discreta por imobiliária, usada em toda a aplicação
// sempre que o nome de uma imobiliária for exibido como badge.
const IMOBILIARIA_STYLES: Record<string, string> = {
  QuintoAndar: "bg-blue-50 text-blue-700 border-blue-200",
  "Auxiliadora Predial": "bg-green-50 text-green-700 border-green-200",
  Guarida: "bg-red-50 text-red-700 border-red-200",
};

const DEFAULT_STYLE = "bg-muted text-muted-foreground border-border";

interface ImobiliariaBadgeProps {
  nome: string;
  className?: string;
}

export function ImobiliariaBadge({ nome, className }: ImobiliariaBadgeProps) {
  const style = IMOBILIARIA_STYLES[nome] ?? DEFAULT_STYLE;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium",
        style,
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {nome}
    </span>
  );
}
