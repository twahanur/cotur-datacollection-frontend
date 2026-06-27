import AllTargetList from "@/components/target/AllTargetList";
import { metaData } from "@/constants/meta.const";
import { getAllAgents } from "@/service/agent";
import { getAllTargets } from "@/service/target";
import { TSearchParams } from "@/types/shared.types";

const AllTargetListPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const [result, agentsResult] = await Promise.all([
    getAllTargets(query),
    getAllAgents({ limit: 1000 }),
  ]);
  const targets = result?.data || [];
  const meta = result?.meta || metaData;
  const agents = agentsResult?.data || [];

  return (
    <section className="min-h-screen">
      <AllTargetList targets={targets} meta={meta} agents={agents} />
    </section>
  );
};

export default AllTargetListPage;
