import { memo } from "react";

import { Occasion } from "@/types/timeline";

import { OccasionMarker } from "./OccasionMarker";
import { OccasionPopover } from "./OccasionPopover";

interface TimelineOccasionProps {
  occasion: Occasion;
  position: number;
  isSelected: boolean;
  onClick: () => void;
}

export const TimelineOccasion = memo(
  ({ occasion, position, isSelected, onClick }: TimelineOccasionProps) => {
    return (
      <div
        key={occasion.id}
        style={{
          left: `${position}px`,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="absolute z-10 rounded-full"
      >
        <OccasionMarker
          type={occasion.type}
          isPrimary={occasion.is_primary}
          isSelected={isSelected}
        />
        {isSelected && <OccasionPopover occasion={occasion} />}
      </div>
    );
  }
);

TimelineOccasion.displayName = "TimelineOccasion";
