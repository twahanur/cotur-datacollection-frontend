import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const StatSkeleton = () => (
  <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5 flex items-center gap-3">
    <Skeleton className="h-10 w-10 rounded-2xl shrink-0" />
    <div className="space-y-2 w-full">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-6 w-16" />
    </div>
  </Card>
);

export const ChartSkeleton = () => (
  <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5">
    <Skeleton className="h-4 w-40 mb-4" />
    <Skeleton className="h-56 sm:h-72 w-full rounded-xl" />
  </Card>
);

export const SmallChartSkeleton = () => (
  <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5">
    <Skeleton className="h-4 w-36 mb-4" />
    <Skeleton className="h-56 sm:h-64 w-full rounded-xl" />
  </Card>
);

export const ListSkeleton = () => (
  <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5">
    <Skeleton className="h-4 w-40 mb-4" />
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-10" />
          </div>
          <Skeleton className="h-1.5 w-full rounded-full" />
        </div>
      ))}
    </div>
  </Card>
);
