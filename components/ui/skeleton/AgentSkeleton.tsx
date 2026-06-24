import React from "react";
import { Skeleton } from "../skeleton";

const AgentSkeleton = () => {
  return (
    <div className="effect rounded-xl py-2 px-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-4 w-4 rounded-sm" />
      </div>
    </div>
  );
};

export default AgentSkeleton;
