import { formatCurrency, formatPrice } from "../utils/formatters.js";

export function PlanningReport({
  alerts,
  averageNetPerAcre,
  cropBasis,
  cropTargets,
  equipment,
  fields,
  farmProfile,
  inputCosts,
  inputCostPerAcre,
  projectedNet,
  tasks,
  totalAcres,
  totalGross,
  totalInputCosts,
  getFieldBreakEvenPrice,
  getFieldMarginPerBushel,
  getFieldNet,
}) {
  const openTasks = tasks.filter((task) => task.status !== "Done");

  return (
    <section className="print-report">
      <header>
        <p>FarmComp Planning Report</p>
        <h1>{farmProfile.farmName || "FarmComp"}</h1>
        <span>
          {farmProfile.planningYear} season - Generated{" "}
          {new Date().toLocaleDateString()}
        </span>
      </header>

      <div className="print-summary-grid">
        <PrintMetric label="Total acres" value={totalAcres.toLocaleString()} />
        <PrintMetric label="Projected net" value={formatCurrency(projectedNet)} />
        <PrintMetric
          label="Avg net / acre"
          value={formatCurrency(averageNetPerAcre)}
        />
        <PrintMetric
          label="Input cost / acre"
          value={formatCurrency(inputCostPerAcre)}
        />
      </div>

      <PrintSection title="Priority Alerts">
        {alerts.map((alert) => (
          <div className="print-row" key={alert.id}>
            <strong>{alert.title}</strong>
            <span>{alert.detail}</span>
          </div>
        ))}
      </PrintSection>

      <PrintSection title="Farm Totals">
        <div className="print-row">
          <strong>Estimated crop gross</strong>
          <span>{formatCurrency(totalGross)}</span>
        </div>
        <div className="print-row">
          <strong>Estimated input costs</strong>
          <span>{formatCurrency(totalInputCosts)}</span>
        </div>
      </PrintSection>

      <PrintSection title="Field Margins">
        {fields.map((field) => (
          <div className="print-row" key={field.id}>
            <strong>{field.name}</strong>
            <span>
              {field.crop}: net {formatCurrency(getFieldNet(field, inputCosts))},
              margin{" "}
              {formatCurrency(getFieldMarginPerBushel(field, inputCosts), {
                maximumFractionDigits: 2,
              })}
              /bu, break-even{" "}
              {formatCurrency(getFieldBreakEvenPrice(field, inputCosts), {
                maximumFractionDigits: 2,
              })}
              /bu
            </span>
          </div>
        ))}
      </PrintSection>

      <PrintSection title="Market Targets">
        {Object.entries(cropTargets).map(([crop, target]) => (
          <div className="print-row" key={crop}>
            <strong>{crop}</strong>
            <span>
              Target {formatPrice(Number(target.targetPrice) || 0)}, basis{" "}
              {formatPrice(cropBasis[crop] || 0)}. {target.note}
            </span>
          </div>
        ))}
      </PrintSection>

      <PrintSection title="Open Tasks">
        {openTasks.map((task) => (
          <div className="print-row" key={task.id}>
            <strong>{task.title}</strong>
            <span>
              {task.priority} priority, {task.status}, due{" "}
              {task.dueDate || "not set"}
            </span>
          </div>
        ))}
      </PrintSection>

      <PrintSection title="Equipment Status">
        {equipment.map((item) => (
          <div className="print-row" key={item.id}>
            <strong>{item.name}</strong>
            <span>
              {item.status}, {Number(item.hours).toLocaleString()} hrs, next
              service at {Number(item.nextService).toLocaleString()} hrs
            </span>
          </div>
        ))}
      </PrintSection>
    </section>
  );
}

function PrintMetric({ label, value }) {
  return (
    <div className="print-metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function PrintSection({ children, title }) {
  return (
    <section className="print-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
