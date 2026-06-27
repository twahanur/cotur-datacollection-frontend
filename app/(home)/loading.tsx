import {
  ChartSkeleton,
  ListSkeleton,
  SmallChartSkeleton,
  StatSkeleton,
} from "@/components/dashboardStats/StatCardSkeleton";

const DashboardStatsLoadingPage = () => {
  return (
    <div className="space-y-4 min-h-screen">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <StatSkeleton key={i} />
        ))}
      </div>
      <ChartSkeleton />
      <ChartSkeleton />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SmallChartSkeleton />
        <SmallChartSkeleton />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SmallChartSkeleton />
        <ListSkeleton />
      </div>
    </div>
  );
};

export default DashboardStatsLoadingPage;
