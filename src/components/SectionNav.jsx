const sections = [
  { href: "#summary", label: "Summary" },
  { href: "#fields", label: "Fields" },
  { href: "#markets", label: "Markets" },
  { href: "#records", label: "Records" },
  { href: "#tasks", label: "Tasks" },
  { href: "#equipment", label: "Equipment" },
  { href: "#reports", label: "Reports" },
];

export function SectionNav() {
  return (
    <nav className="section-nav no-print" aria-label="Dashboard sections">
      {sections.map((section) => (
        <a href={section.href} key={section.href}>
          {section.label}
        </a>
      ))}
    </nav>
  );
}
