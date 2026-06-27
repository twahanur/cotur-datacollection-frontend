"use server";

import { Query } from "@/types/shared.types";
import { createData, readData } from "../apiService/crud";
import { TTargetPeriod, TTargetType } from "@/types/target.types";

export type TCreateTargetPayload = {
  type: TTargetType;
  agentId?: string;
  targetCount: number;
  period: TTargetPeriod;
  specificDate?: string;
};

export const createTarget = async (data: TCreateTargetPayload) => {
  const res = await createData<TCreateTargetPayload>(
    "/targets",
    "/agents",
    data,
  );
  return res;
};

export const getAllTargets = async (query?: Query) => {
  const res = await readData(`/targets`, ["target"], query);
  return res;
};
