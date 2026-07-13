import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";
import type { Property } from "@/types/property";

const COLUMNS = ["Imobiliária", "Tipo", "Bairro", "Cidade", "Preço", "Publicado", "Ação"];

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR");

function formatPublicadoEm(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return dateFormatter.format(parsed);
}

interface ResultsTableProps {
  properties: Property[];
  isLoading?: boolean;
  hasSearched?: boolean;
}

export function ResultsTable({ properties, isLoading = false, hasSearched = false }: ResultsTableProps) {
  return (
    <Card className="border-border/60 shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-foreground">Resultados</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {COLUMNS.map((col) => (
                <TableHead key={col} className="text-xs font-medium text-muted-foreground">
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={COLUMNS.length} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <p className="text-sm">Buscando oportunidades...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : properties.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={COLUMNS.length} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Search className="h-5 w-5" />
                    <p className="text-sm">
                      {hasSearched
                        ? "Nenhum resultado encontrado."
                        : "Nenhum resultado ainda. Use a busca acima para consultar os anúncios."}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="text-sm font-medium text-foreground">{property.imobiliaria}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{property.tipo}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{property.bairro}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{property.cidade}</TableCell>
                  <TableCell className="text-sm text-foreground">
                    {currencyFormatter.format(property.preco)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatPublicadoEm(property.publicadoEm)}
                  </TableCell>
                  <TableCell>
                    <Button asChild size="sm" variant="outline">
                      <a href={property.link} target="_blank" rel="noreferrer">
                        Abrir anúncio
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
