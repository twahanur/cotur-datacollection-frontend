import CustomerDetails from "@/components/customer/customerDetails/CustomerDetails";
import { getCustomerById } from "@/service/custoemer";
import { notFound } from "next/navigation";

const CustomerDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const customerDetailsResult = await getCustomerById(id);
  const customerDetails = customerDetailsResult?.data;

  if (!customerDetails) {
    notFound();
  }
  return (
    <section className="min-h-screen ">
      <CustomerDetails customer={customerDetails} />
    </section>
  );
};

export default CustomerDetailsPage;
