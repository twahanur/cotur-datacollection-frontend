"use client";

import { SidebarGroup } from "@/components/ui/sidebar";
import { Skeleton } from "../skeleton";

const SkeletonItem = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 px-1">
        <Skeleton className="h-6 w-4 rounded" />
        <Skeleton className="h-6 w-44" />
      </div>
    </div>
  );
};

const SidebarSkeleton = () => {
  return (
    <SidebarGroup className="space-y-4 w-full py-6">
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </SidebarGroup>
  );
};

export default SidebarSkeleton;
