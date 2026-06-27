"use server";

import { createData } from "../apiService/crud";
import { TTargetPeriod, TTargetType } from "@/types/target.types";

export type TCreateTargetPayload = {
  type: TTargetType;
  agentId?: string;
  targetCount: number;
  period: TTargetPeriod;
  specificDate?: string;
};

export const createTarget = async (data: TCreateTargetPayload) => {
  const res = await createData<TCreateTargetPayload>("/targets", "/agents", data);
  return res;
};
