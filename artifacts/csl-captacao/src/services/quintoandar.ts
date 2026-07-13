import type { Property } from "@/types/property";
import type { SearchResult } from "@/types/search";

const SOURCE = "QuintoAndar";

// Dados fictícios (mock) enquanto a integração real com o QuintoAndar não existe.
// Quando a integração for implementada, esta função deve manter a mesma assinatura
// (Promise<SearchResult>) e apenas trocar a origem dos dados pelo array abaixo.
const MOCK_PROPERTIES: Property[] = [
  {
    id: "quintoandar-1",
    titulo: "Apartamento 2 dorms próximo ao parque",
    bairro: "Moinhos de Vento",
    cidade: "Porto Alegre",
    preco: 3200,
    quartos: 2,
    tipo: "Apartamento",
    imobiliaria: SOURCE,
    link: "https://www.quintoandar.com.br/imovel/fake-1",
    publicadoEm: "2026-07-10",
  },
  {
    id: "quintoandar-2",
    titulo: "Studio mobiliado no Centro Histórico",
    bairro: "Centro",
    cidade: "Porto Alegre",
    preco: 1800,
    quartos: 1,
    tipo: "Studio",
    imobiliaria: SOURCE,
    link: "https://www.quintoandar.com.br/imovel/fake-2",
    publicadoEm: "2026-07-11",
  },
  {
    id: "quintoandar-3",
    titulo: "Casa 3 dorms com pátio na Floresta",
    bairro: "Floresta",
    cidade: "Porto Alegre",
    preco: 4500,
    quartos: 3,
    tipo: "Casa",
    imobiliaria: SOURCE,
    link: "https://www.quintoandar.com.br/imovel/fake-3",
    publicadoEm: "2026-07-11",
  },
  {
    id: "quintoandar-4",
    titulo: "Cobertura duplex na Auxiliadora",
    bairro: "Auxiliadora",
    cidade: "Porto Alegre",
    preco: 6800,
    quartos: 3,
    tipo: "Cobertura",
    imobiliaria: SOURCE,
    link: "https://www.quintoandar.com.br/imovel/fake-4",
    publicadoEm: "2026-07-12",
  },
  {
    id: "quintoandar-5",
    titulo: "Apartamento compacto no Bom Fim",
    bairro: "Bom Fim",
    cidade: "Porto Alegre",
    preco: 2100,
    quartos: 1,
    tipo: "Apartamento",
    imobiliaria: SOURCE,
    link: "https://www.quintoandar.com.br/imovel/fake-5",
    publicadoEm: "2026-07-12",
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function searchProperties(): Promise<SearchResult> {
  const start = performance.now();
  await delay(300 + Math.random() * 400);

  return {
    success: true,
    source: SOURCE,
    properties: MOCK_PROPERTIES,
    executionTime: (performance.now() - start) / 1000,
  };
}
