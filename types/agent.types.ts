import { TAgentStatTarget } from "./target.types";
import { TStatus } from "./user.types";

export type TAgent = {
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  phoneNumber: string;
  status: TStatus;
};

export type TAgentStat = {
  agentId: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  status: TStatus;
  targets: TAgentStatTarget[];
  totalCollected: number;
  totalPending: number;
  totalVerified: number;
};
