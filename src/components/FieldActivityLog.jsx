import { useState } from "react";
import { CollapseButton } from "./CollapseButton.jsx";

const activityTypes = [
  "Planting",
  "Application",
  "Scouting",
  "Irrigation",
  "Harvest",
  "Note",
];
const blankActivity = {
  fieldId: "",
  date: "",
  type: "Scouting",
  note: "",
};

export function FieldActivityLog({
  activities,
  fields,
  id,
  isCollapsed,
  onAddActivity,
  onDeleteActivity,
  onToggleCollapse,
}) {
  const [newActivity, setNewActivity] = useState(blankActivity);
  const [fieldFilter, setFieldFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const filteredActivities = activities.filter(
    (activity) =>
      (fieldFilter === "All" || Number(activity.fieldId) === Number(fieldFilter)) &&
      (typeFilter === "All" || activity.type === typeFilter)
  );
  const sortedActivities = [...filteredActivities].sort(
    (activityA, activityB) =>
      getActivityDateValue(activityB) - getActivityDateValue(activityA)
  );

  function updateNewActivity(key, value) {
    setNewActivity((currentActivity) => ({
      ...currentActivity,
      [key]: value,
    }));
  }

  function handleAddActivity(event) {
    event.preventDefault();

    if (!newActivity.fieldId || !newActivity.note.trim()) {
      return;
    }

    onAddActivity({
      ...newActivity,
      note: newActivity.note.trim(),
    });
    setNewActivity(blankActivity);
  }

  return (
    <section className="panel activity-panel" id={id}>
      <div className="panel-header">
        <div>
          <p className="section-kicker">Records</p>
          <h2>Field Activity History</h2>
        </div>
        <div className="panel-actions">
          <span className="badge">Saved in browser</span>
          <CollapseButton
            isCollapsed={isCollapsed}
            label="records"
            onToggle={onToggleCollapse}
          />
        </div>
      </div>

      {!isCollapsed && <>
      <form className="activity-form" onSubmit={handleAddActivity}>
        <label>
          Field
          <select
            value={newActivity.fieldId}
            onChange={(event) => updateNewActivity("fieldId", event.target.value)}
          >
            <option value="">Choose field</option>
            {fields.map((field) => (
              <option key={field.id} value={field.id}>
                {field.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date
          <input
            type="date"
            value={newActivity.date}
            onChange={(event) => updateNewActivity("date", event.target.value)}
          />
        </label>
        <label>
          Type
          <select
            value={newActivity.type}
            onChange={(event) => updateNewActivity("type", event.target.value)}
          >
            {activityTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="activity-note-input">
          Note
          <input
            value={newActivity.note}
            placeholder="What happened in the field?"
            onChange={(event) => updateNewActivity("note", event.target.value)}
          />
        </label>
        <button className="primary-button" type="submit">
          Add record
        </button>
      </form>

      <div className="filter-bar">
        <label>
          Field
          <select
            value={fieldFilter}
            onChange={(event) => setFieldFilter(event.target.value)}
          >
            <option>All</option>
            {fields.map((field) => (
              <option key={field.id} value={field.id}>
                {field.name}
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
            {activityTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="activity-list">
        {sortedActivities.length === 0 && (
          <p className="empty-state">No field activity records match these filters.</p>
        )}
        {sortedActivities.map((activity) => (
          <article className="activity-row" key={activity.id}>
            <div>
              <span>{activity.type}</span>
              <h3>{getFieldName(activity.fieldId, fields)}</h3>
            </div>
            <p>{activity.note}</p>
            <strong>{activity.date || "No date"}</strong>
            <button
              className="danger-button"
              type="button"
              onClick={() => onDeleteActivity(activity.id)}
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

function getFieldName(fieldId, fields) {
  const field = fields.find((item) => item.id === Number(fieldId));
  return field?.name || "Unknown field";
}

function getActivityDateValue(activity) {
  if (!activity.date) {
    return 0;
  }

  return new Date(`${activity.date}T00:00:00`).getTime();
}
