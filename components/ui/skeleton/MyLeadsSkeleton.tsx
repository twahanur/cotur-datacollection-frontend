import { Skeleton } from "../skeleton";
import TableSkeleton from "../TableSkeleton";
import PageHeaderSkeleton from "./PageHeaderSkeleton";

const MyLeadsSkeleton = ({ isAction = true }: { isAction?: boolean }) => {
  return (
    <div className="space-y-4 min-h-screen">
      {/* Page Header */}
      <PageHeaderSkeleton />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="effect rounded-2xl p-4 space-y-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-36" />
          </div>
        ))}
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-2 effect py-1 px-2 rounded-xl">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full rounded-xl" />
        ))}
      </div>

      {/* Action Buttons Row */}
      {isAction && (
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <Skeleton className="h-9 w-36 rounded-xl" />
            <Skeleton className="h-9 w-36 rounded-xl" />
            <Skeleton className="h-9 w-36 rounded-xl" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-9 w-36 rounded-xl" />
            <Skeleton className="h-9 w-14 rounded-xl" />
          </div>
        </div>
      )}

      {/* Filters Row */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex gap-3 items-center">
          <Skeleton className="h-9 w-64 rounded-xl" />
          <Skeleton className="h-9 w-9 rounded-xl" />
        </div>
        <div className="flex gap-3 items-center">
          <Skeleton className="h-9 w-36 rounded-xl" />
          <Skeleton className="h-9 w-20 rounded-xl" />
        </div>
      </div>

      {/* Table */}
      <TableSkeleton columns={10} rows={10} />

      {/* Pagination */}
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-8 w-24 rounded-xl" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-8 w-24 rounded-xl" />
      </div>
    </div>
  );
};

export default MyLeadsSkeleton;
