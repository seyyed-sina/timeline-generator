import React from "react";
import { Occasion, Stage } from "@/types/timeline";
import { parseDate } from "@/utils/date";
import { isDateOnStageBoundary } from "@/utils/timeline";
import { OccasionMarker } from "./OccasionMarker";
import { OccasionPopover } from "./OccasionPopover";

interface TimelineOccasionProps {
  occasion: Occasion;
  position: string;
  isSelected: boolean;
  onClick: () => void;
  stages: Stage[];
}

export function TimelineOccasion({
  occasion,
  position,
  isSelected,
  onClick,
  stages,
}: TimelineOccasionProps) {
  const date = parseDate(occasion.date);
  const { isBoundary } = isDateOnStageBoundary(date, stages);

  return (
    <div
      className={`
        absolute -translate-x-1/2 
        cursor-pointer 
        group
        ${isBoundary ? "z-10" : ""}
      `}
      style={{ left: position }}
      onClick={onClick}
      role="button"
      aria-pressed={isSelected}
    >
      <OccasionMarker
        type={occasion.type}
        isPrimary={occasion.is_primary}
        isSelected={isSelected}
        isBoundary={isBoundary}
      />

      {isSelected && (
        <OccasionPopover occasion={occasion} isBoundary={isBoundary} />
      )}
    </div>
  );
}
