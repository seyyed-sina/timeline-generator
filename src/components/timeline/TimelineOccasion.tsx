import React from "react";
import { Occasion } from "@/types/timeline";
import { Circle, Milestone, Flag } from "lucide-react";
import { formatDate, parseDate } from "@/utils/date";
import { clx } from "@/utils";

interface TimelineOccasionProps {
  occasion: Occasion;
  position: string;
  isSelected: boolean;
  onClick: () => void;
}

export const TimelineOccasion = ({
  occasion,
  position,
  isSelected,
  onClick,
}: TimelineOccasionProps) => {
  const getIcon = () => {
    switch (occasion.type.toLowerCase()) {
      case "milestone":
        return <Milestone className={iconClasses} />;
      case "status":
        return <Circle className={iconClasses} />;
      default:
        return <Flag className={iconClasses} />;
    }
  };

  const iconClasses = clx(
    "size-2",
    isSelected ? "text-blue-500 fill-blue-100" : "text-gray-400",
    occasion.is_primary && "scale-125"
  );

  return (
    <div
      className="absolute -translate-x-1/2 cursor-pointer group"
      style={{ left: position }}
      onClick={onClick}
    >
      {getIcon()}
      {isSelected && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white border rounded-lg p-3 shadow-lg min-w-48 z-10">
          <div className="text-xs font-medium uppercase text-blue-600">
            {occasion.type}
          </div>
          <div className="text-sm font-medium mt-1">{occasion.title}</div>
          <div className="text-xs text-gray-500 mt-1">
            {formatDate(parseDate(occasion.date))}
          </div>
          {occasion.description && (
            <div className="text-xs text-gray-600 mt-2">
              {occasion.description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
