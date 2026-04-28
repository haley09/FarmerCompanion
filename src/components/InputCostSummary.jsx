import { formatCurrency } from "../utils/formatters.js";

export function InputCostSummary({
  inputCosts,
  inputCostPerAcre,
  totalInputCosts,
  totalAcres,
}) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Inputs</p>
          <h2>Input Cost Summary</h2>
        </div>
      </div>

      <div className="cost-list">
        {inputCosts.map((input) => (
          <div className="cost-row" key={input.name}>
            <span>{input.name}</span>
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
