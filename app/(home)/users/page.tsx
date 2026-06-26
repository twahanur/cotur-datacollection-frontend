import UserAndRole from "@/components/users/UserAndRole";
import { metaData } from "@/constants/meta.const";
import { getAllUsers } from "@/service/userService";
import { Query, TSearchParams } from "@/types/shared.types";

const UserAndRoleSettings = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const allUserResults = await getAllUsers(query as Query);
  const users = allUserResults?.data || [];
  const meta = allUserResults?.meta || metaData;
  return (
    <section className="min-h-screen">
      <UserAndRole users={users} meta={meta}/>
    </section>
  );
};

export default UserAndRoleSettings;
