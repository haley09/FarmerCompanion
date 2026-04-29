export function CollapseButton({ isCollapsed, label, onToggle }) {
  return (
    <button className="collapse-button" type="button" onClick={onToggle}>
      {isCollapsed ? "Expand" : "Collapse"} {label}
    </button>
  );
}
