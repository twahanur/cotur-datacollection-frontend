"use server";

import { Query } from "@/types/shared.types";
import { createData, patchData, readData } from "../apiService/crud";
import { TAgentForm } from "@/components/agents/CreateAgent";

type TUpdateProfileProps = {
  id: string;
  data: Partial<TAgentForm>;
  path?: string;
};

export const getAllAgents = async (query?: Query) => {
  const res = await readData(`/agents`, ["agent"], query);
  return res;
};

export async function getAgentStats(id: string) {
  const res = await readData(`/agents/${id}/stats`, ["agent-stats"]);
  return res;
}

export const createAgent = async (data: TAgentForm) => {
  const res = await createData<TAgentForm>("/agents", "/agents", data);
  return res;
};

export const updateAgent = async ({
  id,
  data,
  path = "/agents",
}: TUpdateProfileProps) => {
  const res = await patchData<Partial<TAgentForm>>(`/users/${id}`, path, data);
  return res;
};
