import { fallbackDashboard } from "./data.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

export async function fetchDashboard() {
  try {
    const response = await fetch(`${API_BASE}/api/dashboard`);
    if (!response.ok) throw new Error("Dashboard request failed");
    return await response.json();
  } catch {
    return fallbackDashboard;
  }
}

export async function scheduleTransfer(payload) {
  const response = await fetch(`${API_BASE}/api/transfers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Transfer failed" }));
    throw new Error(error.message);
  }

  return response.json();
}
