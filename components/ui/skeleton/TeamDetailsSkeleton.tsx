import { Card } from "../card";
import { Skeleton } from "../skeleton";

const TeamDetailsSkeleton = () => {
  return (
    <div className="flex flex-row items-start gap-4">
      {/* left side */}
      <Card className="px-6 py-6 rounded-4xl w-[350px] space-y-6 effect">
        <div className="flex items-start justify-between">
          <Skeleton className="h-6 w-20 rounded-xl" />
          <Skeleton className="h-28 w-28 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-xl" />
        </div>

        <div className="text-center space-y-2">
          <Skeleton className="h-8 w-40 mx-auto" />
          <Skeleton className="h-4 w-32 mx-auto" />
          <Skeleton className="h-3 w-24 mx-auto" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[70%]" />
        </div>

        {/* leader info */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>

        {/* quick stats */}
        <div className="space-y-4 p-4 rounded-2xl">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-[3fr_1fr] gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="contents">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-10 ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* right side */}
      <div className="w-2/3 space-y-4">
        {/* tab skeleton */}
        <Card className="px-3 py-2 flex flex-row gap-4 rounded-2xl effect">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full rounded-xl" />
          ))}
        </Card>

        {/* overview cards */}
        <div className="flex gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="px-4 py-6 w-full rounded-3xl effect">
              <div className="space-y-3">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-20" />
              </div>
            </Card>
          ))}
        </div>

        {/* chart skeleton */}
        <Card className="p-4 rounded-3xl space-y-4 effect">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-8 w-20 rounded-xl" />
          </div>

          <div className="flex gap-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="h-[280px] w-full rounded-xl" />
        </Card>
      </div>
    </div>
  );
};

export default TeamDetailsSkeleton;
