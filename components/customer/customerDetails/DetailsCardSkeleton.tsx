import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DetailsCardSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5 gap-0">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-4 w-4 rounded-sm" />
        <Skeleton className="h-5 w-28" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-9 w-9 rounded-lg shrink-0" />

            <div className="flex-1 min-w-0">
              <Skeleton className="h-3 w-24 mb-2" />
              <Skeleton className="h-4 w-full max-w-[220px]" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
