import { useRef, useState } from "react";

export function DataTransfer({ farmData, onImportFarmData }) {
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");

  function handleExport() {
    const backup = {
      app: "FarmComp",
      version: 1,
      exportedAt: new Date().toISOString(),
      data: farmData,
    };
    const backupFile = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });
    const backupUrl = URL.createObjectURL(backupFile);
    const downloadLink = document.createElement("a");

    downloadLink.href = backupUrl;
    downloadLink.download = `farmcomp-backup-${getDateStamp()}.json`;
    downloadLink.click();
    URL.revokeObjectURL(backupUrl);
    setMessage("Backup file downloaded.");
  }

  async function handleImport(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const backup = JSON.parse(await file.text());
      const importedData = validateBackup(backup);

      onImportFarmData(importedData);
      setMessage("Backup imported. Your dashboard has been updated.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      event.target.value = "";
    }
  }

  return (
    <section className="panel transfer-panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Transfer</p>
          <h2>Move Farm Data</h2>
        </div>
      </div>

      <div className="transfer-actions">
        <button className="primary-button" type="button" onClick={handleExport}>
          Download backup
        </button>
        <button
          className="ghost-button"
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload backup
        </button>
        <input
          ref={fileInputRef}
          className="file-input"
          type="file"
          accept="application/json,.json"
          onChange={handleImport}
        />
      </div>

      <p className="transfer-note">
        {message ||
          "Use a backup file to move fields, costs, equipment, and location to another browser."}
      </p>
    </section>
  );
}

function validateBackup(backup) {
  const data = backup?.data || backup;

  if (
    !Array.isArray(data.fields) ||
    !Array.isArray(data.inputCosts) ||
    !Array.isArray(data.equipment) ||
    !data.farmLocation
  ) {
    throw new Error("That file does not look like a FarmComp backup.");
  }

  return {
    fields: data.fields,
    inputCosts: data.inputCosts,
    equipment: data.equipment,
    farmLocation: data.farmLocation,
    farmProfile: data.farmProfile,
    cropBasis: data.cropBasis,
    cropTargets: data.cropTargets,
    farmTasks: data.farmTasks,
    fieldActivities: data.fieldActivities,
    equipmentServiceLogs: data.equipmentServiceLogs,
  };
}

function getDateStamp() {
  return new Date().toISOString().slice(0, 10);
}
