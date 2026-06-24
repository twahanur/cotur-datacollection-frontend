import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-x-6 lg:gap-x-56">
      <div className="space-y-8 px-4">
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-[100px] w-[100px] bg-white/5" />
          <Skeleton className="h-8 w-28 bg-white/5" />
        </div>

        {/* Main Heading and Description */}
        <div className="space-y-4">
          {/* Main Heading - matches text-[32px] leading-[42px] */}
          <Skeleton className="h-[84px] w-full bg-white/5" />

          {/* Description - matches text-[16px] leading-6 */}
          <Skeleton className="h-12 w-full bg-white/5" />
        </div>

        {/* Feature List with Check Icons */}
        <div>
          <Skeleton className="h-5 w-full mb-2 bg-white/5" />
          <Skeleton className="h-5 w-full mb-2 bg-white/5" />
          <Skeleton className="h-5 w-full bg-white/5" />
        </div>

        {/* Trusted by Growing Teams Section */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-48 bg-white/5" />
          <Skeleton className="h-[50px] w-[500px] bg-white/5" />
        </div>
      </div>
      <div className="rounded-xl border border-[#221F33] bg-[linear-gradient(331deg,rgba(238,235,255,0.04)_-7.38%,rgba(238,235,255,0.02)_-7.37%,rgba(238,235,255,0.08)_107.38%)] px-8 py-4 lg:w-[25vw] space-y-4">
        <div className="space-y-5">
          {/* Logo Skeleton */}
          <div className="flex items-center justify-start">
            <Skeleton className="h-[100px] w-[100px] bg-white/5" />
          </div>

          {/* Title and Description Skeleton */}
          <div className="space-y-1">
            <Skeleton className="h-8 w-3/4 bg-white/5" />
            <Skeleton className="h-5 w-full bg-white/5" />
            <Skeleton className="h-5 w-4/5 bg-white/5" />
          </div>

          {/* Divider with OR */}
          <div className="flex items-center gap-2 px-6 py-1">
            <div className="border border-[#2C293D] w-full" />
            <span>OR</span>
            <div className="border border-[#2C293D] w-full" />
          </div>
        </div>

        <div className="space-y-6">
          {/* Password Input Skeleton */}
          <div className="relative space-y-1">
            <Skeleton className="h-10 w-full rounded-full bg-white/5" />
          </div>

          {/* Confirm Password Input Skeleton */}
          <div className="relative space-y-1">
            <Skeleton className="h-10 w-full rounded-full bg-white/5" />
          </div>

          {/* Submit Button Skeleton */}
          <Skeleton className="h-10 w-full rounded-xl bg-white/5" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
