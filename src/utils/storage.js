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

export function loadSavedFields(defaultFields) {
  try {
    const savedFields = window.localStorage.getItem(FIELD_STORAGE_KEY);
    return savedFields ? JSON.parse(savedFields) : defaultFields;
  } catch {
    return defaultFields;
  }
}

export function saveFields(fields) {
  window.localStorage.setItem(FIELD_STORAGE_KEY, JSON.stringify(fields));
}

export function clearSavedFields() {
  window.localStorage.removeItem(FIELD_STORAGE_KEY);
}

export function loadSavedInputCosts(defaultInputCosts) {
  try {
    const savedInputCosts = window.localStorage.getItem(INPUT_COST_STORAGE_KEY);
    return savedInputCosts ? JSON.parse(savedInputCosts) : defaultInputCosts;
  } catch {
    return defaultInputCosts;
  }
}

export function saveInputCosts(inputCosts) {
  window.localStorage.setItem(INPUT_COST_STORAGE_KEY, JSON.stringify(inputCosts));
}

export function clearSavedInputCosts() {
  window.localStorage.removeItem(INPUT_COST_STORAGE_KEY);
}

export function loadSavedEquipment(defaultEquipment) {
  try {
    const savedEquipment = window.localStorage.getItem(EQUIPMENT_STORAGE_KEY);
    return savedEquipment ? JSON.parse(savedEquipment) : defaultEquipment;
  } catch {
    return defaultEquipment;
  }
}

export function saveEquipment(equipment) {
  window.localStorage.setItem(EQUIPMENT_STORAGE_KEY, JSON.stringify(equipment));
}

export function clearSavedEquipment() {
  window.localStorage.removeItem(EQUIPMENT_STORAGE_KEY);
}

export function loadSavedFarmLocation(defaultLocation) {
  try {
    const savedLocation = window.localStorage.getItem(FARM_LOCATION_STORAGE_KEY);
    return savedLocation ? JSON.parse(savedLocation) : defaultLocation;
  } catch {
    return defaultLocation;
  }
}

export function saveFarmLocation(location) {
  window.localStorage.setItem(
    FARM_LOCATION_STORAGE_KEY,
    JSON.stringify(location)
  );
}

export function loadSavedFarmProfile(defaultProfile) {
  try {
    const savedProfile = window.localStorage.getItem(FARM_PROFILE_STORAGE_KEY);
    return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

export function saveFarmProfile(profile) {
  window.localStorage.setItem(FARM_PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

export function loadSavedCommodityApiKey() {
  try {
    return window.localStorage.getItem(COMMODITY_API_KEY_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

export function saveCommodityApiKey(apiKey) {
  window.localStorage.setItem(COMMODITY_API_KEY_STORAGE_KEY, apiKey);
}

export function loadSavedCropBasis(defaultBasis) {
  try {
    const savedBasis = window.localStorage.getItem(CROP_BASIS_STORAGE_KEY);
    return savedBasis ? JSON.parse(savedBasis) : defaultBasis;
  } catch {
    return defaultBasis;
  }
}

export function saveCropBasis(cropBasis) {
  window.localStorage.setItem(CROP_BASIS_STORAGE_KEY, JSON.stringify(cropBasis));
}

export function loadSavedCropTargets(defaultTargets) {
  try {
    const savedTargets = window.localStorage.getItem(CROP_TARGETS_STORAGE_KEY);
    return savedTargets ? JSON.parse(savedTargets) : defaultTargets;
  } catch {
    return defaultTargets;
  }
}

export function saveCropTargets(cropTargets) {
  window.localStorage.setItem(
    CROP_TARGETS_STORAGE_KEY,
    JSON.stringify(cropTargets)
  );
}

export function loadSavedFarmTasks(defaultTasks) {
  try {
    const savedTasks = window.localStorage.getItem(FARM_TASKS_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  } catch {
    return defaultTasks;
  }
}

export function saveFarmTasks(tasks) {
  window.localStorage.setItem(FARM_TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

export function loadSavedFieldActivities(defaultActivities) {
  try {
    const savedActivities = window.localStorage.getItem(
      FIELD_ACTIVITIES_STORAGE_KEY
    );
    return savedActivities ? JSON.parse(savedActivities) : defaultActivities;
  } catch {
    return defaultActivities;
  }
}

export function saveFieldActivities(activities) {
  window.localStorage.setItem(
    FIELD_ACTIVITIES_STORAGE_KEY,
    JSON.stringify(activities)
  );
}

export function loadSavedEquipmentServiceLogs(defaultLogs) {
  try {
    const savedLogs = window.localStorage.getItem(
      EQUIPMENT_SERVICE_LOGS_STORAGE_KEY
    );
    return savedLogs ? JSON.parse(savedLogs) : defaultLogs;
  } catch {
    return defaultLogs;
  }
}

export function saveEquipmentServiceLogs(logs) {
  window.localStorage.setItem(
    EQUIPMENT_SERVICE_LOGS_STORAGE_KEY,
    JSON.stringify(logs)
  );
}

export function loadSavedCollapsedSections(defaultSections = {}) {
  try {
    const savedSections = window.localStorage.getItem(
      COLLAPSED_SECTIONS_STORAGE_KEY
    );
    return savedSections ? JSON.parse(savedSections) : defaultSections;
  } catch {
    return defaultSections;
  }
}

export function saveCollapsedSections(sections) {
  window.localStorage.setItem(
    COLLAPSED_SECTIONS_STORAGE_KEY,
    JSON.stringify(sections)
  );
}
