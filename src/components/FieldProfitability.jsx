import { useState } from "react";
import { formatCurrency } from "../utils/formatters.js";

const fieldStatuses = ["Planted", "Growing", "Harvest Ready", "Needs Scout"];
const blankField = {
  name: "",
  crop: "Corn",
  acres: 0,
  yieldPerAcre: 0,
  pricePerBushel: 0,
  status: "Planted",
};

export function FieldProfitability({
  fields,
  getFieldGross,
  onAddField,
  onDeleteField,
  onFieldChange,
  onResetFields,
}) {
  const [newField, setNewField] = useState(blankField);

  function updateNewField(key, value) {
    setNewField((currentField) => ({
      ...currentField,
      [key]: value,
    }));
  }

  function handleAddField(event) {
    event.preventDefault();

    if (!newField.name.trim()) {
      return;
    }

    onAddField({
      ...newField,
      name: newField.name.trim(),
      crop: newField.crop.trim() || "Crop",
    });
    setNewField(blankField);
  }

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

      <form className="add-field-form" onSubmit={handleAddField}>
        <label>
          Field name
          <input
            value={newField.name}
            placeholder="South 60"
            onChange={(event) => updateNewField("name", event.target.value)}
          />
        </label>
        <label>
          Crop
          <input
            value={newField.crop}
            onChange={(event) => updateNewField("crop", event.target.value)}
          />
        </label>
        <label>
          Acres
          <input
            type="number"
            min="0"
            value={newField.acres}
            onChange={(event) => updateNewField("acres", event.target.value)}
          />
        </label>
        <label>
          Yield / acre
          <input
            type="number"
            min="0"
            value={newField.yieldPerAcre}
            onChange={(event) =>
              updateNewField("yieldPerAcre", event.target.value)
            }
          />
        </label>
        <label>
          Price / bu
          <input
            type="number"
            min="0"
            step="0.01"
            value={newField.pricePerBushel}
            onChange={(event) =>
              updateNewField("pricePerBushel", event.target.value)
            }
          />
        </label>
        <label>
          Status
          <select
            value={newField.status}
            onChange={(event) => updateNewField("status", event.target.value)}
          >
            {fieldStatuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
        <button className="primary-button" type="submit">
          Add field
        </button>
      </form>

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
                Field name
                <input
                  value={field.name}
                  onChange={(event) =>
                    onFieldChange(field.id, "name", event.target.value)
                  }
                />
              </label>
              <label>
                Crop
                <input
                  value={field.crop}
                  onChange={(event) =>
                    onFieldChange(field.id, "crop", event.target.value)
                  }
                />
              </label>
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
            <button
              className="danger-button"
              type="button"
              onClick={() => onDeleteField(field.id)}
            >
              Delete field
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
