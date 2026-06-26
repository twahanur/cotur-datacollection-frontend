import AllCustomer from "@/components/customer/AllCustomer";
import { metaData } from "@/constants/meta.const";
import { getAllCustomer } from "@/service/custoemer";
import { Query, TSearchParams } from "@/types/shared.types";

const CustomersPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const allCustomerResult = await getAllCustomer(query as Query);
  const customers = allCustomerResult?.data || [];
  const meta = allCustomerResult?.meta || metaData;

  return (
    <section className="min-h-screen space-y-4">
      <AllCustomer customers={customers} meta={meta} />
    </section>
  );
};

export default CustomersPage;
