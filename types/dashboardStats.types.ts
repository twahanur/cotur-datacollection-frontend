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
