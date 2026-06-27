import ActivityLog from "@/components/activity-log/ActivityLog";
import { metaData } from "@/constants/meta.const";
import { getallActivity } from "@/service/activity-log";
import { TSearchParams } from "@/types/shared.types";

const ActivityLogPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const result = await getallActivity(query);
  const activityLog = result?.data || [];
  const meta = result?.meta || metaData;
  return (
    <section className="min-h-screen">
      <ActivityLog activityLogs={activityLog} meta={meta} />
    </section>
  );
};

export default ActivityLogPage;
