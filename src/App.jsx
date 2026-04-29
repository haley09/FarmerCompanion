import { useEffect, useState } from "react";
import {
  commodityPrices,
  equipment as initialEquipment,
  fields as initialFields,
  fuelCosts,
  inputCosts as initialInputCosts,
  weather,
} from "./data/mockData.js";
import {
  getFieldGross,
  getInputCostPerAcre,
  getProjectedNet,
  getTotalAcres,
  getTotalGross,
  getTotalInputCost,
} from "./utils/calculations.js";
import { formatCurrency } from "./utils/formatters.js";
import { CommodityPrices } from "./components/CommodityPrices.jsx";
import { EquipmentPanel } from "./components/EquipmentPanel.jsx";
import { FarmCharts } from "./components/FarmCharts.jsx";
import { FieldProfitability } from "./components/FieldProfitability.jsx";
import { InputCostSummary } from "./components/InputCostSummary.jsx";
import { SummaryCard } from "./components/SummaryCard.jsx";
import { WeatherWatch } from "./components/WeatherWatch.jsx";
import {
  clearSavedFields,
  clearSavedEquipment,
  clearSavedInputCosts,
  loadSavedEquipment,
  loadSavedFields,
  loadSavedInputCosts,
  saveEquipment,
  saveFields,
  saveInputCosts,
} from "./utils/storage.js";

export default function App() {
  const [fields, setFields] = useState(() => loadSavedFields(initialFields));
  const [inputCosts, setInputCosts] = useState(() =>
    loadSavedInputCosts(initialInputCosts)
  );
  const [equipment, setEquipment] = useState(() =>
    loadSavedEquipment(initialEquipment)
  );
  const totalAcres = getTotalAcres(fields);
  const totalGross = getTotalGross(fields);
  const inputCostPerAcre = getInputCostPerAcre(inputCosts);
  const totalInputCosts = getTotalInputCost(fields, inputCosts);
  const projectedNet = getProjectedNet(fields, inputCosts);

  useEffect(() => {
    saveFields(fields);
  }, [fields]);

  useEffect(() => {
    saveInputCosts(inputCosts);
  }, [inputCosts]);

  useEffect(() => {
    saveEquipment(equipment);
  }, [equipment]);

  function updateField(fieldId, key, value) {
    setFields((currentFields) =>
      currentFields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              [key]: ["acres", "yieldPerAcre", "pricePerBushel"].includes(key)
                ? Number(value) || 0
                : value,
            }
          : field
      )
    );
  }

  function addField(field) {
    setFields((currentFields) => [
      ...currentFields,
      {
        id: Date.now(),
        name: field.name,
        crop: field.crop,
        acres: Number(field.acres) || 0,
        yieldPerAcre: Number(field.yieldPerAcre) || 0,
        pricePerBushel: Number(field.pricePerBushel) || 0,
        status: field.status,
      },
    ]);
  }

  function deleteField(fieldId) {
    setFields((currentFields) =>
      currentFields.filter((field) => field.id !== fieldId)
    );
  }

  function resetFields() {
    clearSavedFields();
    setFields(initialFields);
  }

  function updateInputCost(inputName, value) {
    setInputCosts((currentInputCosts) =>
      currentInputCosts.map((input) =>
        input.name === inputName
          ? { ...input, costPerAcre: Number(value) || 0 }
          : input
      )
    );
  }

  function resetInputCosts() {
    clearSavedInputCosts();
    setInputCosts(initialInputCosts);
  }

  function updateEquipment(equipmentId, key, value) {
    setEquipment((currentEquipment) =>
      currentEquipment.map((item) =>
        item.id === equipmentId
          ? {
              ...item,
              [key]: ["hours", "nextService"].includes(key)
                ? Number(value) || 0
                : value,
            }
          : item
      )
    );
  }

  function resetEquipment() {
    clearSavedEquipment();
    setEquipment(initialEquipment);
  }

  return (
    <main className="app-shell">
      <div className="dashboard">
        <header className="hero">
          <div>
            <p className="eyebrow">FarmerCompanion</p>
            <h1>FarmComp</h1>
            <p className="hero-copy">
              A practical crop farm dashboard for tracking fields, gross crop
              estimates, market prices, input costs, weather, fuel, equipment,
              and projected profitability.
            </p>
          </div>
          <div className="season-pill">
            <span>Mock dashboard v1</span>
            <strong>2026 planning season</strong>
          </div>
        </header>

        <section className="summary-grid" aria-label="Farm summary">
          <SummaryCard label="Total Acres" value={totalAcres.toLocaleString()} />
          <SummaryCard label="Estimated Crop Gross" value={formatCurrency(totalGross)} />
          <SummaryCard label="Estimated Input Costs" value={formatCurrency(totalInputCosts)} />
          <SummaryCard
            label="Projected Net"
            value={formatCurrency(projectedNet)}
            tone={projectedNet >= 0 ? "positive" : "warning"}
          />
        </section>

        <section className="content-grid content-grid-wide">
          <FieldProfitability
            fields={fields}
            getFieldGross={getFieldGross}
            onAddField={addField}
            onDeleteField={deleteField}
            onFieldChange={updateField}
            onResetFields={resetFields}
          />
          <WeatherWatch weather={weather} />
        </section>

        <section className="content-grid">
          <InputCostSummary
            inputCosts={inputCosts}
            inputCostPerAcre={inputCostPerAcre}
            totalInputCosts={totalInputCosts}
            totalAcres={totalAcres}
            onInputCostChange={updateInputCost}
            onResetInputCosts={resetInputCosts}
          />
          <CommodityPrices commodityPrices={commodityPrices} fuelCosts={fuelCosts} />
        </section>

        <FarmCharts
          fields={fields}
          inputCosts={inputCosts}
          getFieldGross={getFieldGross}
        />

        <section className="content-grid">
          <EquipmentPanel
            equipment={equipment}
            onEquipmentChange={updateEquipment}
            onResetEquipment={resetEquipment}
          />
          <section className="panel future-panel">
            <div className="panel-header">
              <div>
                <p className="section-kicker">Roadmap</p>
                <h2>Built for Expansion</h2>
              </div>
            </div>
            <div className="roadmap-list">
              <span>Open-Meteo weather API</span>
              <span>EIA fuel price API</span>
              <span>Editable field records</span>
              <span>Saved farm data</span>
              <span>Charts and seasonal comparisons</span>
              <span>Backend and auth later</span>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
