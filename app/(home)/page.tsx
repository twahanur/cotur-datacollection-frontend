import DashboardStats from "@/components/dashboardStats/DashboardStats";
import { getCurrentUser } from "@/service/authService";
import {
  getAdminDashboardStats,
  getAgentDashboardStats,
} from "@/service/dashboard";

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

  console.log(result);
  return (
    <section className="min-h-screen">
      <DashboardStats stats={result}/>
    </section>
  );
};

export default Home;
