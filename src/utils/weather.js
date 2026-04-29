const weatherCodeLabels = {
  0: "Clear",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Cloudy",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Heavy showers",
  95: "Thunderstorms",
  96: "Thunderstorms with hail",
  99: "Thunderstorms with hail",
};

export async function searchFarmLocations(query, count = 5) {
  const params = new URLSearchParams({
    name: query,
    count: String(count),
    language: "en",
    format: "json",
    countryCode: "US",
  });
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?${params}`
  );

  if (!response.ok) {
    throw new Error("Location search failed.");
  }

  const data = await response.json();
  const results = data.results || [];

  if (!results.length) {
    throw new Error("No matching location found.");
  }

  return results.map(mapLocationResult);
}

export async function searchFarmLocation(query) {
  const locations = await searchFarmLocations(query, 1);
  return locations[0];
}

function mapLocationResult(result) {
  return {
    id: result.id,
    name: result.name,
    admin1: result.admin1 || "",
    country: result.country || "",
    latitude: result.latitude,
    longitude: result.longitude,
  };
}

export async function fetchFarmWeather(location) {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current:
      "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m",
    hourly: "precipitation_probability",
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    precipitation_unit: "inch",
    forecast_days: "1",
    timezone: "auto",
  });
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);

  if (!response.ok) {
    throw new Error("Weather fetch failed.");
  }

  const data = await response.json();
  const current = data.current || {};
  const rainChance = Math.max(
    ...(data.hourly?.precipitation_probability || [0]).slice(0, 12)
  );

  return {
    temperature: Math.round(current.temperature_2m ?? 0),
    condition: weatherCodeLabels[current.weather_code] || "Current conditions",
    rainChance,
    humidity: Math.round(current.relative_humidity_2m ?? 0),
    windSpeed: Math.round(current.wind_speed_10m ?? 0),
    precipitation: current.precipitation ?? 0,
    source: "Open-Meteo",
    note: getFarmWeatherNote(rainChance, current.precipitation || 0),
  };
}

function getFarmWeatherNote(rainChance, precipitation) {
  if (precipitation > 0 || rainChance >= 60) {
    return "Rain risk may affect spraying, nitrogen timing, and field access.";
  }

  if (rainChance >= 30) {
    return "Watch the window for spraying and field work; rain chances are moderate.";
  }

  return "Low near-term rain risk supports field work, scouting, and equipment movement.";
}
