export function PriorityAlerts({ alerts }) {
  return (
    <section className="panel alerts-panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Priorities</p>
          <h2>Priority Alerts</h2>
        </div>
        <span className="badge">{alerts.length} active</span>
      </div>

      <div className="alerts-grid">
        {alerts.map((alert) => (
          <article className={`alert-card alert-${alert.tone}`} key={alert.id}>
            <span>{alert.category}</span>
            <strong>{alert.title}</strong>
            <p>{alert.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
