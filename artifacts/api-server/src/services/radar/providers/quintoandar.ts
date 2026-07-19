import axios from "axios";

const URL =
  "https://apigw.prod.quintoandar.com.br/house-listing-search/v3/search/list";

export async function buscarQuintoAndar(bairro: string) {
  const response = await axios.post(
    URL,
    {
      slug: "porto-alegre-rs-brasil",
      topics: [],
      fields: [
        "id",
        "coverImage",
        "rent",
        "totalCost",
        "salePrice",
        "iptuPlusCondominium",
        "area",
        "imageList",
        "address",
        "regionName",
        "city",
        "visitStatus",
        "activeSpecialConditions",
        "type",
        "forRent",
        "forSale",
        "bedrooms",
        "parkingSpaces",
        "suites",
        "neighbourhood",
        "bathrooms",
        "isFurnished",
        "installations",
        "amenities",
        "shortRentDescription",
        "shortSaleDescription",
        "listingTags"
      ],
      filters: {
        unknownSlugs: [],
        enableFlexibleSearch: true,
        businessContext: "RENT"
      },
      locationDescriptions: [
        {
          description: "porto-alegre-rs-brasil"
        }
      ],
      pagination: {
        pageSize: 100,
        offset: 0
      }
    },
    {
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0 Safari/537.36"
      }
    }
  );

  const hits = response.data?.hits?.hits ?? [];

  const imoveis = hits
    .filter((item: any) => {
      const source = item._source;

      return (
        source?.city === "Porto Alegre" &&
        source?.neighbourhood?.toLowerCase() === bairro.toLowerCase()
      );
    })
    .map((item: any) => {
      const source = item._source;

      return {
        id: String(source.id),
        rent: source.rent ?? 0,
        totalCost: source.totalCost ?? 0,
        area: source.area ?? 0,
        bedrooms: source.bedrooms ?? 0,
        bathrooms: source.bathrooms ?? 0,
        parkingSpaces: source.parkingSpaces ?? 0,
        isFurnished: source.isFurnished ?? false,
        address: source.address ?? "",
        neighbourhood: source.neighbourhood ?? "",
        city: source.city ?? "",
        amenities: source.amenities ?? [],
        listingTags: item.fields?.listingTags ?? [],
        link: `https://www.quintoandar.com.br/imovel/${source.id}`
      };
    });

  console.log(`🏠 ${bairro}: ${imoveis.length} imóveis encontrados`);

  return imoveis;
}