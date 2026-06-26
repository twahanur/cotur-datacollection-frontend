import CustomerHistory from "@/components/customer/customerHistory/CustomerHistory";
import { getCustomerHistory } from "@/service/custoemer";

const CustomerHistoryPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const customerHistoryResult = await getCustomerHistory(id);
  const customerHistory = customerHistoryResult?.data || [];
  return (
    <div className="min-h-screen ">
      <CustomerHistory history={customerHistory} />
    </div>
  );
};

export default CustomerHistoryPage;
