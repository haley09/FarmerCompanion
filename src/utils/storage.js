const FIELD_STORAGE_KEY = "farmcomp.fields";
const INPUT_COST_STORAGE_KEY = "farmcomp.inputCosts";
const EQUIPMENT_STORAGE_KEY = "farmcomp.equipment";
const FARM_LOCATION_STORAGE_KEY = "farmcomp.farmLocation";
const FARM_PROFILE_STORAGE_KEY = "farmcomp.farmProfile";
const COMMODITY_API_KEY_STORAGE_KEY = "farmcomp.commodityApiKey";
const CROP_BASIS_STORAGE_KEY = "farmcomp.cropBasis";
const CROP_TARGETS_STORAGE_KEY = "farmcomp.cropTargets";
const FARM_TASKS_STORAGE_KEY = "farmcomp.tasks";
const FIELD_ACTIVITIES_STORAGE_KEY = "farmcomp.fieldActivities";
const EQUIPMENT_SERVICE_LOGS_STORAGE_KEY = "farmcomp.equipmentServiceLogs";
const COLLAPSED_SECTIONS_STORAGE_KEY = "farmcomp.collapsedSections";
const TEAM_ACCESS_STORAGE_KEY = "farmcomp.teamAccess";

export function loadSavedFields(defaultFields) {
  return loadJson(FIELD_STORAGE_KEY, defaultFields);
}

export function saveFields(fields) {
  saveJson(FIELD_STORAGE_KEY, fields);
}

export function clearSavedFields() {
  removeSavedValue(FIELD_STORAGE_KEY);
}

export function loadSavedInputCosts(defaultInputCosts) {
  return loadJson(INPUT_COST_STORAGE_KEY, defaultInputCosts);
}

export function saveInputCosts(inputCosts) {
  saveJson(INPUT_COST_STORAGE_KEY, inputCosts);
}

export function clearSavedInputCosts() {
  removeSavedValue(INPUT_COST_STORAGE_KEY);
}

export function loadSavedEquipment(defaultEquipment) {
  return loadJson(EQUIPMENT_STORAGE_KEY, defaultEquipment);
}

export function saveEquipment(equipment) {
  saveJson(EQUIPMENT_STORAGE_KEY, equipment);
}

export function clearSavedEquipment() {
  removeSavedValue(EQUIPMENT_STORAGE_KEY);
}

export function loadSavedFarmLocation(defaultLocation) {
  return loadJson(FARM_LOCATION_STORAGE_KEY, defaultLocation);
}

export function saveFarmLocation(location) {
  saveJson(FARM_LOCATION_STORAGE_KEY, location);
}

export function loadSavedFarmProfile(defaultProfile) {
  return loadJson(FARM_PROFILE_STORAGE_KEY, defaultProfile);
}

export function saveFarmProfile(profile) {
  saveJson(FARM_PROFILE_STORAGE_KEY, profile);
}

export function loadSavedCommodityApiKey() {
  try {
    return window.localStorage.getItem(COMMODITY_API_KEY_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

export function saveCommodityApiKey(apiKey) {
  saveText(COMMODITY_API_KEY_STORAGE_KEY, apiKey);
}

export function loadSavedCropBasis(defaultBasis) {
  return loadJson(CROP_BASIS_STORAGE_KEY, defaultBasis);
}

export function saveCropBasis(cropBasis) {
  saveJson(CROP_BASIS_STORAGE_KEY, cropBasis);
}

export function loadSavedCropTargets(defaultTargets) {
  return loadJson(CROP_TARGETS_STORAGE_KEY, defaultTargets);
}

export function saveCropTargets(cropTargets) {
  saveJson(CROP_TARGETS_STORAGE_KEY, cropTargets);
}

export function loadSavedFarmTasks(defaultTasks) {
  return loadJson(FARM_TASKS_STORAGE_KEY, defaultTasks);
}

export function saveFarmTasks(tasks) {
  saveJson(FARM_TASKS_STORAGE_KEY, tasks);
}

export function loadSavedFieldActivities(defaultActivities) {
  return loadJson(FIELD_ACTIVITIES_STORAGE_KEY, defaultActivities);
}

export function saveFieldActivities(activities) {
  saveJson(FIELD_ACTIVITIES_STORAGE_KEY, activities);
}

export function loadSavedEquipmentServiceLogs(defaultLogs) {
  return loadJson(EQUIPMENT_SERVICE_LOGS_STORAGE_KEY, defaultLogs);
}

export function saveEquipmentServiceLogs(logs) {
  saveJson(EQUIPMENT_SERVICE_LOGS_STORAGE_KEY, logs);
}

export function loadSavedCollapsedSections(defaultSections = {}) {
  return loadJson(COLLAPSED_SECTIONS_STORAGE_KEY, defaultSections);
}

export function saveCollapsedSections(sections) {
  saveJson(COLLAPSED_SECTIONS_STORAGE_KEY, sections);
}

export function loadSavedTeamAccess(defaultTeamAccess) {
  return loadJson(TEAM_ACCESS_STORAGE_KEY, defaultTeamAccess);
}

export function saveTeamAccess(teamAccess) {
  saveJson(TEAM_ACCESS_STORAGE_KEY, teamAccess);
}

function loadJson(key, fallbackValue) {
  try {
    const savedValue = window.localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

function saveJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Keep the app usable even when browser storage is unavailable.
  }
}

function saveText(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Keep the app usable even when browser storage is unavailable.
  }
}

function removeSavedValue(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Keep the app usable even when browser storage is unavailable.
  }
}
