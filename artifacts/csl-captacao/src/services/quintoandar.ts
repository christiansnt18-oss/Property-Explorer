import type { Property } from "@/types/property";

// Dados fictícios (mock) enquanto a integração real com o QuintoAndar não existe.
// Quando a integração for implementada, esta função deve manter a mesma assinatura
// e apenas trocar a origem dos dados (chamada HTTP / scraping) pelo array abaixo.
const MOCK_PROPERTIES: Property[] = [
  {
    id: "quintoandar-1",
    titulo: "Apartamento 2 dorms próximo ao parque",
    bairro: "Moinhos de Vento",
    cidade: "Porto Alegre",
    preco: 3200,
    quartos: 2,
    tipo: "Apartamento",
    imobiliaria: "QuintoAndar",
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
    imobiliaria: "QuintoAndar",
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
    imobiliaria: "QuintoAndar",
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
    imobiliaria: "QuintoAndar",
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
    imobiliaria: "QuintoAndar",
    link: "https://www.quintoandar.com.br/imovel/fake-5",
    publicadoEm: "2026-07-12",
  },
];

export async function searchProperties(): Promise<Property[]> {
  return MOCK_PROPERTIES;
}
