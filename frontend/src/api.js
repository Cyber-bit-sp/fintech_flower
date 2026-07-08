import { fallbackDashboard } from "./data.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";
const SESSION_KEY = "aurora_session";

export function getStoredSession() {
  const rawSession = localStorage.getItem(SESSION_KEY);
  return rawSession ? JSON.parse(rawSession) : null;
}

export function storeSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function authHeaders() {
  const session = getStoredSession();
  return session?.token ? { Authorization: `Bearer ${session.token}` } : {};
}

export async function login(credentials) {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Login failed" }));
    throw new Error(error.message);
  }

  const session = await response.json();
  storeSession(session);
  return session;
}

export async function verifySession() {
  const session = getStoredSession();
  if (!session?.token) return null;

  const response = await fetch(`${API_BASE}/api/auth/me`, {
    headers: authHeaders()
  });

  if (!response.ok) {
    clearSession();
    return null;
  }

  return session;
}

export async function fetchDashboard() {
  try {
    const response = await fetch(`${API_BASE}/api/dashboard`, {
      headers: authHeaders()
    });
    if (!response.ok) throw new Error("Dashboard request failed");
    return await response.json();
  } catch {
    return fallbackDashboard;
  }
}

export async function scheduleTransfer(payload) {
  const response = await fetch(`${API_BASE}/api/transfers`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Transfer failed" }));
    throw new Error(error.message);
  }

  return response.json();
}
