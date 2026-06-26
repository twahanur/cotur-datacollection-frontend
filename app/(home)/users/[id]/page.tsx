import UserDetails from "@/components/users/userDetails/UserDetails";
import { getUserById } from "@/service/userService";
import { notFound } from "next/navigation";

const UserDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const userDetailsResult = await getUserById(id);
  const userDetails = userDetailsResult?.data;
  if (!userDetails) {
    notFound();
  }
  return (
    <section className="min-h-screen">
      <UserDetails user={userDetails} />
    </section>
  );
};

export default UserDetailsPage;
