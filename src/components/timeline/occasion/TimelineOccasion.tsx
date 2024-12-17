// import { Occasion, Stage } from "@/types/timeline";
// import { parseDate } from "@/utils/date";
// import { isDateOnStageBoundary } from "@/utils/timeline-utils";
// import { OccasionMarker } from "./OccasionMarker";
// import { OccasionPopover } from "./OccasionPopover";

// interface TimelineOccasionProps {
//   occasion: Occasion;
//   position: string;
//   isSelected: boolean;
//   onClick: () => void;
//   stages: Stage[];
// }

// export function TimelineOccasion({
//   occasion,
//   position,
//   isSelected,
//   onClick,
//   stages,
// }: TimelineOccasionProps) {
//   const date = parseDate(occasion.date);
//   const { isBoundary } = isDateOnStageBoundary(date, stages);

//   return (
//     <div
//       className={`
//         absolute -translate-x-1/2
//         cursor-pointer
//         group
//         ${isBoundary ? "z-10" : ""}
//       `}
//       style={{ left: position }}
//       onClick={onClick}
//       role="button"
//       aria-pressed={isSelected}
//     >
//       <OccasionMarker
//         type={occasion.type}
//         isPrimary={occasion.is_primary}
//         isSelected={isSelected}
//         isBoundary={isBoundary}
//       />

//       {isSelected && (
//         <OccasionPopover occasion={occasion} isBoundary={isBoundary} />
//       )}
//     </div>
//   );
// }

import { RefObject, useRef } from "react";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Occasion, TimelineMetrics } from "@/types/timeline";

// import {
//   TimelineMetrics,
//   getExactPosition,
// } from "@/utils/timeline-utils";
import { OccasionMarker } from "./OccasionMarker";
import { OccasionPopover } from "./OccasionPopover";
// import { getExactPosition } from "@/utils/timeline-calculation";

interface TimelineOccasionProps {
  occasion: Occasion;
  isSelected: boolean;
  position: number;
  onClick: () => void;
}

export function TimelineOccasion({
  occasion,
  isSelected,
  onClick,
  position,
}: TimelineOccasionProps) {
  const markerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(markerRef as RefObject<HTMLElement>, () => {
    if (isSelected) onClick();
  });

  return (
    <div
      ref={markerRef}
      className="absolute -translate-x-1/2 cursor-pointer"
      style={{ left: position }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <OccasionMarker
        type={occasion.type}
        isPrimary={occasion.is_primary}
        isSelected={isSelected}
      />
      {isSelected && <OccasionPopover occasion={occasion} isBoundary={false} />}
    </div>
  );
}
