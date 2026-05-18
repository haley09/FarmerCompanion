import { useEffect, useState } from "react";
import {
  commodityPrices,
  cropBasis as initialCropBasis,
  cropTargets as initialCropTargets,
  equipment as initialEquipment,
  equipmentServiceLogs as initialEquipmentServiceLogs,
  farmLocation as initialFarmLocation,
  farmProfile as initialFarmProfile,
  farmTasks as initialFarmTasks,
  fieldActivities as initialFieldActivities,
  fields as initialFields,
  fuelCosts,
  inputCosts as initialInputCosts,
  weather,
} from "./data/mockData.js";
import {
  getAverageNetPerAcre,
  getFieldBreakEvenPrice,
  getFieldGross,
  getFieldMarginPerBushel,
  getFieldNet,
  getFieldNetPerAcre,
  getInputCostPerAcre,
  getProjectedNet,
  getTotalAcres,
  getTotalGross,
  getTotalInputCost,
} from "./utils/calculations.js";
import { formatCurrency } from "./utils/formatters.js";
import { CommodityPrices } from "./components/CommodityPrices.jsx";
import { DataTransfer } from "./components/DataTransfer.jsx";
import { EquipmentPanel } from "./components/EquipmentPanel.jsx";
import { EquipmentServiceLog } from "./components/EquipmentServiceLog.jsx";
import { FarmCharts } from "./components/FarmCharts.jsx";
import { FarmProfile } from "./components/FarmProfile.jsx";
import { FarmTasks } from "./components/FarmTasks.jsx";
import { FieldActivityLog } from "./components/FieldActivityLog.jsx";
import { FieldProfitability } from "./components/FieldProfitability.jsx";
import { InputCostSummary } from "./components/InputCostSummary.jsx";
import { PlanningReport } from "./components/PlanningReport.jsx";
import { PriorityAlerts } from "./components/PriorityAlerts.jsx";
import { ReportsPanel } from "./components/ReportsPanel.jsx";
import { SectionNav } from "./components/SectionNav.jsx";
import { SummaryCard } from "./components/SummaryCard.jsx";
import { TeamAccessPanel } from "./components/TeamAccessPanel.jsx";
import { WeatherWatch } from "./components/WeatherWatch.jsx";
import { CollapseButton } from "./components/CollapseButton.jsx";
import {
  clearSavedFields,
  clearSavedEquipment,
  clearSavedInputCosts,
  loadSavedEquipment,
  loadSavedCommodityApiKey,
  loadSavedCropBasis,
  loadSavedCropTargets,
  loadSavedFieldActivities,
  loadSavedEquipmentServiceLogs,
  loadSavedFarmLocation,
  loadSavedFarmProfile,
  loadSavedFarmTasks,
  loadSavedCollapsedSections,
  loadSavedFields,
  loadSavedInputCosts,
  loadSavedTeamAccess,
  saveEquipment,
  saveCommodityApiKey,
  saveCropBasis,
  saveCropTargets,
  saveFieldActivities,
  saveEquipmentServiceLogs,
  saveFarmLocation,
  saveFarmProfile,
  saveFarmTasks,
  saveCollapsedSections,
  saveFields,
  saveInputCosts,
  saveTeamAccess,
} from "./utils/storage.js";

const defaultEmployeePermissions = {
  summary: true,
  fields: true,
  markets: false,
  records: true,
  tasks: true,
  equipment: false,
  reports: false,
};

const initialTeamAccess = {
  employees: [
    {
      id: 1,
      name: "Field Crew",
      email: "crew@farm.local",
      permissions: defaultEmployeePermissions,
    },
  ],
};

