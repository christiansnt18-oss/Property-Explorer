import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IMOBILIARIAS = ["QuintoAndar", "Auxiliadora Predial", "Guarida"];

export function Filters() {
  return (
    <Card className="border-border/60 shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-foreground">Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-1.5">
            <Label htmlFor="filter-cidade" className="text-xs text-muted-foreground">
              Cidade
            </Label>
            <Input id="filter-cidade" placeholder="Ex: Porto Alegre" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="filter-bairro" className="text-xs text-muted-foreground">
              Bairro
            </Label>
            <Input id="filter-bairro" placeholder="Ex: Moinhos de Vento" />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Faixa de preço</Label>
            <div className="flex items-center gap-2">
              <Input placeholder="Mín." />
              <span className="text-muted-foreground">–</span>
              <Input placeholder="Máx." />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Dormitórios</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Qualquer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Tipo de imóvel</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Qualquer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="cobertura">Cobertura</SelectItem>
                <SelectItem value="comercial">Comercial</SelectItem>
                <SelectItem value="terreno">Terreno</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2 border-t border-border/60 pt-4">
          <Label className="text-xs text-muted-foreground">Imobiliárias</Label>
          <div className="flex flex-wrap gap-6">
            {IMOBILIARIAS.map((nome) => (
              <div key={nome} className="flex items-center gap-2">
                <Checkbox id={`imob-${nome}`} defaultChecked />
                <Label htmlFor={`imob-${nome}`} className="text-sm font-normal text-foreground">
                  {nome}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
