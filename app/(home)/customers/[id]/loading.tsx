import { DetailsCardSkeleton } from "@/components/customer/customerDetails/DetailsCardSkeleton";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AllCustomerLoadingPage = () => {
  return (
    <div className="min-h-screen space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Skeleton className="h-8 w-52 mb-2" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Skeleton className="h-10 w-28 rounded-2xl" />
          <Skeleton className="h-10 w-32 rounded-2xl" />
        </div>
      </div>

      {/* Profile Card */}
      <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5 sm:p-6 gap-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          {/* Avatar */}
          <div className="relative mx-auto sm:mx-0 shrink-0">
            <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-full" />
            <Skeleton className="absolute bottom-1 right-1 w-4 h-4 rounded-full" />
          </div>

          {/* Name + phone + badges */}
          <div className="text-center sm:text-left flex-1 min-w-0">
            <Skeleton className="h-8 w-56 mx-auto sm:mx-0 mb-3" />

            <Skeleton className="h-4 w-40 mx-auto sm:mx-0 mb-4" />

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-7 w-36 rounded-full" />
            </div>
          </div>

          {/* Customer ID */}
          <div className="hidden lg:flex flex-col items-end gap-2 shrink-0">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-8 w-44 rounded-lg" />
          </div>
        </div>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Contact Info */}
        <DetailsCardSkeleton rows={3} />

        {/* Record Info */}
        <DetailsCardSkeleton rows={3} />

        {/* Collected By */}
        <DetailsCardSkeleton rows={3} />

        {/* Collection Date */}
        <DetailsCardSkeleton rows={2} />

        {/* Created */}
        <DetailsCardSkeleton rows={2} />

        {/* Updated */}
        <DetailsCardSkeleton rows={2} />
      </div>
    </div>
  );
};

export default AllCustomerLoadingPage;
