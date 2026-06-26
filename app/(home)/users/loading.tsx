import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PageHeaderSkeleton from "@/components/ui/skeleton/PageHeaderSkeleton";
import TableSkeleton from "@/components/ui/TableSkeleton";

const AllUserLoadingPage = () => {
  return (
    <div className="min-h-screen space-y-6">
      <PageHeaderSkeleton>
        <div className="flex  items-center gap-2">
          <Skeleton className="h-10 w-40" />
        </div>
      </PageHeaderSkeleton>

      <Card className="gap-4 w-full effect">
        <CardHeader>
          <CardTitle className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-44" />
              <Skeleton className="h-8 w-44" />
              <Skeleton className="h-8 w-44" />
              <Skeleton className="h-8 w-12" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <TableSkeleton columns={6} rows={10} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AllUserLoadingPage;
