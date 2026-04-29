import { useEffect, useState } from "react";
import {
  fetchFarmWeather,
  searchFarmLocation,
  searchFarmLocations,
} from "../utils/weather.js";

export function WeatherWatch({
  fallbackWeather,
  farmLocation,
  onFarmLocationChange,
}) {
  const [weather, setWeather] = useState(fallbackWeather);
  const [locationQuery, setLocationQuery] = useState(getLocationLabel(farmLocation));
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let ignoreResult = false;

    async function loadWeather() {
      setStatus("loading");
      setMessage("");

      try {
        const liveWeather = await fetchFarmWeather(farmLocation);

        if (!ignoreResult) {
          setWeather(liveWeather);
          setStatus("ready");
        }
      } catch {
        if (!ignoreResult) {
          setWeather(fallbackWeather);
          setStatus("fallback");
          setMessage("Showing starter weather until live weather is available.");
        }
      }
    }

    loadWeather();

    return () => {
      ignoreResult = true;
    };
  }, [fallbackWeather, farmLocation]);

  useEffect(() => {
    const query = locationQuery.trim();

    if (query.length < 2 || query === getLocationLabel(farmLocation)) {
      setLocationSuggestions([]);
      setIsSuggestionsOpen(false);
      return;
    }

    let ignoreResult = false;
    const searchDelay = window.setTimeout(async () => {
      try {
        const locations = await searchFarmLocations(query);

        if (!ignoreResult) {
          setLocationSuggestions(locations);
          setIsSuggestionsOpen(true);
        }
      } catch {
        if (!ignoreResult) {
          setLocationSuggestions([]);
          setIsSuggestionsOpen(false);
        }
      }
    }, 250);

    return () => {
      ignoreResult = true;
      window.clearTimeout(searchDelay);
    };
  }, [farmLocation, locationQuery]);

  async function handleLocationSubmit(event) {
    event.preventDefault();

    if (!locationQuery.trim()) {
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const location = await searchFarmLocation(locationQuery.trim());
      onFarmLocationChange(location);
      setLocationQuery(getLocationLabel(location));
      setLocationSuggestions([]);
      setIsSuggestionsOpen(false);
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  }

  function handleSuggestionSelect(location) {
    onFarmLocationChange(location);
    setLocationQuery(getLocationLabel(location));
    setLocationSuggestions([]);
    setIsSuggestionsOpen(false);
  }

  return (
    <section className="panel weather-panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Weather</p>
          <h2>Weather Watch</h2>
        </div>
        <span className="badge">
          {status === "ready" ? "Live weather" : "Weather fallback"}
        </span>
      </div>

      <form className="weather-location-form" onSubmit={handleLocationSubmit}>
        <div className="location-picker">
          <label htmlFor="farm-location">Farm location</label>
          <div className="location-input-wrap">
            <input
              id="farm-location"
              value={locationQuery}
              placeholder="City or ZIP"
              autoComplete="off"
              onChange={(event) => setLocationQuery(event.target.value)}
              onFocus={() => {
                if (locationSuggestions.length) {
                  setIsSuggestionsOpen(true);
                }
              }}
            />
            {isSuggestionsOpen && locationSuggestions.length > 0 && (
              <div className="location-suggestions">
                {locationSuggestions.map((location) => (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() => handleSuggestionSelect(location)}
                  >
                    <strong>{location.name}</strong>
                    <span>{getLocationMeta(location)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <button className="primary-button" type="submit">
          Update
        </button>
      </form>

      <div className="weather-reading">
        <strong>{weather.temperature}F</strong>
        <span>{weather.condition}</span>
      </div>

      <div className="weather-detail">
        <span>Location</span>
        <strong>{getLocationLabel(farmLocation)}</strong>
      </div>

      <div className="weather-detail">
        <span>Rain chance</span>
        <strong>{weather.rainChance}%</strong>
      </div>

      {"humidity" in weather && (
        <div className="weather-detail">
          <span>Humidity</span>
          <strong>{weather.humidity}%</strong>
        </div>
      )}

      {"windSpeed" in weather && (
        <div className="weather-detail">
          <span>Wind</span>
          <strong>{weather.windSpeed} mph</strong>
        </div>
      )}

      <p className="farm-note">{message || weather.note}</p>
    </section>
  );
}

function getLocationLabel(location) {
  return [location.name, location.admin1].filter(Boolean).join(", ");
}

function getLocationMeta(location) {
  return [location.admin1, location.country].filter(Boolean).join(", ");
}
