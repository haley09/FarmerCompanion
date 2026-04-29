const FIELD_STORAGE_KEY = "farmcomp.fields";
const INPUT_COST_STORAGE_KEY = "farmcomp.inputCosts";
const EQUIPMENT_STORAGE_KEY = "farmcomp.equipment";

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
