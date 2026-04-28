const FIELD_STORAGE_KEY = "farmcomp.fields";

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