export default function App({ viewerRole = "owner" }) {
  const isOwner = viewerRole !== "employee";
  const [fields, setFields] = useState(() => loadSavedFields(initialFields));
  const [inputCosts, setInputCosts] = useState(() =>
    loadSavedInputCosts(initialInputCosts)
  );
  const [equipment, setEquipment] = useState(() =>
    loadSavedEquipment(initialEquipment)
  );
  const [farmLocation, setFarmLocation] = useState(() =>
    loadSavedFarmLocation(initialFarmLocation)
  );
  const [farmProfile, setFarmProfile] = useState(() =>
    loadSavedFarmProfile(initialFarmProfile)
  );
  const [commodityApiKey, setCommodityApiKey] = useState(() =>
    loadSavedCommodityApiKey()
  );
  const [cropBasis, setCropBasis] = useState(() =>
    loadSavedCropBasis(initialCropBasis)
  );
  const [cropTargets, setCropTargets] = useState(() =>
    loadSavedCropTargets(initialCropTargets)
  );
  const [farmTasks, setFarmTasks] = useState(() =>
    loadSavedFarmTasks(initialFarmTasks)
  );
  const [fieldActivities, setFieldActivities] = useState(() =>
    loadSavedFieldActivities(initialFieldActivities)
  );
  const [equipmentServiceLogs, setEquipmentServiceLogs] = useState(() =>
    loadSavedEquipmentServiceLogs(initialEquipmentServiceLogs)
  );
  const [collapsedSections, setCollapsedSections] = useState(() =>
    loadSavedCollapsedSections({})
  );
  const [teamAccess, setTeamAccess] = useState(() =>
    loadSavedTeamAccess(initialTeamAccess)
  );
  const employeePermissions =
    teamAccess.employees[0]?.permissions || defaultEmployeePermissions;
  const canViewSection = (section) =>
    isOwner || Boolean(employeePermissions[section]);
  const totalAcres = getTotalAcres(fields);
  const totalGross = getTotalGross(fields);
  const inputCostPerAcre = getInputCostPerAcre(inputCosts);
  const totalInputCosts = getTotalInputCost(fields, inputCosts);
  const projectedNet = getProjectedNet(fields, inputCosts);
  const averageNetPerAcre = getAverageNetPerAcre(fields, inputCosts);
  const priorityAlerts = getPriorityAlerts({
    cropBasis,
    cropTargets,
    equipment,
    fields,
    inputCosts,
    commodityPrices,
    tasks: farmTasks,
    weather,
  });

  useEffect(() => {
    saveFields(fields);
  }, [fields]);

  useEffect(() => {
    saveInputCosts(inputCosts);
  }, [inputCosts]);

  useEffect(() => {
    saveEquipment(equipment);
  }, [equipment]);

  useEffect(() => {
    saveFarmLocation(farmLocation);
  }, [farmLocation]);

  useEffect(() => {
    saveFarmProfile(farmProfile);
  }, [farmProfile]);

  useEffect(() => {
    saveCommodityApiKey(commodityApiKey);
  }, [commodityApiKey]);

  useEffect(() => {
    saveCropBasis(cropBasis);
  }, [cropBasis]);

  useEffect(() => {
    saveCropTargets(cropTargets);
  }, [cropTargets]);

  useEffect(() => {
    saveFarmTasks(farmTasks);
  }, [farmTasks]);

  useEffect(() => {
    saveFieldActivities(fieldActivities);
  }, [fieldActivities]);

  useEffect(() => {
    saveEquipmentServiceLogs(equipmentServiceLogs);
  }, [equipmentServiceLogs]);

  useEffect(() => {
    saveCollapsedSections(collapsedSections);
  }, [collapsedSections]);

  useEffect(() => {
    saveTeamAccess(teamAccess);
  }, [teamAccess]);

  function updateField(fieldId, key, value) {
    setFields((currentFields) =>
      currentFields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              [key]: ["acres", "yieldPerAcre", "pricePerBushel"].includes(key)
                ? Number(value) || 0
                : value,
            }
          : field
      )
    );
  }

  function addField(field) {
    setFields((currentFields) => [
      ...currentFields,
      {
        id: Date.now(),
        name: field.name,
        crop: field.crop,
        acres: Number(field.acres) || 0,
        yieldPerAcre: Number(field.yieldPerAcre) || 0,
        pricePerBushel: Number(field.pricePerBushel) || 0,
        status: field.status,
      },
    ]);
  }

  function deleteField(fieldId) {
    setFields((currentFields) =>
      currentFields.filter((field) => field.id !== fieldId)
    );
  }

  function resetFields() {
    clearSavedFields();
    setFields(initialFields);
  }

  function updateInputCost(inputName, value) {
    setInputCosts((currentInputCosts) =>
      currentInputCosts.map((input) =>
        input.name === inputName
          ? { ...input, costPerAcre: Number(value) || 0 }
          : input
      )
    );
  }

  function resetInputCosts() {
    clearSavedInputCosts();
    setInputCosts(initialInputCosts);
  }

  function updateEquipment(equipmentId, key, value) {
    setEquipment((currentEquipment) =>
      currentEquipment.map((item) =>
        item.id === equipmentId
          ? {
              ...item,
              [key]: ["hours", "nextService"].includes(key)
                ? Number(value) || 0
                : value,
            }
          : item
      )
    );
  }

  function addEquipment(item) {
    setEquipment((currentEquipment) => [
      ...currentEquipment,
      {
        id: Date.now(),
        name: item.name,
        model: item.model,
        hours: Number(item.hours) || 0,
        nextService: Number(item.nextService) || 0,
        status: item.status,
      },
    ]);
  }

  function deleteEquipment(equipmentId) {
    setEquipment((currentEquipment) =>
      currentEquipment.filter((item) => item.id !== equipmentId)
    );
  }

  function resetEquipment() {
    clearSavedEquipment();
    setEquipment(initialEquipment);
  }

  function importFarmData(farmData) {
    setFields(farmData.fields);
    setInputCosts(farmData.inputCosts);
    setEquipment(farmData.equipment);
    setFarmLocation(farmData.farmLocation);
    setFarmProfile(farmData.farmProfile || initialFarmProfile);
    setCropBasis(farmData.cropBasis || initialCropBasis);
    setCropTargets(farmData.cropTargets || initialCropTargets);
    setFarmTasks(farmData.farmTasks || initialFarmTasks);
    setFieldActivities(farmData.fieldActivities || initialFieldActivities);
    setEquipmentServiceLogs(
      farmData.equipmentServiceLogs || initialEquipmentServiceLogs
    );
  }

  function updateCropBasis(crop, value) {
    setCropBasis((currentBasis) => ({
      ...currentBasis,
      [crop]: Number(value) || 0,
    }));
  }

  function applyCashPriceToFields(crop, price) {
    setFields((currentFields) =>
      currentFields.map((field) =>
        field.crop.toLowerCase() === crop.toLowerCase()
          ? { ...field, pricePerBushel: Number(price) || 0 }
          : field
      )
    );
  }

  function updateCropTarget(crop, key, value) {
    setCropTargets((currentTargets) => ({
      ...currentTargets,
      [crop]: {
        ...(currentTargets[crop] || {}),
        [key]: key === "targetPrice" ? Number(value) || 0 : value,
      },
    }));
  }

  function addFarmTask(task) {
    setFarmTasks((currentTasks) => [
      ...currentTasks,
      {
        ...task,
        id: Date.now(),
        relatedId: task.relatedId ? Number(task.relatedId) : "",
      },
    ]);
  }

  function updateFarmTask(taskId, key, value) {
    setFarmTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, [key]: value } : task
      )
    );
  }

  function deleteFarmTask(taskId) {
    setFarmTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }

  function addFieldActivity(activity) {
    setFieldActivities((currentActivities) => [
      ...currentActivities,
      {
        ...activity,
        id: Date.now(),
        fieldId: Number(activity.fieldId),
      },
    ]);
  }

  function deleteFieldActivity(activityId) {
    setFieldActivities((currentActivities) =>
      currentActivities.filter((activity) => activity.id !== activityId)
    );
  }

  function addEquipmentServiceLog(log) {
    setEquipmentServiceLogs((currentLogs) => [
      ...currentLogs,
      {
        ...log,
        id: Date.now(),
        equipmentId: Number(log.equipmentId),
        hours: Number(log.hours) || 0,
        cost: Number(log.cost) || 0,
      },
    ]);
  }

  function deleteEquipmentServiceLog(logId) {
    setEquipmentServiceLogs((currentLogs) =>
      currentLogs.filter((log) => log.id !== logId)
    );
  }

  function toggleSection(sectionName) {
    setCollapsedSections((currentSections) => ({
      ...currentSections,
      [sectionName]: !currentSections[sectionName],
    }));
  }

  function isSectionCollapsed(sectionName) {
    return Boolean(collapsedSections[sectionName]);
  }

  function updateEmployeePermission(employeeId, permission, value) {
    setTeamAccess((currentTeamAccess) => ({
      ...currentTeamAccess,
      employees: currentTeamAccess.employees.map((employee) =>
        employee.id === employeeId
          ? {
              ...employee,
              permissions: {
                ...employee.permissions,
                [permission]: value,
              },
            }
          : employee
      ),
    }));
  }

  const employeeActivity = getEmployeeActivity({
    equipmentServiceLogs,
    farmTasks,
    fieldActivities,
    fields,
    equipment,
  });

  return (
    <main className="app-shell">
      <div className="dashboard">
        <header className="hero">
          <div>
            <p className="eyebrow">FarmerCompanion</p>
            <h1>{farmProfile.farmName || "FarmComp"}</h1>
            <p className="hero-copy">
              {isOwner
                ? "A practical crop farm dashboard for tracking fields, gross crop estimates, market prices, input costs, weather, fuel, equipment, and projected profitability."
                : "Your workspace shows the farm information and tools the owner has opened for your role."}
            </p>
          </div>
          <div className="season-pill">
            <span>{isOwner ? farmProfile.operatorName || "Owner dashboard" : "Employee dashboard"}</span>
            <strong>{farmProfile.planningYear} planning season</strong>
          </div>
        </header>

        <SectionNav canViewSection={canViewSection} isOwner={isOwner} />

        {canViewSection("summary") && <section className="summary-grid" id="summary" aria-label="Farm summary">
          <SummaryCard label="Total Acres" value={totalAcres.toLocaleString()} />
          <SummaryCard label="Estimated Crop Gross" value={formatCurrency(totalGross)} />
          <SummaryCard label="Estimated Input Costs" value={formatCurrency(totalInputCosts)} />
          <SummaryCard
            label="Projected Net"
            value={formatCurrency(projectedNet)}
            tone={projectedNet >= 0 ? "positive" : "warning"}
          />
          <SummaryCard
            label="Avg Net / Acre"
            value={formatCurrency(averageNetPerAcre)}
            tone={averageNetPerAcre >= 0 ? "positive" : "warning"}
          />
        </section>}

        {canViewSection("summary") && <PriorityAlerts alerts={priorityAlerts} />}

        {isOwner && <TeamAccessPanel
          activities={employeeActivity}
          employees={teamAccess.employees}
          equipmentServiceLogs={equipmentServiceLogs}
          farmTasks={farmTasks}
          fieldActivities={fieldActivities}
          onPermissionChange={updateEmployeePermission}
        />}

        {isOwner && <FarmProfile
          profile={farmProfile}
          onProfileChange={setFarmProfile}
        />}

        {canViewSection("fields") && <section className="content-grid content-grid-wide" id="fields">
          <FieldProfitability
            fields={fields}
            inputCosts={inputCosts}
            getFieldGross={getFieldGross}
            getFieldBreakEvenPrice={getFieldBreakEvenPrice}
            getFieldMarginPerBushel={getFieldMarginPerBushel}
            getFieldNet={getFieldNet}
            getFieldNetPerAcre={getFieldNetPerAcre}
            onAddField={addField}
            onDeleteField={deleteField}
            onFieldChange={updateField}
            onResetFields={resetFields}
          />
          <WeatherWatch
            fallbackWeather={weather}
            farmLocation={farmLocation}
            onFarmLocationChange={setFarmLocation}
          />
        </section>}

        {canViewSection("markets") && <section className="content-grid" id="markets">
          <InputCostSummary
            inputCosts={inputCosts}
            inputCostPerAcre={inputCostPerAcre}
            totalInputCosts={totalInputCosts}
            totalAcres={totalAcres}
            onInputCostChange={updateInputCost}
            onResetInputCosts={resetInputCosts}
          />
          <CommodityPrices
            cropBasis={cropBasis}
            cropTargets={cropTargets}
            commodityApiKey={commodityApiKey}
            commodityPrices={commodityPrices}
            fuelCosts={fuelCosts}
            onApplyCashPrice={applyCashPriceToFields}
            onCropBasisChange={updateCropBasis}
            onCropTargetChange={updateCropTarget}
            onCommodityApiKeyChange={setCommodityApiKey}
          />
        </section>}

        {canViewSection("summary") && <FarmCharts
          fields={fields}
          inputCosts={inputCosts}
          getFieldGross={getFieldGross}
          isCollapsed={isSectionCollapsed("charts")}
          onToggleCollapse={() => toggleSection("charts")}
        />}

        {canViewSection("records") && <FieldActivityLog
          id="records"
          activities={fieldActivities}
          fields={fields}
          isCollapsed={isSectionCollapsed("records")}
          onAddActivity={addFieldActivity}
          onDeleteActivity={deleteFieldActivity}
          onToggleCollapse={() => toggleSection("records")}
        />}

        {canViewSection("tasks") && <FarmTasks
          id="tasks"
          equipment={equipment}
          fields={fields}
          isCollapsed={isSectionCollapsed("tasks")}
          tasks={farmTasks}
          onAddTask={addFarmTask}
          onDeleteTask={deleteFarmTask}
          onTaskChange={updateFarmTask}
          onToggleCollapse={() => toggleSection("tasks")}
        />}

        {canViewSection("equipment") && <EquipmentPanel
          id="equipment"
          equipment={equipment}
          isCollapsed={isSectionCollapsed("equipment")}
          onAddEquipment={addEquipment}
          onDeleteEquipment={deleteEquipment}
          onEquipmentChange={updateEquipment}
          onResetEquipment={resetEquipment}
          onToggleCollapse={() => toggleSection("equipment")}
        />}

        {canViewSection("equipment") && <EquipmentServiceLog
          equipment={equipment}
          isCollapsed={isSectionCollapsed("serviceLogs")}
          logs={equipmentServiceLogs}
          onAddServiceLog={addEquipmentServiceLog}
          onDeleteServiceLog={deleteEquipmentServiceLog}
          onToggleCollapse={() => toggleSection("serviceLogs")}
        />}

        {canViewSection("reports") && <section className="utility-grid" id="reports">
          <DataTransfer
            farmData={{
              fields,
              inputCosts,
              equipment,
              farmLocation,
              farmProfile,
              cropBasis,
              cropTargets,
              farmTasks,
              fieldActivities,
              equipmentServiceLogs,
            }}
            onImportFarmData={importFarmData}
          />

          <ReportsPanel
            equipmentServiceLogs={equipmentServiceLogs}
            farmTasks={farmTasks}
            fieldActivities={fieldActivities}
            fields={fields}
          />
        </section>}

        {canViewSection("reports") && <PlanningReport
          alerts={priorityAlerts}
          averageNetPerAcre={averageNetPerAcre}
          cropBasis={cropBasis}
          cropTargets={cropTargets}
          equipment={equipment}
          farmProfile={farmProfile}
          fields={fields}
          getFieldBreakEvenPrice={getFieldBreakEvenPrice}
          getFieldMarginPerBushel={getFieldMarginPerBushel}
          getFieldNet={getFieldNet}
          inputCostPerAcre={inputCostPerAcre}
          inputCosts={inputCosts}
          projectedNet={projectedNet}
          tasks={farmTasks}
          totalAcres={totalAcres}
          totalGross={totalGross}
          totalInputCosts={totalInputCosts}
        />}
      </div>
    </main>
  );
}

