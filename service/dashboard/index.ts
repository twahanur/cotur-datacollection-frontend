"use server";

import { readData } from "../apiService/crud";

export async function getAdminDashboardStats() {
  const res = await readData("/dashboard/admin", ["stats"]);
  return res;
}

export async function getAgentDashboardStats() {
  const res = await readData("/dashboard/agent", ["stats"]);
  return res;
}
