import { useState } from "react";
import { CollapseButton } from "./CollapseButton.jsx";

const taskPriorities = ["High", "Medium", "Low"];
const taskStatuses = ["Planned", "In progress", "Done"];
const blankTask = {
  title: "",
  relatedType: "Field",
  relatedId: "",
  dueDate: "",
  priority: "Medium",
  status: "Planned",
};

export function FarmTasks({
  equipment,
  fields,
  id,
  isCollapsed,
  tasks,
  onAddTask,
  onDeleteTask,
  onTaskChange,
  onToggleCollapse,
}) {
  const [newTask, setNewTask] = useState(blankTask);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const filteredTasks = tasks.filter(
    (task) =>
      (statusFilter === "All" || task.status === statusFilter) &&
      (priorityFilter === "All" || task.priority === priorityFilter)
  );
  const sortedTasks = getSortedTasks(filteredTasks);

  function updateNewTask(key, value) {
    setNewTask((currentTask) => ({
      ...currentTask,
      [key]: value,
      ...(key === "relatedType" ? { relatedId: "" } : {}),
    }));
  }

  function handleAddTask(event) {
    event.preventDefault();

    if (!newTask.title.trim()) {
      return;
    }

    onAddTask({
      ...newTask,
      title: newTask.title.trim(),
    });
    setNewTask(blankTask);
  }

  return (
    <section className="panel task-panel" id={id}>
      <div className="panel-header">
        <div>
          <p className="section-kicker">Tasks</p>
          <h2>Farm Reminders</h2>
        </div>
        <div className="panel-actions">
          <span className="badge">Saved in browser</span>
          <CollapseButton
            isCollapsed={isCollapsed}
            label="tasks"
            onToggle={onToggleCollapse}
          />
        </div>
      </div>

      {!isCollapsed && <>
      <form className="task-form" onSubmit={handleAddTask}>
        <label>
          Task
          <input
            value={newTask.title}
            placeholder="Spray south field"
            onChange={(event) => updateNewTask("title", event.target.value)}
          />
        </label>
        <label>
          Related to
          <select
            value={newTask.relatedType}
            onChange={(event) =>
              updateNewTask("relatedType", event.target.value)
            }
          >
            <option>Field</option>
            <option>Equipment</option>
          </select>
        </label>
        <label>
          Item
          <select
            value={newTask.relatedId}
            onChange={(event) =>
              updateNewTask("relatedId", event.target.value)
            }
          >
            <option value="">General</option>
            {getRelatedOptions(newTask.relatedType, fields, equipment).map(
              (item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              )
            )}
          </select>
        </label>
        <label>
          Due date
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(event) => updateNewTask("dueDate", event.target.value)}
          />
        </label>
        <label>
          Priority
          <select
            value={newTask.priority}
            onChange={(event) => updateNewTask("priority", event.target.value)}
          >
            {taskPriorities.map((priority) => (
              <option key={priority}>{priority}</option>
            ))}
          </select>
        </label>
        <button className="primary-button" type="submit">
          Add task
        </button>
      </form>

      <div className="filter-bar">
        <label>
          Status
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option>All</option>
            {taskStatuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
        <label>
          Priority
          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
          >
            <option>All</option>
            {taskPriorities.map((priority) => (
              <option key={priority}>{priority}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="task-list">
        {sortedTasks.length === 0 && (
          <p className="empty-state">No reminders match these filters.</p>
        )}
        {sortedTasks.map((task) => {
          const dueStatus = getDueStatus(task);

          return (
            <article className="task-row" key={task.id}>
              <div>
                <h3>{task.title}</h3>
                <p>
                  {getRelatedLabel(task, fields, equipment)} -{" "}
                  {task.dueDate || "No due date"}
                </p>
              </div>
              <label>
                Priority
                <select
                  value={task.priority}
                  onChange={(event) =>
                    onTaskChange(task.id, "priority", event.target.value)
                  }
                >
                  {taskPriorities.map((priority) => (
                    <option key={priority}>{priority}</option>
                  ))}
                </select>
              </label>
              <label>
                Status
                <select
                  value={task.status}
                  onChange={(event) =>
                    onTaskChange(task.id, "status", event.target.value)
                  }
                >
                  {taskStatuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>
              <div className="task-badge-stack">
                <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                  {task.priority}
                </span>
                <span className={`task-due ${dueStatus.tone}`}>
                  {dueStatus.label}
                </span>
              </div>
              <button
                className="danger-button"
                type="button"
                onClick={() => onDeleteTask(task.id)}
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

function getRelatedOptions(relatedType, fields, equipment) {
  return relatedType === "Equipment" ? equipment : fields;
}

function getRelatedLabel(task, fields, equipment) {
  const collection = getRelatedOptions(task.relatedType, fields, equipment);
  const relatedItem = collection.find((item) => item.id === Number(task.relatedId));

  if (!relatedItem) {
    return "General";
  }

  return `${task.relatedType}: ${relatedItem.name}`;
}

function getPriorityClass(priority) {
  if (priority === "High") {
    return "task-priority-high";
  }

  if (priority === "Low") {
    return "task-priority-low";
  }

  return "task-priority-medium";
}

function getSortedTasks(tasks) {
  return [...tasks].sort((taskA, taskB) => {
    if (taskA.status === "Done" && taskB.status !== "Done") {
      return 1;
    }

    if (taskA.status !== "Done" && taskB.status === "Done") {
      return -1;
    }

    return getTaskDateValue(taskA) - getTaskDateValue(taskB);
  });
}

function getTaskDateValue(task) {
  if (!task.dueDate) {
    return Number.MAX_SAFE_INTEGER;
  }

  return new Date(`${task.dueDate}T00:00:00`).getTime();
}

function getDueStatus(task) {
  if (task.status === "Done") {
    return { label: "Done", tone: "task-due-done" };
  }

  if (!task.dueDate) {
    return { label: "No date", tone: "task-due-neutral" };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(`${task.dueDate}T00:00:00`);
  const dayDifference = Math.round(
    (dueDate.getTime() - today.getTime()) / 86400000
  );

  if (dayDifference < 0) {
    return {
      label: `${Math.abs(dayDifference)} day${
        dayDifference === -1 ? "" : "s"
      } overdue`,
      tone: "task-due-overdue",
    };
  }

  if (dayDifference === 0) {
    return { label: "Due today", tone: "task-due-today" };
  }

  if (dayDifference <= 7) {
    return {
      label: `Due in ${dayDifference} day${dayDifference === 1 ? "" : "s"}`,
      tone: "task-due-soon",
    };
  }

  return { label: "Upcoming", tone: "task-due-neutral" };
}
