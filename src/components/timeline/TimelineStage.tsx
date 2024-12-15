import React from "react";
import { Stage } from "@/types/timeline";
import { formatDate, parseDate } from "@/utils/date";

interface TimelineStageProps {
  stage: Stage;
  width: string;
  isSelected: boolean;
  onClick: () => void;
  isExpanded: boolean;
}

export const TimelineStage = ({
  stage,
  width,
  isSelected,
  onClick,
  isExpanded,
}: TimelineStageProps) => {
  const stageWidth = isSelected && isExpanded ? `calc(${width} * 1.5)` : width;

  return (
    <div
      className={`transition-all duration-300 h-24 ${
        isSelected
          ? "bg-blue-100 border-blue-500"
          : "bg-gray-100 border-gray-300"
      } border rounded-lg p-4 cursor-pointer`}
      style={{ width: stageWidth }}
      onClick={onClick}
    >
      {stage.title_overhead && (
        <div className="text-xs text-blue-600 font-semibold mb-1">
          {stage.title_overhead}
        </div>
      )}
      <h3 className="font-medium text-sm">{stage.title}</h3>
      <div className="text-xs text-gray-500">
        {formatDate(parseDate(stage.date_beginning))} -{" "}
        {formatDate(parseDate(stage.date_end))}
      </div>
    </div>
  );
};
