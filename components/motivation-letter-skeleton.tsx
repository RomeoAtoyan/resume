import React from "react";
import { Skeleton } from "./ui/skeleton";

const MotivationLetterSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-10 animate-pulse">
      <Skeleton className="h-6 w-1/3 rounded-md" />
      <div className="space-y-3 mt-4">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-[90%] rounded-md" />
        <Skeleton className="h-4 w-[95%] rounded-md" />
        <Skeleton className="h-4 w-[80%] rounded-md" />
      </div>
      <div className="space-y-3 mt-6">
        <Skeleton className="h-4 w-[85%] rounded-md" />
        <Skeleton className="h-4 w-[92%] rounded-md" />
        <Skeleton className="h-4 w-[78%] rounded-md" />
      </div>
      <div className="space-y-3 mt-6">
        <Skeleton className="h-4 w-[95%] rounded-md" />
        <Skeleton className="h-4 w-[88%] rounded-md" />
        <Skeleton className="h-4 w-[90%] rounded-md" />
        <Skeleton className="h-4 w-[70%] rounded-md" />
      </div>
      <div className="space-y-3 mt-6">
        <Skeleton className="h-4 w-[95%] rounded-md" />
        <Skeleton className="h-4 w-[88%] rounded-md" />
        <Skeleton className="h-4 w-[90%] rounded-md" />
        <Skeleton className="h-4 w-[70%] rounded-md" />
      </div>
      <div className="space-y-3 mt-6">
        <Skeleton className="h-4 w-[95%] rounded-md" />
        <Skeleton className="h-4 w-[88%] rounded-md" />
        <Skeleton className="h-4 w-[90%] rounded-md" />
        <Skeleton className="h-4 w-[70%] rounded-md" />
      </div>
    </div>
  );
};

export default MotivationLetterSkeleton;
