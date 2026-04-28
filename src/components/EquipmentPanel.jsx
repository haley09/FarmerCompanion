export function EquipmentPanel({ equipment }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Equipment</p>
          <h2>Equipment Management</h2>
        </div>
      </div>

      <div className="equipment-list">
        {equipment.map((item) => (
          <article className="equipment-row" key={item.id}>
            <div>
              <h3>{item.name}</h3>
              <p>{item.model}</p>
            </div>
            <div>
              <span>Hours</span>
              <strong>{item.hours.toLocaleString()}</strong>
            </div>
            <div>
              <span>Next service</span>
              <strong>{item.nextService.toLocaleString()} hrs</strong>
            </div>
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

  if (status === "Ready") {
    return "service-ready";
  }

  return "service-good";
}