function getEmployeeActivity({
  equipmentServiceLogs,
  farmTasks,
  fieldActivities,
  fields,
  equipment,
}) {
  const taskActivity = farmTasks.map((task) => ({
    id: `task-${task.id}`,
    type: "Task",
    title: task.title,
    detail: `${task.status} - ${task.priority} priority`,
    sortDate: task.dueDate || "",
  }));
  const fieldActivity = fieldActivities.map((activity) => ({
    id: `field-${activity.id}`,
    type: "Field record",
    title: getFieldName(activity.fieldId, fields),
    detail: `${activity.type}: ${activity.note}`,
    sortDate: activity.date || "",
  }));
  const serviceActivity = equipmentServiceLogs.map((log) => ({
    id: `service-${log.id}`,
    type: "Service log",
    title: getEquipmentName(log.equipmentId, equipment),
    detail: `${log.type}: ${log.note}`,
    sortDate: log.date || "",
  }));

  return [...taskActivity, ...fieldActivity, ...serviceActivity]
    .sort((activityA, activityB) =>
      activityB.sortDate.localeCompare(activityA.sortDate)
    )
    .slice(0, 6);
}

function getFieldName(fieldId, fields) {
  return fields.find((field) => field.id === Number(fieldId))?.name || "Field";
}

function getEquipmentName(equipmentId, equipment) {
  return (
    equipment.find((item) => item.id === Number(equipmentId))?.name ||
    "Equipment"
  );
}

