"use server";

import { Query } from "@/types/shared.types";
import { readData } from "../apiService/crud";

export async function getallActivity(query?: Query) {
  const res = await readData("/audit-logs", ["actiity-log"], query);
  return res;
}
