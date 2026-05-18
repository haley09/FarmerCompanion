import { useState } from "react";
import { formatCurrency } from "../utils/formatters.js";

const fieldStatuses = ["Planted", "Growing", "Harvest Ready", "Needs Scout"];
const fieldSortOptions = [
  { label: "Custom order", value: "custom" },
  { label: "Net / acre high to low", value: "netPerAcreDesc" },
  { label: "Net / acre low to high", value: "netPerAcreAsc" },
  { label: "Total net high to low", value: "netDesc" },
  { label: "Margin / bu low to high", value: "marginAsc" },
  { label: "Acres high to low", value: "acresDesc" },
];
const cropPresets = {
  Corn: {
    yieldPerAcre: 195,
    pricePerBushel: 4.65,
    status: "Planted",
  },
  Soybeans: {
    yieldPerAcre: 58,
    pricePerBushel: 11.8,
    status: "Growing",
  },
  Wheat: {
    yieldPerAcre: 78,
    pricePerBushel: 6.1,
    status: "Harvest Ready",
  },
};
const blankField = {
  name: "",
  crop: "Corn",
  customCrop: "",
  acres: 0,
  yieldPerAcre: cropPresets.Corn.yieldPerAcre,
  pricePerBushel: cropPresets.Corn.pricePerBushel,
  status: "Planted",
};

export function FieldProfitability({
  fields,
  inputCosts,
  getFieldBreakEvenPrice,
  getFieldGross,
  getFieldMarginPerBushel,
  getFieldNet,
  getFieldNetPerAcre,
  onAddField,
  onDeleteField,
  onFieldChange,
  onResetFields,
}) {
  const [newField, setNewField] = useState(blankField);
  const [sortMode, setSortMode] = useState("custom");
  const sortedFields = getSortedFields(
    fields,
    inputCosts,
    sortMode,
    getFieldNet,
    getFieldNetPerAcre,
    getFieldMarginPerBushel
  );

  function updateNewField(key, value) {
    setNewField((currentField) => ({
      ...currentField,
      [key]: value,
    }));
  }

  function applyCropPreset(crop) {
    const preset = cropPresets[crop];

    setNewField((currentField) => ({
      ...currentField,
      crop,
      customCrop: "",
      ...(preset || {}),
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
      crop:
        newField.crop === "Other"
          ? newField.customCrop.trim() || "Crop"
          : newField.crop,
    });
    setNewField(blankField);
  }

  function handleResetFields() {
    if (window.confirm("Reset fields to the starter data?")) {
      onResetFields();
    }
  }

  function handleDeleteField(field) {
    if (window.confirm(`Delete ${field.name}? This cannot be undone.`)) {
      onDeleteField(field.id);
    }
  }

  return (
    <section className="panel panel-large">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Fields and crops</p>
          <h2>Field Profitability</h2>
        </div>
        <div className="panel-actions">
          <label className="sort-control">
            Sort fields
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value)}
            >
              {fieldSortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <span className="badge">Saved in browser</span>
          <button className="ghost-button" type="button" onClick={handleResetFields}>
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
          <select
            value={newField.crop}
            onChange={(event) => applyCropPreset(event.target.value)}
          >
            {Object.keys(cropPresets).map((crop) => (
              <option key={crop}>{crop}</option>
            ))}
            <option>Other</option>
          </select>
        </label>
        {newField.crop === "Other" && (
          <label>
            Custom crop
            <input
              value={newField.customCrop}
              placeholder="Oats"
              onChange={(event) =>
                updateNewField("customCrop", event.target.value)
              }
            />
          </label>
        )}
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
        {sortedFields.length === 0 && (
          <p className="empty-state">No fields yet. Add a field above to start tracking crop profitability.</p>
        )}
        {sortedFields.map((field) => {
          const fieldNet = getFieldNet(field, inputCosts);
          const fieldNetPerAcre = getFieldNetPerAcre(field, inputCosts);
          const breakEvenPrice = getFieldBreakEvenPrice(field, inputCosts);
          const marginPerBushel = getFieldMarginPerBushel(field, inputCosts);

          return (
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
                      onFieldChange(
                        field.id,
                        "pricePerBushel",
                        event.target.value
                      )
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

              <div className="field-profit-grid">
                <div>
                  <span>Estimated gross</span>
                  <strong>{formatCurrency(getFieldGross(field))}</strong>
                </div>
                <div className={fieldNet >= 0 ? "profit-positive" : "profit-warning"}>
                  <span>Estimated net</span>
                  <strong>{formatCurrency(fieldNet)}</strong>
                </div>
                <div
                  className={
                    fieldNetPerAcre >= 0 ? "profit-positive" : "profit-warning"
                  }
                >
                  <span>Net / acre</span>
                  <strong>{formatCurrency(fieldNetPerAcre)}</strong>
                </div>
              </div>
              <div className="field-break-even-grid">
                <div>
                  <span>Break-even / bu</span>
                  <strong>{formatCurrency(breakEvenPrice, { maximumFractionDigits: 2 })}</strong>
                </div>
                <div
                  className={
                    marginPerBushel >= 0 ? "profit-positive" : "profit-warning"
                  }
                >
                  <span>Margin / bu</span>
                  <strong>
                    {formatCurrency(marginPerBushel, {
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </div>
                <div
                  className={
                    marginPerBushel >= 0 ? "profit-positive" : "profit-warning"
                  }
                >
                  <span>Break-even status</span>
                  <strong>
                    {marginPerBushel >= 0 ? "Above break-even" : "Below break-even"}
                  </strong>
                </div>
              </div>
              <button
                className="danger-button"
                type="button"
                onClick={() => handleDeleteField(field)}
              >
                Delete field
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function getSortedFields(
  fields,
  inputCosts,
  sortMode,
  getFieldNet,
  getFieldNetPerAcre,
  getFieldMarginPerBushel
) {
  const fieldsToSort = [...fields];

  if (sortMode === "netPerAcreDesc") {
    return fieldsToSort.sort(
      (fieldA, fieldB) =>
        getFieldNetPerAcre(fieldB, inputCosts) -
        getFieldNetPerAcre(fieldA, inputCosts)
    );
  }

  if (sortMode === "netPerAcreAsc") {
    return fieldsToSort.sort(
      (fieldA, fieldB) =>
        getFieldNetPerAcre(fieldA, inputCosts) -
        getFieldNetPerAcre(fieldB, inputCosts)
    );
  }

  if (sortMode === "netDesc") {
    return fieldsToSort.sort(
      (fieldA, fieldB) =>
        getFieldNet(fieldB, inputCosts) - getFieldNet(fieldA, inputCosts)
    );
  }

  if (sortMode === "marginAsc") {
    return fieldsToSort.sort(
      (fieldA, fieldB) =>
        getFieldMarginPerBushel(fieldA, inputCosts) -
        getFieldMarginPerBushel(fieldB, inputCosts)
    );
  }

  if (sortMode === "acresDesc") {
    return fieldsToSort.sort((fieldA, fieldB) => fieldB.acres - fieldA.acres);
  }

  return fieldsToSort;
}
