import { formatCurrency } from "../utils/formatters.js";

export function InputCostSummary({
  inputCosts,
  inputCostPerAcre,
  totalInputCosts,
  totalAcres,
  onInputCostChange,
  onResetInputCosts,
}) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Inputs</p>
          <h2>Input Cost Summary</h2>
        </div>
        <div className="panel-actions">
          <span className="badge">Saved in browser</span>
          <button className="ghost-button" type="button" onClick={onResetInputCosts}>
            Reset costs
          </button>
        </div>
      </div>

      <div className="cost-list">
        {inputCosts.map((input) => (
          <div className="cost-row" key={input.name}>
            <label>
              {input.name}
              <input
                type="number"
                min="0"
                value={input.costPerAcre}
                onChange={(event) =>
                  onInputCostChange(input.name, event.target.value)
                }
              />
            </label>
            <strong>{formatCurrency(input.costPerAcre)}/acre</strong>
          </div>
        ))}
      </div>

      <div className="cost-total">
        <div>
          <span>Total cost per acre</span>
          <strong>{formatCurrency(inputCostPerAcre)}</strong>
        </div>
        <div>
          <span>{totalAcres.toLocaleString()} acres total</span>
          <strong>{formatCurrency(totalInputCosts)}</strong>
        </div>
      </div>
    </section>
  );
}
