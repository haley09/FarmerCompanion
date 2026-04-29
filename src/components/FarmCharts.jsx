import { formatCurrency } from "../utils/formatters.js";

export function FarmCharts({ fields, inputCosts, getFieldGross }) {
  const grossByField = fields.map((field) => ({
    id: field.id,
    label: field.name,
    value: getFieldGross(field),
  }));
  const highestGross = Math.max(...grossByField.map((field) => field.value), 1);
  const highestInputCost = Math.max(
    ...inputCosts.map((input) => input.costPerAcre),
    1
  );

  return (
    <section className="panel chart-panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Visuals</p>
          <h2>Profitability Snapshot</h2>
        </div>
        <span className="badge">Live from edits</span>
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <h3>Gross by Field</h3>
          <div className="bar-list">
            {grossByField.map((field) => (
              <div className="bar-row" key={field.id}>
                <div className="bar-label">
                  <span>{field.label}</span>
                  <strong>{formatCurrency(field.value)}</strong>
                </div>
                <div className="bar-track" aria-hidden="true">
                  <span
                    className="bar-fill gross-fill"
                    style={{ width: `${(field.value / highestGross) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>Input Cost Breakdown</h3>
          <div className="bar-list">
            {inputCosts.map((input) => (
              <div className="bar-row" key={input.name}>
                <div className="bar-label">
                  <span>{input.name}</span>
                  <strong>{formatCurrency(input.costPerAcre)}/acre</strong>
                </div>
                <div className="bar-track" aria-hidden="true">
                  <span
                    className="bar-fill cost-fill"
                    style={{
                      width: `${(input.costPerAcre / highestInputCost) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
