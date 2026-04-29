const equipmentStatuses = ["Good", "Ready", "Service Soon", "Down"];

export function EquipmentPanel({
  equipment,
  onEquipmentChange,
  onResetEquipment,
}) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Equipment</p>
          <h2>Equipment Management</h2>
        </div>
        <div className="panel-actions">
          <span className="badge">Saved in browser</span>
          <button className="ghost-button" type="button" onClick={onResetEquipment}>
            Reset equipment
          </button>
        </div>
      </div>

      <div className="equipment-list">
        {equipment.map((item) => (
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
            <span className={`service-status ${getStatusClass(item.status)}`}>
              {item.status}
            </span>
          </article>
        ))}
      </div>
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
