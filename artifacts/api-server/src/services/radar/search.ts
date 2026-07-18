import { buscarQuintoAndar } from "./providers/quintoandar";
import fs from "fs";
import path from "path";

export interface RadarSearchParams {
  bairro: string;
}

export async function searchRadar(params: RadarSearchParams) {
  let imoveis = [];

  try {
    imoveis = await buscarQuintoAndar(params.bairro);
  } catch (erro) {
    console.error(`❌ Erro ao consultar QuintoAndar (${params.bairro})`);
    return {
      bairro: params.bairro,
      fonte: "QuintoAndar",
      total: 0,
      novos: 0,
      imoveisNovos: [],
      imoveis: [],
    };
  }

  const historicoPath = path.join(process.cwd(), "historico.json");

  let historico: Record<string, string[]> = {};

  if (fs.existsSync(historicoPath)) {
    try {
      const conteudo = JSON.parse(
        fs.readFileSync(historicoPath, "utf-8")
      );

      if (Array.isArray(conteudo)) {
        historico[params.bairro] = conteudo;
      } else {
        historico = conteudo;
      }
    } catch {
      historico = {};
    }
  }

  const idsAnteriores = historico[params.bairro] ?? [];

  const novos = imoveis.filter(
    (imovel) => !idsAnteriores.includes(imovel.id)
  );

  historico[params.bairro] = imoveis.map(
    (imovel) => imovel.id
  );

  fs.writeFileSync(
    historicoPath,
    JSON.stringify(historico, null, 2)
  );

  return {
    bairro: params.bairro,
    fonte: "QuintoAndar",
    total: imoveis.length,
    novos: novos.length,
    imoveisNovos: novos,
    imoveis,
  };
}