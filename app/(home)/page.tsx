import AgentDashboardStats from "@/components/dashboardStats/AgentDashboardStats";
import DashboardStats from "@/components/dashboardStats/DashboardStats";
import { getCurrentUser } from "@/service/authService";
import {
  getAdminDashboardStats,
  getAgentDashboardStats,
} from "@/service/dashboard";
import { notFound } from "next/navigation";

const Home = async () => {
  const currentUser = await getCurrentUser();
  let result;
  if (currentUser?.role === "SUPER_ADMIN" || currentUser?.role === "ADMIN") {
    const adminStatsResult = await getAdminDashboardStats();
    result = adminStatsResult?.data;
  } else {
    const agentStatsResult = await getAgentDashboardStats();
    result = agentStatsResult?.data;
  }
  if (!result) {
    return notFound();
  }
  return (
    <section className="min-h-screen">
      {currentUser?.role === "SUPER_ADMIN" || currentUser?.role === "ADMIN" ? (
        <DashboardStats stats={result} />
      ) : (
        <AgentDashboardStats dashboardStat={result} />
      )}
    </section>
  );
};

export default Home;
