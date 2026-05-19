const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const hasApiBaseUrl = Boolean(API_BASE_URL);

async function request(path, options = {}) {
  if (!hasApiBaseUrl) {
    throw new Error("Backend API is not configured.");
  }

  const accessToken = localStorage.getItem("access");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(options.headers || {}),
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    const error = new Error(data?.detail || "Request failed.");
    error.response = { data, status: response.status };
    throw error;
  }

  return data;
}

const api = {
  isConfigured: hasApiBaseUrl,

  post(path, body) {
    return request(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
};

export default api;
