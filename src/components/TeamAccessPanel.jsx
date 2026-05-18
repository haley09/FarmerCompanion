const permissionLabels = [
  { key: "summary", label: "Summary" },
  { key: "fields", label: "Fields and weather" },
  { key: "markets", label: "Markets and input costs" },
  { key: "records", label: "Field records" },
  { key: "tasks", label: "Tasks" },
  { key: "equipment", label: "Equipment and service" },
  { key: "reports", label: "Reports and backups" },
];

export function TeamAccessPanel({
  activities,
  employees,
  equipmentServiceLogs,
  farmTasks,
  fieldActivities,
  onPermissionChange,
}) {
  return (
    <section className="panel team-panel" id="team">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Team</p>
          <h2>Employee Access</h2>
        </div>
        <span className="badge">Owner view</span>
      </div>

      <div className="team-grid">
        <div className="team-access-list">
          {employees.map((employee) => (
            <article className="team-card" key={employee.id}>
              <div>
                <h3>{employee.name}</h3>
                <p>{employee.email}</p>
              </div>

              <div className="permission-grid">
                {permissionLabels.map((permission) => (
                  <label className="permission-toggle" key={permission.key}>
                    <input
                      type="checkbox"
                      checked={Boolean(employee.permissions[permission.key])}
                      onChange={(event) =>
                        onPermissionChange(
                          employee.id,
                          permission.key,
                          event.target.checked
                        )
                      }
                    />
                    {permission.label}
                  </label>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="employee-activity-panel">
          <h3>Employee Activity</h3>
          <div className="employee-activity-list">
            {activities.length === 0 && (
              <p className="empty-state">No employee activity has been recorded yet.</p>
            )}
            {activities.map((activity) => (
              <div className="employee-activity-row" key={activity.id}>
                <span>{activity.type}</span>
                <strong>{activity.title}</strong>
                <p>{activity.detail}</p>
              </div>
            ))}
          </div>
          <div className="employee-activity-summary">
            <span>{farmTasks.length} tasks</span>
            <span>{fieldActivities.length} field records</span>
            <span>{equipmentServiceLogs.length} service logs</span>
          </div>
        </div>
      </div>
    </section>
  );
}
