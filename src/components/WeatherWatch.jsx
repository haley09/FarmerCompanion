export function WeatherWatch({ weather }) {
  return (
    <section className="panel weather-panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Weather</p>
          <h2>Weather Watch</h2>
        </div>
      </div>

      <div className="weather-reading">
        <strong>{weather.temperature}F</strong>
        <span>{weather.condition}</span>
      </div>

      <div className="weather-detail">
        <span>Rain chance</span>
        <strong>{weather.rainChance}%</strong>
      </div>

      <p className="farm-note">{weather.note}</p>
    </section>
  );
}
