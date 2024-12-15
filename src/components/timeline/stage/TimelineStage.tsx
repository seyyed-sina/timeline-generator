import React from "react";
import { Stage } from "@/types/timeline";
import { parseDate } from "@/utils/date";
import { StageHeader } from "./StageHeader";
import { StageDates } from "./StageDates";
import { StageProgress } from "./StageProgress";

interface TimelineStageProps {
  stage: Stage;
  width: number;
  isSelected: boolean;
  onClick: () => void;
  isExpanded: boolean;
}

export function TimelineStage({
  stage,
  width,
  isSelected,
  onClick,
  isExpanded,
}: TimelineStageProps) {
  // Parse dates once
  const startDate = parseDate(stage.date_beginning);
  const endDate = parseDate(stage.date_end);

  // Calculate final width with expansion factor
  const expansionFactor = isSelected && isExpanded ? 1.5 : 1;
  const finalWidth = `${width * expansionFactor}%`;
  console.log('finalWidth: ', finalWidth);

  return (
    <div
      className={`
        relative
        transition-all duration-300 
        h-24 
        ${
          isSelected
            ? "bg-blue-100 border-blue-500 shadow-md"
            : "bg-gray-100 border-gray-300"
        } 
        border rounded-lg 
        p-4 
        cursor-pointer
        hover:shadow-lg
        overflow-hidden
      `}
      style={{ width: finalWidth }}
      onClick={onClick}
      role="button"
      aria-pressed={isSelected}
    >
      <StageHeader title={stage.title} overhead={stage.title_overhead} />

      <StageDates startDate={startDate} endDate={endDate} />

      <StageProgress startDate={startDate} endDate={endDate} />
    </div>
  );
}
