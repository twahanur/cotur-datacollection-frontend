export type TTargetType = "GLOBAL" | "INDIVIDUAL";
export type TTargetPeriod = "DAILY" | "WEEKLY" | "MONTHLY" | "SPECIFIC_DATE";

export type TAgentStatTarget = {
  achievedCount: number;
  achievementPercentage: number;
  period: TTargetPeriod;
  remainingCount: number;
  targetCount: number;
};
