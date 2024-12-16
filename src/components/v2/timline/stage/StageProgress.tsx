import { memo } from "react";

import { clx } from "@/utils";

interface StageProgressProps {
  startDate: Date;
  endDate: Date;
  className?: string;
}

export const StageProgress = memo(
  ({ startDate, endDate, className }: StageProgressProps) => {
    const now = new Date();
    const total = endDate.getTime() - startDate.getTime();
    const current = now.getTime() - startDate.getTime();
    const progress = Math.max(0, Math.min(100, (current / total) * 100));

    // const isActive = now >= startDate && now <= endDate;
    // const isCompleted = now > endDate;

    return (
      <div
        className={clx(
          "absolute inset-0 h-full rounded-full transition-colors duration-300 bg-gray-200",
          className
        )}
        style={{ width: `${progress}%` }}
      />
    );
  }
);

StageProgress.displayName = "StageProgress";
