import { formatPrice } from "../utils/formatters.js";

export function CommodityPrices({ commodityPrices, fuelCosts }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Markets and fuel</p>
          <h2>Commodity Prices</h2>
        </div>
      </div>

      <div className="price-list">
        {commodityPrices.map((item) => (
          <div className="price-row" key={item.crop}>
            <div>
              <strong>{item.crop}</strong>
              <span>per {item.unit}</span>
            </div>
            <span>{formatPrice(item.price)}</span>
            <em className={item.change >= 0 ? "price-up" : "price-down"}>
              {item.change >= 0 ? "+" : ""}
              {item.change.toFixed(2)}
            </em>
          </div>
        ))}
      </div>

      <div className="fuel-card">
        <h3>Fuel Costs</h3>
        {fuelCosts.map((fuel) => (
          <div className="fuel-row" key={fuel.name}>
            <span>{fuel.name}</span>
            <strong>
              {formatPrice(fuel.price)}/{fuel.unit}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}
