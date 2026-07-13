import type { Property } from "@/types/property";
import type { SearchResult } from "@/types/search";

const SOURCE = "Guarida";

// Dados fictícios (mock) enquanto a integração real com a Guarida não existe.
// Quando a integração for implementada, esta função deve manter a mesma assinatura
// (Promise<SearchResult>) e apenas trocar a origem dos dados pelo array abaixo.
const MOCK_PROPERTIES: Property[] = [
  {
    id: "guarida-1",
    titulo: "Apartamento 1 dorm próximo ao Parcão",
    bairro: "Bela Vista",
    cidade: "Porto Alegre",
    preco: 2400,
    quartos: 1,
    tipo: "Apartamento",
    imobiliaria: SOURCE,
    link: "https://www.guarida.com.br/imovel/fake-1",
    publicadoEm: "2026-07-08",
  },
  {
    id: "guarida-2",
    titulo: "Casa 4 dorms com churrasqueira",
    bairro: "Petrópolis",
    cidade: "Porto Alegre",
    preco: 5200,
    quartos: 4,
    tipo: "Casa",
    imobiliaria: SOURCE,
    link: "https://www.guarida.com.br/imovel/fake-2",
    publicadoEm: "2026-07-09",
  },
  {
    id: "guarida-3",
    titulo: "Terreno plano no Santo Antônio",
    bairro: "Santo Antônio",
    cidade: "Porto Alegre",
    preco: 1500,
    quartos: 0,
    tipo: "Terreno",
    imobiliaria: SOURCE,
    link: "https://www.guarida.com.br/imovel/fake-3",
    publicadoEm: "2026-07-10",
  },
  {
    id: "guarida-4",
    titulo: "Apartamento 2 dorms na Cidade Baixa",
    bairro: "Cidade Baixa",
    cidade: "Porto Alegre",
    preco: 2800,
    quartos: 2,
    tipo: "Apartamento",
    imobiliaria: SOURCE,
    link: "https://www.guarida.com.br/imovel/fake-4",
    publicadoEm: "2026-07-11",
  },
  {
    id: "guarida-5",
    titulo: "Cobertura duplex no Menino Deus",
    bairro: "Menino Deus",
    cidade: "Porto Alegre",
    preco: 6100,
    quartos: 3,
    tipo: "Cobertura",
    imobiliaria: SOURCE,
    link: "https://www.guarida.com.br/imovel/fake-5",
    publicadoEm: "2026-07-12",
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simula, de forma fictícia, que este serviço pode falhar — útil para validar o
// tratamento de erro individual da arquitetura antes de existir integração real.
const SIMULATED_FAILURE_RATE = 0.35;

export async function searchProperties(): Promise<SearchResult> {
  const start = performance.now();
  await delay(400 + Math.random() * 600);

  if (Math.random() < SIMULATED_FAILURE_RATE) {
    return {
      success: false,
      source: SOURCE,
      properties: [],
      executionTime: (performance.now() - start) / 1000,
      error: "Falha simulada ao consultar a Guarida",
    };
  }

  return {
    success: true,
    source: SOURCE,
    properties: MOCK_PROPERTIES,
    executionTime: (performance.now() - start) / 1000,
  };
}
