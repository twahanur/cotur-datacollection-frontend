import AllAgentList from "@/components/agents/AllAgentList";
import { metaData } from "@/constants/meta.const";
import { getAllAgents } from "@/service/agent";
import { Query, TSearchParams } from "@/types/shared.types";

const AgentsPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const allAgentResults = await getAllAgents(query as Query);
  const agents = allAgentResults?.data || [];
  const meta = allAgentResults?.meta || metaData;

  return (
    <section className="min-h-screen">
      <AllAgentList agents={agents} meta={meta} />
    </section>
  );
};

export default AgentsPage;
