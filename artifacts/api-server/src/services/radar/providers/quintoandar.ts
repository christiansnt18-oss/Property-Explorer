import axios from "axios";

async function teste() {
  const url =
    "https://www.quintoandar.com.br/alugar/imovel/menino-deus-porto-alegre-rs-brasil";

  const response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0 Safari/537.36",
    },
  });

  console.log("STATUS:", response.status);
  console.log("TÍTULO:", response.data.match(/<title>(.*?)<\/title>/)?.[1]);
  console.log(response.data.substring(0, 6000));
}

teste();