function getPriorityAlerts({
  cropBasis,
  cropTargets,
  equipment,
  fields,
  inputCosts,
  commodityPrices,
  tasks,
  weather,
}) {
  const alerts = [];

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High" && task.status !== "Done"
  );

  if (highPriorityTasks.length) {
    alerts.push({
      id: "high-priority-tasks",
      category: "Tasks",
      title: `${highPriorityTasks.length} high-priority task${
        highPriorityTasks.length === 1 ? "" : "s"
      } open`,
      detail: highPriorityTasks[0].title,
      tone: "warning",
    });
  }

  const overdueEquipment = equipment.find(
    (item) => item.nextService - item.hours <= 0
  );
  const serviceSoon = equipment.find(
    (item) => item.nextService - item.hours > 0 && item.nextService - item.hours <= 25
  );

  if (overdueEquipment) {
    alerts.push({
      id: `equipment-overdue-${overdueEquipment.id}`,
      category: "Equipment",
      title: `${overdueEquipment.name} service overdue`,
      detail: `${Math.abs(
        overdueEquipment.nextService - overdueEquipment.hours
      ).toLocaleString()} hours past service target`,
      tone: "danger",
    });
  } else if (serviceSoon) {
    alerts.push({
      id: `equipment-soon-${serviceSoon.id}`,
      category: "Equipment",
      title: `${serviceSoon.name} service soon`,
      detail: `${(serviceSoon.nextService - serviceSoon.hours).toLocaleString()} hours left`,
      tone: "warning",
    });
  }

  const belowBreakEvenField = fields.find(
    (field) => getFieldMarginPerBushel(field, inputCosts) < 0
  );

  if (belowBreakEvenField) {
    alerts.push({
      id: `break-even-${belowBreakEvenField.id}`,
      category: "Profitability",
      title: `${belowBreakEvenField.name} below break-even`,
      detail: `${belowBreakEvenField.crop} margin is ${formatCurrency(
        getFieldMarginPerBushel(belowBreakEvenField, inputCosts),
        { maximumFractionDigits: 2 }
      )}/bu`,
      tone: "danger",
    });
  }

  const targetMetCrop = commodityPrices.find((commodity) => {
    const target = cropTargets[commodity.crop]?.targetPrice || 0;
    const cashPrice = commodity.price + (cropBasis[commodity.crop] || 0);

    return target > 0 && cashPrice >= target;
  });

  if (targetMetCrop) {
    alerts.push({
      id: `target-${targetMetCrop.crop}`,
      category: "Markets",
      title: `${targetMetCrop.crop} target met`,
      detail: "Estimated cash price is at or above the saved target.",
      tone: "positive",
    });
  }

  if (weather.rainChance >= 60) {
    alerts.push({
      id: "rain-risk",
      category: "Weather",
      title: "Rain risk may affect field work",
      detail: `${weather.rainChance}% rain chance in current weather view`,
      tone: "warning",
    });
  }

  if (!alerts.length) {
    alerts.push({
      id: "all-clear",
      category: "Status",
      title: "No urgent alerts",
      detail: "Tasks, equipment, pricing, and field margins look steady.",
      tone: "positive",
    });
  }

  return alerts.slice(0, 4);
}
