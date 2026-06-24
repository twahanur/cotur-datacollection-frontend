"use client";

import { Skeleton } from "@/components/ui/skeleton";

const OverviewSkeleton = ({ statsCount = 4, filtersCount = 3 }) => {
  return (
    <div className="effect p-10 rounded-4xl space-y-8">
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="h-6 w-32 rounded" />
        <div className="flex items-center gap-2">
          {Array.from({ length: filtersCount }).map((_, idx) => (
            <Skeleton key={idx} className="h-8 w-20 rounded-[21px]" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: statsCount }).map((_, index) => (
          <div key={index} className="flex flex-col gap-6">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-20 rounded" />
              <Skeleton className="h-12 w-28 rounded" />
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="h-6 w-16 rounded-xl" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewSkeleton;
