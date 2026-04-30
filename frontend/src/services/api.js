import axios from "axios";

// Browser-friendly environment lookup: prefer Vite `import.meta.env`,
// fall back to a safe hardcoded base URL to avoid `process` usage in the bundle.
export const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const STORAGE_KEYS = {
  token: "faithful-rag-token",
  user: "faithful-rag-user",
  history: "faithful-rag-history",
  lastResult: "faithful-rag-last-result",
  docsIndexed: "faithful-rag-docs-indexed",
};

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

function safeJsonParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function getToken() {
  try {
    return localStorage.getItem(STORAGE_KEYS.token) || "";
  } catch {
    return "";
  }
}

// Attach bearer token automatically when available
client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export function normalizePercent(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  if (numeric <= 1) return Math.round(numeric * 100);
  return Math.max(0, Math.min(100, Math.round(numeric)));
}

export function confidenceLevel(score) {
  const value = normalizePercent(score);
  if (value >= 75) return "High";
  if (value >= 45) return "Medium";
  return "Low";
}

export function isUnauthorizedError(error) {
  return error?.response?.status === 401 || error?.response?.status === 403;
}

export function getErrorMessage(error, fallback = "Request failed. Please try again.") {
  const detail = error?.response?.data?.detail;
  if (typeof detail === "string" && detail.trim()) return detail;
  if (typeof error?.response?.data?.message === "string" && error.response.data.message.trim()) return error.response.data.message;
  return error?.message || fallback;
}

export function getStoredUser() {
  return safeJsonParse(localStorage.getItem(STORAGE_KEYS.user), null);
}

export function saveSession({ token, email }) {
  try {
    if (token) localStorage.setItem(STORAGE_KEYS.token, token);
    if (email) localStorage.setItem(STORAGE_KEYS.user, JSON.stringify({ email }));
  } catch {
    // ignore storage errors
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.user);
  } catch {
    // ignore
  }
}

export function getStoredHistory() {
  return safeJsonParse(localStorage.getItem(STORAGE_KEYS.history), []);
}

export function getLastResult() {
  return safeJsonParse(localStorage.getItem(STORAGE_KEYS.lastResult), null);
}

export function getDocsIndexed() {
  try {
    return Number(localStorage.getItem(STORAGE_KEYS.docsIndexed) || "0");
  } catch {
    return 0;
  }
}

export function incrementDocsIndexed(by = 1) {
  try {
    const current = getDocsIndexed();
    localStorage.setItem(STORAGE_KEYS.docsIndexed, String(current + by));
  } catch {
    // ignore
  }
}

export function saveQueryResult(question, response) {
  const snapshot = {
    question,
    answer: response?.answer || "",
    citations: Array.isArray(response?.citations) ? response.citations : [],
    confidence_score: normalizePercent(response?.confidence_score),
    confidence_level: response?.confidence_level || confidenceLevel(response?.confidence_score),
    consistency_score: normalizePercent(response?.consistency_score),
    consistency_level: response?.consistency_level || confidenceLevel(response?.consistency_score),
    contradictions_detected: Boolean(response?.contradictions_detected),
    claim_support: Array.isArray(response?.claim_support) ? response.claim_support : [],
    reason: response?.reason || "",
    timestamp: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEYS.lastResult, JSON.stringify(snapshot));
    const existing = getStoredHistory();
    const history = [snapshot, ...existing].slice(0, 24);
    localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history));
  } catch {
    // ignore
  }

  return snapshot;
}

export async function signup(email, password) {
  const response = await client.post("/auth/signup", { email, password });
  return response.data;
}

export async function login(email, password) {
  // Try form-encoded payload (common for OAuth2 password grant) as backend may expect it
  const body = new URLSearchParams();
  body.set("username", email);
  body.set("password", password);

  const response = await client.post("/auth/login", body.toString(), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return response.data;
}

export async function uploadDocument(file, onUploadProgress) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await client.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });
  return response.data;
}

export async function queryKnowledge(question) {
  const response = await client.post("/query", { question });
  return response.data;
}

export default client;
