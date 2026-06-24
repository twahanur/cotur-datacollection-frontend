import { Card, CardContent, CardFooter, CardHeader } from "../card";
import { Skeleton } from "../skeleton";

const TeamCardSkeleton = () => {
  return (
    <Card className="effect rounded-3xl gap-4 py-4 px-3 relative w-full">
      <CardHeader>
        <div className="space-y-3 px-3">
          <Skeleton className="h-5 w-40 rounded-md" />
          <Skeleton className="h-4 w-32 rounded-md" />

          <div className="space-y-2 h-20">
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3 w-11/12 rounded-md" />
            <Skeleton className="h-3 w-9/12 rounded-md" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-3">
        <div className="space-y-4">
          {/* top stats */}
          <div className="grid grid-cols-2 border-t pt-4 gap-4">
            <div className="p-4 rounded-2xl">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-10" />
            </div>

            <div className="p-4 rounded-2xl">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-10" />
            </div>
          </div>

          {/* groups + conversion */}
          <div className="flex items-center justify-between gap-4">
            <div className="p-4 rounded-2xl w-full space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-10" />
            </div>

            <div className="rounded-2xl py-4 px-2 w-full space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-6 w-10" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          </div>

          {/* footer stats */}
          <div className="border-t pt-3 flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-3">
        <div className="border-t pt-4 w-full">
          <Skeleton className="h-10 w-full rounded-4xl" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default TeamCardSkeleton;
