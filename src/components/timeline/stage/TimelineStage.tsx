import { memo, useCallback, useState } from "react";

import { Occasion, Stage, TimelineMetrics } from "@/types/timeline";
import { clx } from "@/utils";
import { parseDate } from "@/utils/date";
import {
  getOccasionPosition,
  getStagePosition,
} from "@/utils/timeline-calculation";

import { StageDates } from "./StageDates";
import { StageHeader } from "./StageHeader";
import { TimelineOccasion } from "../occasion/TimelineOccasion";
// import { StageProgress } from "./StageProgress";

interface TimelineStageProps {
  stage: Stage;
  metrics: TimelineMetrics;
  isSelected: boolean;
  isExpanded: boolean;
  width: number;
  occasions: Occasion[];
  onClick: () => void;
}

export const TimelineStage = memo(
  ({
    stage,
    metrics,
    isSelected,
    isExpanded,
    onClick,
    width,
    occasions,
  }: TimelineStageProps) => {
    const [selectedOccasion, setSelectedOccasion] = useState<string | null>(
      null
    );
    const startDate = parseDate(stage.date_beginning);
    const endDate = parseDate(stage.date_end);

    const startPosition = getStagePosition(stage, metrics);
    // const startPosition = metrics.getPositionForStage(stage);
    console.log("startPosition: ", startPosition);

    // Calculate final width with expansion factor
    const expansionFactor = isSelected && isExpanded ? 1.2 : 1;
    const finalWidth = `${width * expansionFactor}%`;

    const handleOccasionClick = useCallback(
      (occasionId: string) => {
        setSelectedOccasion(
          occasionId === selectedOccasion ? null : occasionId
        );
      },
      [selectedOccasion]
    );

    return (
      <div
        className={clx(
          "relative transition-all duration-300 h-24 border rounded-lg p-4 cursor-pointer hover:shadow-lg",
          isSelected
            ? "bg-blue-100 border-blue-500 shadow-md"
            : "bg-gray-100 border-gray-300"
        )}
        style={{ width: finalWidth, left: startPosition }}
        role="button"
        aria-pressed={isSelected}
        onClick={onClick}
      >
        <StageHeader title={stage.title} overhead={stage.title_overhead} />

        <StageDates startDate={startDate} endDate={endDate} />

        {occasions.map((occasion) => {
          const position = getOccasionPosition(
            new Date(occasion.date),
            startDate,
            metrics
          );

          return (
            // <div
            //   key={occasion.id}
            //   style={{
            //     left: position,
            //   }}
            //   className="absolute z-10 text-xs flex text-gray-500"
            // >
            //   <OccasionMarker
            //     type={occasion.type}
            //     isPrimary={occasion.is_primary}
            //     isSelected={isSelected}
            //   />
            // </div>
            <TimelineOccasion
              key={occasion.id}
              occasion={occasion}
              position={getOccasionPosition(
                parseDate(occasion.date),
                startDate,
                metrics
              )}
              isSelected={selectedOccasion === occasion.id}
              onClick={() => handleOccasionClick(occasion.id)}
            />
          );
        })}
      </div>
    );
  }
);

TimelineStage.displayName = "TimelineStage";
