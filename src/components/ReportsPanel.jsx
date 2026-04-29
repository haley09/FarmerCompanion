import { downloadCsv } from "../utils/csv.js";

export function ReportsPanel({
  equipmentServiceLogs,
  farmTasks,
  fieldActivities,
  fields,
  id,
}) {
  function exportFieldsCsv() {
    downloadCsv("farmcomp-fields.csv", [
      ["Name", "Crop", "Acres", "Yield / acre", "Price / bushel", "Status"],
      ...fields.map((field) => [
        field.name,
        field.crop,
        field.acres,
        field.yieldPerAcre,
        field.pricePerBushel,
        field.status,
      ]),
    ]);
  }

  function exportTasksCsv() {
    downloadCsv("farmcomp-tasks.csv", [
      ["Title", "Related type", "Related ID", "Due date", "Priority", "Status"],
      ...farmTasks.map((task) => [
        task.title,
        task.relatedType,
        task.relatedId,
        task.dueDate,
        task.priority,
        task.status,
      ]),
    ]);
  }

  function exportRecordsCsv() {
    downloadCsv("farmcomp-records.csv", [
      ["Record kind", "Item ID", "Date", "Type", "Hours", "Cost", "Note"],
      ...fieldActivities.map((activity) => [
        "Field activity",
        activity.fieldId,
        activity.date,
        activity.type,
        "",
        "",
        activity.note,
      ]),
      ...equipmentServiceLogs.map((log) => [
        "Equipment service",
        log.equipmentId,
        log.date,
        log.type,
        log.hours,
        log.cost,
        log.note,
      ]),
    ]);
  }

  return (
    <section className="panel reports-panel no-print" id={id}>
      <div className="panel-header">
        <div>
          <p className="section-kicker">Reports</p>
          <h2>Planning Report</h2>
        </div>
      </div>
      <div className="reports-actions">
        <button className="primary-button" type="button" onClick={() => window.print()}>
          Print planning report
        </button>
        <button className="ghost-button" type="button" onClick={exportFieldsCsv}>
          Export fields CSV
        </button>
        <button className="ghost-button" type="button" onClick={exportTasksCsv}>
          Export tasks CSV
        </button>
        <button className="ghost-button" type="button" onClick={exportRecordsCsv}>
          Export records CSV
        </button>
      </div>
      <p className="reports-note">
        Creates a clean print or PDF snapshot of the farm profile, alerts, field
        margins, market targets, tasks, and equipment service status.
      </p>
    </section>
  );
}
