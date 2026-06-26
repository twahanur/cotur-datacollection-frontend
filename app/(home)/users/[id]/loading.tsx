import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AllCustomerLoadingPage = () => {
  return (
    <div className="min-h-screen space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Skeleton className="h-10 w-32 rounded-xl" />
          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>
      </div>

      {/* Profile Card */}
      <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          {/* Avatar */}
          <Skeleton className="mx-auto sm:mx-0 h-20 w-20 sm:h-24 sm:w-24 rounded-full shrink-0" />

          {/* User Info */}
          <div className="flex-1 space-y-3">
            <Skeleton className="h-7 w-52 max-w-full mx-auto sm:mx-0" />
            <Skeleton className="h-4 w-72 max-w-full mx-auto sm:mx-0" />

            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-full" />
            </div>
          </div>

          {/* User ID */}
          <div className="hidden lg:flex flex-col gap-2 items-end">
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-8 w-44 rounded-lg" />
          </div>
        </div>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            className="bg-[#1A1129] border border-white/10 rounded-2xl p-5"
          >
            {/* Card Header */}
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-5 w-28" />
            </div>

            {/* Rows */}
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, row) => (
                <div key={row} className="flex items-start gap-3">
                  <Skeleton className="h-9 w-9 rounded-lg shrink-0" />

                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-4 w-40 max-w-full" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllCustomerLoadingPage;
