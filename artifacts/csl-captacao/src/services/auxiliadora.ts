import type { Property } from "@/types/property";
import type { SearchResult } from "@/types/search";

const SOURCE = "Auxiliadora Predial";

// Dados fictícios (mock) enquanto a integração real com a Auxiliadora Predial não existe.
// Quando a integração for implementada, esta função deve manter a mesma assinatura
// (Promise<SearchResult>) e apenas trocar a origem dos dados pelo array abaixo.
const MOCK_PROPERTIES: Property[] = [
  {
    id: "auxiliadora-1",
    titulo: "Apartamento 3 dorms com varanda gourmet",
    bairro: "Auxiliadora",
    cidade: "Porto Alegre",
    preco: 4200,
    quartos: 3,
    tipo: "Apartamento",
    imobiliaria: SOURCE,
    link: "https://www.auxiliadorapredial.com.br/imovel/fake-1",
    publicadoEm: "2026-07-09",
  },
  {
    id: "auxiliadora-2",
    titulo: "Casa térrea com pátio no Rio Branco",
    bairro: "Rio Branco",
    cidade: "Porto Alegre",
    preco: 3900,
    quartos: 2,
    tipo: "Casa",
    imobiliaria: SOURCE,
    link: "https://www.auxiliadorapredial.com.br/imovel/fake-2",
    publicadoEm: "2026-07-10",
  },
  {
    id: "auxiliadora-3",
    titulo: "Sala comercial na Praia de Belas",
    bairro: "Praia de Belas",
    cidade: "Porto Alegre",
    preco: 2600,
    quartos: 0,
    tipo: "Comercial",
    imobiliaria: SOURCE,
    link: "https://www.auxiliadorapredial.com.br/imovel/fake-3",
    publicadoEm: "2026-07-11",
  },
  {
    id: "auxiliadora-4",
    titulo: "Cobertura vista panorâmica nos Moinhos",
    bairro: "Moinhos de Vento",
    cidade: "Porto Alegre",
    preco: 7500,
    quartos: 3,
    tipo: "Cobertura",
    imobiliaria: SOURCE,
    link: "https://www.auxiliadorapredial.com.br/imovel/fake-4",
    publicadoEm: "2026-07-12",
  },
  {
    id: "auxiliadora-5",
    titulo: "Apartamento reformado no Higienópolis",
    bairro: "Higienópolis",
    cidade: "Porto Alegre",
    preco: 2900,
    quartos: 2,
    tipo: "Apartamento",
    imobiliaria: SOURCE,
    link: "https://www.auxiliadorapredial.com.br/imovel/fake-5",
    publicadoEm: "2026-07-12",
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function searchProperties(): Promise<SearchResult> {
  const start = performance.now();
  await delay(500 + Math.random() * 500);

  return {
    success: true,
    source: SOURCE,
    properties: MOCK_PROPERTIES,
    executionTime: (performance.now() - start) / 1000,
  };
}
