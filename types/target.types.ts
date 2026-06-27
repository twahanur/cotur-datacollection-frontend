export type TTargetType = "GLOBAL" | "INDIVIDUAL";
export type TTargetPeriod = "DAILY" | "WEEKLY" | "MONTHLY" | "SPECIFIC_DATE";

export type TAgentStatTarget = {
  achievedCount: number;
  achievementPercentage: number;
  period: TTargetPeriod;
  remainingCount: number;
  targetCount: number;
};

export type TTargetOfAAgent = {
  id: string;
  fullName: string;
  email: string;
};

export type TTarget = {
  id: string;
  agent?: TTargetOfAAgent;
  agentId?: string;
  period: TTargetPeriod;
  specificDate?: string;
  targetCount: number;
  type: TTargetType;
  createdAt: string;
  updatedAt: string;
};
