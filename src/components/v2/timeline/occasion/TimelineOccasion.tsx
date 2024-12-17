import { memo, RefObject, useRef } from "react";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { DATE_TYPES, Occasion } from "@/types/timeline";
import { clx } from "@/utils";

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
    const markerRef = useRef<HTMLDivElement>(null);

    useOutsideClick(markerRef as RefObject<HTMLElement>, () => {
      if (isSelected) onClick();
    });

    return (
      <div
        ref={markerRef}
        key={occasion.id}
        style={{
          left: `${position}px`,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={clx(
          "absolute z-10 rounded-full -translate-y-1/2 -translate-x-1/2 top-1/2",
          occasion.type === DATE_TYPES.MILESTONE && "z-20"
        )}
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
