export const commodityPrices = [
  { crop: "Corn", unit: "bu", price: 4.65, change: 0.06 },
  { crop: "Soybeans", unit: "bu", price: 11.8, change: -0.04 },
  { crop: "Wheat", unit: "bu", price: 6.1, change: 0.02 },
];

export const cropBasis = {
  Corn: -0.35,
  Soybeans: -0.55,
  Wheat: -0.45,
};

export const cropTargets = {
  Corn: {
    targetPrice: 4.85,
    note: "Consider pricing a portion above target.",
  },
  Soybeans: {
    targetPrice: 12.25,
    note: "Watch export demand and basis strength.",
  },
  Wheat: {
    targetPrice: 6.45,
    note: "Compare against storage and delivery window.",
  },
};

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

export const farmLocation = {
  name: "Indianapolis",
  admin1: "Indiana",
  country: "United States",
  latitude: 39.7684,
  longitude: -86.1581,
};

export const farmProfile = {
  farmName: "Maple Row Farms",
  operatorName: "",
  planningYear: 2026,
  primaryCrops: "Corn, Soybeans, Wheat",
  notes: "Add operation notes, rental details, or planning reminders.",
};

export const farmTasks = [
  {
    id: 1,
    title: "Scout North 80",
    relatedType: "Field",
    relatedId: 1,
    dueDate: "2026-05-02",
    priority: "High",
    status: "Planned",
  },
  {
    id: 2,
    title: "Check combine service parts",
    relatedType: "Equipment",
    relatedId: 2,
    dueDate: "2026-05-08",
    priority: "Medium",
    status: "In progress",
  },
];

export const fieldActivities = [
  {
    id: 1,
    fieldId: 1,
    date: "2026-04-20",
    type: "Scouting",
    note: "Checked stand emergence and early weed pressure.",
  },
  {
    id: 2,
    fieldId: 3,
    date: "2026-04-24",
    type: "Application",
    note: "Recorded planned fungicide timing window.",
  },
];

export const equipmentServiceLogs = [
  {
    id: 1,
    equipmentId: 1,
    date: "2026-04-12",
    type: "Oil change",
    hours: 1240,
    cost: 285,
    note: "Changed oil and filters before spring field work.",
  },
  {
    id: 2,
    equipmentId: 2,
    date: "2026-04-18",
    type: "Inspection",
    hours: 2125,
    cost: 0,
    note: "Checked belts and noted service parts to order.",
  },
];
