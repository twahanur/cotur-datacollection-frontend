import { TVerificationStatus } from "./customer.types";
import { TAgentStatTarget } from "./target.types";

export type TCollectionByAgent = {
  agentId: string;
  agentName: string;
  count: number;
};

export type TCollectionsByInterrestredProducts = {
  count: number;
  product: string;
};
export type TCollectionByLocation = {
  count: number;
  location: string;
};
export type TDailyCollectionTrend = {
  date: string;
  count: number;
};
export type TMonthlyCollectionTrend = {
  month: string;
  count: number;
};
export type TTopPerformantAgent = {
  agentId: string;
  agentName: string;
  count: number;
};

export type TAnalytics = {
  collectionsByAgent: TCollectionByAgent[];
  collectionsByInterestedProduct: TCollectionsByInterrestredProducts[];
  collectionsByLocation: TCollectionByLocation[];
  dailyCollectionTrend: TDailyCollectionTrend[];
  monthlyCollectionTrend: TMonthlyCollectionTrend[];
  topPerformingAgents: TTopPerformantAgent[];
};

export type TOverview = {
  activeAgents: number;
  monthlyCollection: number;
  todayCollection: number;
  totalAgents: number;
  totalCustomers: number;
  totalVerifiedCustomers: number;
};

export type TDashboardStats = {
  analytics: TAnalytics;
  overview: TOverview;
};

export type TRecentData = {
  id: string;
  name: string;
  phoneNumber: string;
  location: string;
  interestedProduct: string;
  verificationStatus: TVerificationStatus;
  collectionDate: string;
};

export type TAgentDashboard = {
  monthlyCollection: number;
  recentCollections: TRecentData[];
  targets: TAgentStatTarget[];
  todayCollection: number;
};
