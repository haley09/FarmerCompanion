import { useState } from "react";
import { CollapseButton } from "./CollapseButton.jsx";

const equipmentStatuses = ["Good", "Ready", "Service Soon", "Down"];
const blankEquipment = {
  name: "",
  model: "",
  hours: 0,
  nextService: 0,
  status: "Good",
};

export function EquipmentPanel({
  equipment,
  id,
  isCollapsed,
  onAddEquipment,
  onDeleteEquipment,
  onEquipmentChange,
  onResetEquipment,
  onToggleCollapse,
}) {
  const [newEquipment, setNewEquipment] = useState(blankEquipment);

  function updateNewEquipment(key, value) {
    setNewEquipment((currentEquipment) => ({
      ...currentEquipment,
      [key]: value,
    }));
  }

  function handleAddEquipment(event) {
    event.preventDefault();

    if (!newEquipment.name.trim()) {
      return;
    }

    onAddEquipment({
      ...newEquipment,
      name: newEquipment.name.trim(),
      model: newEquipment.model.trim() || "Unlisted model",
    });
    setNewEquipment(blankEquipment);
  }

  function handleResetEquipment() {
    if (window.confirm("Reset equipment to the starter list?")) {
      onResetEquipment();
    }
  }

  function handleDeleteEquipment(item) {
    if (window.confirm(`Delete ${item.name}? This cannot be undone.`)) {
      onDeleteEquipment(item.id);
    }
  }

  return (
    <section className="panel" id={id}>
      <div className="panel-header">
        <div>
          <p className="section-kicker">Equipment</p>
          <h2>Equipment Management</h2>
        </div>
        <div className="panel-actions">
          <span className="badge">Saved in browser</span>
          <CollapseButton
            isCollapsed={isCollapsed}
            label="equipment"
            onToggle={onToggleCollapse}
          />
          <button className="ghost-button" type="button" onClick={handleResetEquipment}>
            Reset equipment
          </button>
        </div>
      </div>

      {!isCollapsed && <>
      <form className="add-equipment-form" onSubmit={handleAddEquipment}>
        <label>
          Equipment
          <input
            value={newEquipment.name}
            placeholder="Grain cart"
            onChange={(event) =>
              updateNewEquipment("name", event.target.value)
            }
          />
        </label>
        <label>
          Model
          <input
            value={newEquipment.model}
            placeholder="Kinze 1051"
            onChange={(event) =>
              updateNewEquipment("model", event.target.value)
            }
          />
        </label>
        <label>
          Hours
          <input
            type="number"
            min="0"
            value={newEquipment.hours}
            onChange={(event) =>
              updateNewEquipment("hours", event.target.value)
            }
          />
        </label>
        <label>
          Next service
          <input
            type="number"
            min="0"
            value={newEquipment.nextService}
            onChange={(event) =>
              updateNewEquipment("nextService", event.target.value)
            }
          />
        </label>
        <label>
          Status
          <select
            value={newEquipment.status}
            onChange={(event) =>
              updateNewEquipment("status", event.target.value)
            }
          >
            {equipmentStatuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
        <button className="primary-button" type="submit">
          Add equipment
        </button>
      </form>

      <div className="equipment-list">
        {equipment.length === 0 && (
          <p className="empty-state">No equipment yet. Add a machine above to start tracking hours and service windows.</p>
        )}
        {equipment.map((item) => {
          const serviceAlert = getServiceAlert(item);

          return (
            <article className="equipment-row" key={item.id}>
              <label>
                Equipment
                <input
                  value={item.name}
                  onChange={(event) =>
                    onEquipmentChange(item.id, "name", event.target.value)
                  }
                />
              </label>
              <label>
                Model
                <input
                  value={item.model}
                  onChange={(event) =>
                    onEquipmentChange(item.id, "model", event.target.value)
                  }
                />
              </label>
              <label>
                Hours
                <input
                  type="number"
                  min="0"
                  value={item.hours}
                  onChange={(event) =>
                    onEquipmentChange(item.id, "hours", event.target.value)
                  }
                />
              </label>
              <label>
                Next service
                <input
                  type="number"
                  min="0"
                  value={item.nextService}
                  onChange={(event) =>
                    onEquipmentChange(item.id, "nextService", event.target.value)
                  }
                />
              </label>
              <label>
                Status
                <select
                  value={item.status}
                  onChange={(event) =>
                    onEquipmentChange(item.id, "status", event.target.value)
                  }
                >
                  {equipmentStatuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>
              <div className="equipment-status-stack">
                <span className={`service-status ${getStatusClass(item.status)}`}>
                  {item.status}
                </span>
                <span className={`service-alert ${serviceAlert.tone}`}>
                  {serviceAlert.label}
                </span>
              </div>
              <button
                className="danger-button"
                type="button"
                onClick={() => handleDeleteEquipment(item)}
              >
                Delete
              </button>
            </article>
          );
        })}
      </div>
      </>}
    </section>
  );
}

function getStatusClass(status) {
  if (status === "Service Soon") {
    return "service-warning";
  }

  if (status === "Down") {
    return "service-down";
  }

  if (status === "Ready") {
    return "service-ready";
  }

  return "service-good";
}

function getServiceAlert(item) {
  const hoursRemaining = item.nextService - item.hours;

  if (hoursRemaining <= 0) {
    return {
      label: `${Math.abs(hoursRemaining).toLocaleString()} hrs overdue`,
      tone: "service-alert-overdue",
    };
  }

  if (hoursRemaining <= 25) {
    return {
      label: `${hoursRemaining.toLocaleString()} hrs left`,
      tone: "service-alert-warning",
    };
  }

  return {
    label: `${hoursRemaining.toLocaleString()} hrs left`,
    tone: "service-alert-good",
  };
}
