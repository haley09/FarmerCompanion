export function downloadCsv(filename, rows) {
  const csv = rows.map((row) => row.map(escapeCell).join(",")).join("\n");
  const csvFile = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const csvUrl = URL.createObjectURL(csvFile);
  const downloadLink = document.createElement("a");

  downloadLink.href = csvUrl;
  downloadLink.download = filename;
  downloadLink.click();
  URL.revokeObjectURL(csvUrl);
}

function escapeCell(value) {
  const cell = String(value ?? "");

  if (/[",\n]/.test(cell)) {
    return `"${cell.replaceAll('"', '""')}"`;
  }

  return cell;
}
