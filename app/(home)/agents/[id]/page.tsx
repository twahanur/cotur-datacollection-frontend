import AgentStats from "@/components/agents/AgentStats";
import { getAgentStats } from "@/service/agent";

const AgentStatsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const result = await getAgentStats(id);
  const agentStats = result?.data;

  return (
    <section className="min-h-screen">
      <AgentStats agentStats={agentStats} />
    </section>
  );
};

export default AgentStatsPage;
