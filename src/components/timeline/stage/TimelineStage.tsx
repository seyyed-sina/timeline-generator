import { memo } from "react";
import { Stage, TimelineMetrics } from "@/types/timeline";
import { parseDate } from "@/utils/date";
import { StageHeader } from "./StageHeader";
import { StageDates } from "./StageDates";
// import { StageProgress } from "./StageProgress";
import { clx } from "@/utils";
import { getExactPosition, getStageWidth } from "@/utils/timeline-calculation";

interface TimelineStageProps {
  stage: Stage;
  metrics: TimelineMetrics;
  isSelected: boolean;
  isExpanded: boolean;
  onClick: () => void;
}

export const TimelineStage = memo(
  ({ stage, metrics, isSelected, isExpanded, onClick }: TimelineStageProps) => {
    const width = getStageWidth(stage, metrics);
    const startDate = parseDate(stage.date_beginning);
    const endDate = parseDate(stage.date_end);

    const startPosition = getExactPosition(startDate, metrics);

    // Calculate final width with expansion factor
    const expansionFactor = isSelected && isExpanded ? 1.2 : 1;
    const finalWidth = `${width * expansionFactor}px`;

    return (
      <div
        className={clx(
          "absolute transition-all duration-300 h-24 border rounded-lg p-4 cursor-pointer hover:shadow-lg overflow-hidden",
          isSelected
            ? "bg-blue-100 border-blue-500 shadow-md"
            : "bg-gray-100 border-gray-300"
        )}
        style={{ width: finalWidth, left: `${startPosition}px` }}
        role="button"
        aria-pressed={isSelected}
        onClick={onClick}
      >
        <StageHeader title={stage.title} overhead={stage.title_overhead} />

        <StageDates startDate={startDate} endDate={endDate} />

        {/* <StageProgress startDate={startDate} endDate={endDate} /> */}
      </div>
    );
  }
);

TimelineStage.displayName = "TimelineStage";
