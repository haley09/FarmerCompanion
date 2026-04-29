import { useEffect, useState } from "react";
import { fetchLiveCommodityPrices } from "../utils/commodities.js";
import { formatPrice } from "../utils/formatters.js";

export function CommodityPrices({
  cropBasis,
  cropTargets,
  commodityApiKey,
  commodityPrices,
  fuelCosts,
  onApplyCashPrice,
  onCommodityApiKeyChange,
  onCropBasisChange,
  onCropTargetChange,
}) {
  const [livePrices, setLivePrices] = useState(commodityPrices);
  const [status, setStatus] = useState("fallback");
  const [message, setMessage] = useState(
    "Starter prices are showing until an API key is saved."
  );
  const displayedPrices = status === "ready" ? livePrices : commodityPrices;

  function resizeNoteField(element) {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }

  useEffect(() => {
    let ignoreResult = false;

    async function loadPrices() {
      if (!commodityApiKey.trim()) {
        setStatus("fallback");
        setMessage("Starter prices are showing until an API key is saved.");
        return;
      }

      setStatus("loading");
      setMessage("Refreshing futures prices...");

      try {
        const prices = await fetchLiveCommodityPrices(commodityApiKey.trim());

        if (!ignoreResult) {
          setLivePrices(prices);
          setStatus("ready");
          setMessage("Live futures prices loaded.");
        }
      } catch {
        if (!ignoreResult) {
          setStatus("fallback");
          setMessage(
            "Live prices could not load. Check the API key or subscription."
          );
        }
      }
    }

    loadPrices();

    return () => {
      ignoreResult = true;
    };
  }, [commodityApiKey]);

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Markets and fuel</p>
          <h2>Commodity Prices</h2>
        </div>
        <span className="badge">
          {status === "ready" ? "Live futures" : "Starter prices"}
        </span>
      </div>

      <div className="market-key-form">
        <label>
          API Ninjas key
          <input
            type="password"
            value={commodityApiKey}
            placeholder="Paste API key"
            onChange={(event) => onCommodityApiKeyChange(event.target.value)}
          />
        </label>
        <p>{message}</p>
      </div>

      <div className="price-list">
        {displayedPrices.map((item) => {
          const basis = cropBasis[item.crop] ?? 0;
          const target = cropTargets[item.crop] || {};
          const cashPrice = item.price + basis;
          const targetPrice = Number(target.targetPrice) || 0;
          const targetMet = targetPrice > 0 && cashPrice >= targetPrice;

          return (
            <div className="market-card" key={item.crop}>
              <div className="price-row price-row-market">
                <div>
                  <strong>{item.crop}</strong>
                  <span>{getMarketMeta(item)}</span>
                </div>
                <div className="market-price-stack">
                  <span>Futures</span>
                  <strong>{formatPrice(item.price)}</strong>
                </div>
                <label className="basis-input">
                  Basis
                  <input
                    type="number"
                    step="0.01"
                    value={basis}
                    onChange={(event) =>
                      onCropBasisChange(item.crop, event.target.value)
                    }
                  />
                </label>
                <div className="market-price-stack">
                  <span>Cash est.</span>
                  <strong>{formatPrice(cashPrice)}</strong>
                </div>
                <button
                  className="ghost-button"
                  type="button"
                  onClick={() => onApplyCashPrice(item.crop, cashPrice)}
                >
                  Apply
                </button>
              </div>

              <div className="pricing-target-grid">
                <label>
                  Target cash price
                  <input
                    type="number"
                    step="0.01"
                    value={targetPrice}
                    onChange={(event) =>
                      onCropTargetChange(
                        item.crop,
                        "targetPrice",
                        event.target.value
                      )
                    }
                  />
                </label>
                <div
                  className={`target-status ${
                    targetMet ? "target-status-ready" : "target-status-watch"
                  }`}
                >
                  <span>{targetMet ? "Target met" : "Below target"}</span>
                  <strong>
                    {targetPrice > 0
                      ? formatPrice(cashPrice - targetPrice)
                      : "Set target"}
                  </strong>
                </div>
                <label className="target-note">
                  Pricing note
                  <textarea
                    value={target.note || ""}
                    rows="2"
                    placeholder="Contract 25% above target"
                    onInput={(event) => resizeNoteField(event.currentTarget)}
                    onChange={(event) => {
                      onCropTargetChange(item.crop, "note", event.target.value);
                      resizeNoteField(event.currentTarget);
                    }}
                  />
                </label>
              </div>
            </div>
          );
        })}
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

function getMarketMeta(item) {
  if (item.updated) {
    return `${item.exchange || "Futures"} - ${new Date(
      item.updated * 1000
    ).toLocaleString()}`;
  }

  return `per ${item.unit}`;
}
