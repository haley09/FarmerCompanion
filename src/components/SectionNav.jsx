const sections = [
  { href: "#summary", key: "summary", label: "Summary" },
  { href: "#team", key: "team", label: "Team", ownerOnly: true },
  { href: "#fields", key: "fields", label: "Fields" },
  { href: "#markets", key: "markets", label: "Markets" },
  { href: "#records", key: "records", label: "Records" },
  { href: "#tasks", key: "tasks", label: "Tasks" },
  { href: "#equipment", key: "equipment", label: "Equipment" },
  { href: "#reports", key: "reports", label: "Reports" },
];

export function SectionNav({ canViewSection = () => true, isOwner = true }) {
  const visibleSections = sections.filter(
    (section) =>
      (!section.ownerOnly || isOwner) &&
      (section.ownerOnly || canViewSection(section.key))
  );

  return (
    <nav className="section-nav no-print" aria-label="Dashboard sections">
      {visibleSections.map((section) => (
        <a href={section.href} key={section.href}>
          {section.label}
        </a>
      ))}
    </nav>
  );
}
