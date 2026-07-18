import { searchRadar } from "./services/radar/search";
import fs from "fs";
import path from "path";

interface Config {
  intervalo: number;
  bairros: string[];
}

const configPath = path.join(process.cwd(), "config.json");

const config: Config = JSON.parse(
  fs.readFileSync(configPath, "utf-8")
);

const INTERVALO = config.intervalo * 1000;

export async function iniciarMonitor() {
  console.log("📡 CSL Radar iniciado");
  console.log(`⏱️ Verificando a cada ${config.intervalo} segundos`);
  console.log(`📍 Bairros: ${config.bairros.join(", ")}\n`);

  async function verificar() {
    console.log("\n==================================================");
    console.log(`🔎 Verificação: ${new Date().toLocaleString("pt-BR")}`);
    console.log("==================================================\n");

    for (const bairro of config.bairros) {
      try {
        const resultado = await searchRadar({ bairro });

        if (resultado.novos === 0) {
          console.log(`✅ ${bairro}: nenhum imóvel novo.`);
          continue;
        }

        console.log(`\n🚨 ${resultado.novos} NOVO(S) IMÓVEL(IS) EM ${bairro}\n`);

        resultado.imoveisNovos.forEach((imovel, index) => {
          console.log("══════════════════════════════════════════════");
          console.log(`🏠 Imóvel ${index + 1}`);
          console.log("");
          console.log(`📍 Bairro: ${bairro}`);
          console.log(`📝 ${imovel.titulo}`);
          console.log(`📐 Área: ${imovel.area} m²`);
          console.log(`🛏️ Quartos: ${imovel.quartos}`);
          console.log(`🚿 Banheiros: ${imovel.banheiros}`);
          console.log(`💰 Valor: R$ ${imovel.valor}`);
          console.log(`🔗 ${imovel.url}`);
          console.log("══════════════════════════════════════════════\n");
        });
      } catch (erro) {
        console.error(`❌ Erro ao verificar ${bairro}:`, erro);
      }
    }
  }

  await verificar();

  setInterval(verificar, INTERVALO);
}