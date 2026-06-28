import AllCustomer from "@/components/customer/AllCustomer";
import { metaData } from "@/constants/meta.const";
import { getAllAgents } from "@/service/agent";
import { getAllCustomer } from "@/service/custoemer";
import { Query, TSearchParams } from "@/types/shared.types";

const CustomersPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const [allCustomerResult, agentsResult] = await Promise.all([
    getAllCustomer(query as Query),
    getAllAgents({ limit: 1000 }),
  ]);
  const customers = allCustomerResult?.data || [];
  const meta = allCustomerResult?.meta || metaData;
  const agents = agentsResult?.data || [];

  return (
    <section className="min-h-screen space-y-4">
      <AllCustomer customers={customers} meta={meta} agents={agents} />
    </section>
  );
};

export default CustomersPage;
