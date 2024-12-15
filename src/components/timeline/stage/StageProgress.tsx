import React from "react";

interface StageProgressProps {
  startDate: Date;
  endDate: Date;
}

export function StageProgress({ startDate, endDate }: StageProgressProps) {
  const now = new Date();
  const total = endDate.getTime() - startDate.getTime();
  const current = now.getTime() - startDate.getTime();
  const progress = Math.max(0, Math.min(100, (current / total) * 100));

  const isActive = now >= startDate && now <= endDate;
  const isCompleted = now > endDate;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
      <div
        className={`h-full transition-all duration-300 ${
          isCompleted
            ? "bg-green-500"
            : isActive
            ? "bg-blue-500"
            : "bg-gray-300"
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
