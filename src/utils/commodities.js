const commoditySymbols = {
  Corn: "corn",
  Soybeans: "soybean",
  Wheat: "wheat",
};

export async function fetchLiveCommodityPrices(apiKey) {
  const entries = Object.entries(commoditySymbols);
  const prices = await Promise.all(
    entries.map(async ([crop, apiName]) => {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/commodityprice?name=${apiName}`,
        {
          headers: {
            "X-Api-Key": apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Live commodity prices are unavailable.");
      }

      const data = await response.json();

      return {
        crop,
        unit: "bu futures",
        price: Number(data.price) || 0,
        change: 0,
        exchange: data.exchange,
        updated: data.updated,
        source: "API Ninjas",
      };
    })
  );

  return prices;
}
