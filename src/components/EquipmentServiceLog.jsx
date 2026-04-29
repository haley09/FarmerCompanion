import { useState } from "react";
import { formatCurrency } from "../utils/formatters.js";
import { CollapseButton } from "./CollapseButton.jsx";

const serviceTypes = [
  "Oil change",
  "Inspection",
  "Repair",
  "Parts",
  "Tires",
  "Calibration",
  "Other",
];
const blankServiceLog = {
  equipmentId: "",
  date: "",
  type: "Inspection",
  hours: 0,
  cost: 0,
  note: "",
};

export function EquipmentServiceLog({
  equipment,
  isCollapsed,
  logs,
  onAddServiceLog,
  onDeleteServiceLog,
  onToggleCollapse,
}) {
  const [newLog, setNewLog] = useState(blankServiceLog);
  const [equipmentFilter, setEquipmentFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const filteredLogs = logs.filter(
    (log) =>
      (equipmentFilter === "All" ||
        Number(log.equipmentId) === Number(equipmentFilter)) &&
      (typeFilter === "All" || log.type === typeFilter)
  );
  const sortedLogs = [...filteredLogs].sort(
    (logA, logB) => getLogDateValue(logB) - getLogDateValue(logA)
  );

  function updateNewLog(key, value) {
    setNewLog((currentLog) => ({
      ...currentLog,
      [key]: value,
    }));
  }

  function handleAddServiceLog(event) {
    event.preventDefault();

    if (!newLog.equipmentId || !newLog.note.trim()) {
      return;
    }

    onAddServiceLog({
      ...newLog,
      note: newLog.note.trim(),
    });
    setNewLog(blankServiceLog);
  }

  return (
    <section className="panel service-log-panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Service</p>
          <h2>Equipment Service Logs</h2>
        </div>
        <div className="panel-actions">
          <span className="badge">Saved in browser</span>
          <CollapseButton
            isCollapsed={isCollapsed}
            label="service logs"
            onToggle={onToggleCollapse}
          />
        </div>
      </div>

      {!isCollapsed && <>
      <form className="service-log-form" onSubmit={handleAddServiceLog}>
        <label>
          Equipment
          <select
            value={newLog.equipmentId}
            onChange={(event) => updateNewLog("equipmentId", event.target.value)}
          >
            <option value="">Choose equipment</option>
            {equipment.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date
          <input
            type="date"
            value={newLog.date}
            onChange={(event) => updateNewLog("date", event.target.value)}
          />
        </label>
        <label>
          Type
          <select
            value={newLog.type}
            onChange={(event) => updateNewLog("type", event.target.value)}
          >
            {serviceTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          Hours
          <input
            type="number"
            min="0"
            value={newLog.hours}
            onChange={(event) => updateNewLog("hours", event.target.value)}
          />
        </label>
        <label>
          Cost
          <input
            type="number"
            min="0"
            step="0.01"
            value={newLog.cost}
            onChange={(event) => updateNewLog("cost", event.target.value)}
          />
        </label>
        <label className="service-note-input">
          Note
          <input
            value={newLog.note}
            placeholder="What service was completed?"
            onChange={(event) => updateNewLog("note", event.target.value)}
          />
        </label>
        <button className="primary-button" type="submit">
          Add service
        </button>
      </form>

      <div className="filter-bar">
        <label>
          Equipment
          <select
            value={equipmentFilter}
            onChange={(event) => setEquipmentFilter(event.target.value)}
          >
            <option>All</option>
            {equipment.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Type
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
          >
            <option>All</option>
            {serviceTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="service-log-list">
        {sortedLogs.length === 0 && (
          <p className="empty-state">No service records match these filters.</p>
        )}
        {sortedLogs.map((log) => (
          <article className="service-log-row" key={log.id}>
            <div>
              <span>{log.type}</span>
              <h3>{getEquipmentName(log.equipmentId, equipment)}</h3>
            </div>
            <p>{log.note}</p>
            <div className="service-log-meta">
              <strong>{log.date || "No date"}</strong>
              <span>{Number(log.hours).toLocaleString()} hrs</span>
              <span>{formatCurrency(Number(log.cost) || 0)}</span>
            </div>
            <button
              className="danger-button"
              type="button"
              onClick={() => onDeleteServiceLog(log.id)}
            >
              Delete
            </button>
          </article>
        ))}
      </div>
      </>}
    </section>
  );
}

function getEquipmentName(equipmentId, equipment) {
  const item = equipment.find((equipmentItem) => equipmentItem.id === Number(equipmentId));
  return item?.name || "Unknown equipment";
}

function getLogDateValue(log) {
  if (!log.date) {
    return 0;
  }

  return new Date(`${log.date}T00:00:00`).getTime();
}
