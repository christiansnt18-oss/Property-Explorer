import { buscarQuintoAndar } from "./providers/quintoandar";

export interface RadarSearchParams {
  bairro: string;
}

export async function searchRadar(params: RadarSearchParams) {
  const imoveis = await buscarQuintoAndar(params.bairro);

  return {
    bairro: params.bairro,
    fonte: "QuintoAndar",
    total: imoveis.length,
    imoveis,
  };
}