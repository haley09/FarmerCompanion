import { formatCurrency } from "../utils/formatters.js";

const fieldStatuses = ["Planted", "Growing", "Harvest Ready", "Needs Scout"];

export function FieldProfitability({
  fields,
  getFieldGross,
  onFieldChange,
  onResetFields,
}) {
  return (
    <section className="panel panel-large">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Fields and crops</p>
          <h2>Field Profitability</h2>
        </div>
        <div className="panel-actions">
          <span className="badge">Saved in browser</span>
          <button className="ghost-button" type="button" onClick={onResetFields}>
            Reset fields
          </button>
        </div>
      </div>

      <div className="field-grid">
        {fields.map((field) => (
          <article className="field-card" key={field.id}>
            <div className="field-card-header">
              <div>
                <h3>{field.name}</h3>
                <p>
                  {field.crop} - {field.acres} acres
                </p>
              </div>
              <span className="status-badge">{field.status}</span>
            </div>

            <div className="field-edit-grid">
              <label>
                Acres
                <input
                  type="number"
                  min="0"
                  value={field.acres}
                  onChange={(event) =>
                    onFieldChange(field.id, "acres", event.target.value)
                  }
                />
              </label>
              <label>
                Yield / acre
                <input
                  type="number"
                  min="0"
                  value={field.yieldPerAcre}
                  onChange={(event) =>
                    onFieldChange(field.id, "yieldPerAcre", event.target.value)
                  }
                />
              </label>
              <label>
                Price / bu
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={field.pricePerBushel}
                  onChange={(event) =>
                    onFieldChange(field.id, "pricePerBushel", event.target.value)
                  }
                />
              </label>
              <label>
                Status
                <select
                  value={field.status}
                  onChange={(event) =>
                    onFieldChange(field.id, "status", event.target.value)
                  }
                >
                  {fieldStatuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="gross-total">
              <span>Estimated gross</span>
              <strong>{formatCurrency(getFieldGross(field))}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
