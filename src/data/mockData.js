export const commodityPrices = [
  { crop: "Corn", unit: "bu", price: 4.65, change: 0.06 },
  { crop: "Soybeans", unit: "bu", price: 11.8, change: -0.04 },
  { crop: "Wheat", unit: "bu", price: 6.1, change: 0.02 },
];

export const fields = [
  {
    id: 1,
    name: "North 80",
    crop: "Corn",
    acres: 80,
    yieldPerAcre: 195,
    pricePerBushel: 4.65,
    status: "Planted",
  },
  {
    id: 2,
    name: "Back 40",
    crop: "Soybeans",
    acres: 40,
    yieldPerAcre: 58,
    pricePerBushel: 11.8,
    status: "Growing",
  },
  {
    id: 3,
    name: "West Field",
    crop: "Wheat",
    acres: 62,
    yieldPerAcre: 78,
    pricePerBushel: 6.1,
    status: "Harvest Ready",
  },
];

export const inputCosts = [
  { name: "Seed", costPerAcre: 115 },
  { name: "Nitrogen", costPerAcre: 92 },
  { name: "Fertilizer", costPerAcre: 78 },
  { name: "Fungicide", costPerAcre: 32 },
  { name: "Herbicide", costPerAcre: 28 },
  { name: "Insecticide", costPerAcre: 18 },
  { name: "Diesel", costPerAcre: 24 },
  { name: "Gas", costPerAcre: 10 },
];

export const fuelCosts = [
  { name: "Diesel", unit: "gal", price: 3.86, note: "Field work fuel" },
  { name: "Gas", unit: "gal", price: 3.41, note: "Truck and utility fuel" },
];

export const equipment = [
  {
    id: 1,
    name: "Tractor",
    model: "John Deere 8R",
    hours: 1240,
    nextService: 1300,
    status: "Good",
  },
  {
    id: 2,
    name: "Combine",
    model: "Case IH 8250",
    hours: 2125,
    nextService: 2150,
    status: "Service Soon",
  },
  {
    id: 3,
    name: "Sprayer",
    model: "Self-propelled sprayer",
    hours: 840,
    nextService: 900,
    status: "Ready",
  },
];

export const weather = {
  temperature: 72,
  condition: "Cloudy",
  rainChance: 62,
  note: "Rain risk may affect spraying, nitrogen timing, and field access.",
};
