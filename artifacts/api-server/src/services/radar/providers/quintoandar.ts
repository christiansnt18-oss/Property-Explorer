import axios from "axios";
import * as cheerio from "cheerio";

export async function buscarQuintoAndar(bairro: string) {
  const slug = bairro
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

  const url = `https://www.quintoandar.com.br/alugar/imovel/${slug}-porto-alegre-rs-brasil`;

  const response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0 Safari/537.36",
    },
  });

  const $ = cheerio.load(response.data);

  const scripts = $('script[type="application/ld+json"]');

  let lista: any[] = [];

  scripts.each((_, element) => {
    try {
      const json = JSON.parse($(element).html() || "");

      if (json["@graph"] && Array.isArray(json["@graph"])) {
        const itemList = json["@graph"].find(
          (item: any) => item["@type"] === "ItemList"
        );

        if (itemList?.itemListElement) {
          lista = itemList.itemListElement;
        }
      }
    } catch {
      // ignora JSON inválido
    }
  });

  return lista.map((item: any) => {
    const imovel = item.item;

    const id =
      imovel?.url?.match(/\/imovel\/(\d+)/)?.[1] ?? null;

    return {
      id,
      titulo: imovel?.name,
      url: imovel?.url,
      valor: imovel?.offers?.price,
      quartos: imovel?.about?.numberOfBedrooms,
      banheiros: imovel?.about?.numberOfFullBathrooms,
      area: imovel?.about?.floorSize?.value,
      endereco: imovel?.about?.address?.streetAddress,
      bairro,
    };
  });
}