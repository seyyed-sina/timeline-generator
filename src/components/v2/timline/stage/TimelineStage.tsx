"use client";
import { memo, useCallback, useState } from "react";

import { LayoutType, Occasion, Stage, TimelineMetrics } from "@/types/timeline";
import { clx } from "@/utils";
import { convertToLocaleDateString, parseDate } from "@/utils/date";
import {
  getOccasionPosition,
  getStagePosition,
  getStageWidth,
} from "@/utils/timeline-calculation";

import { StageHeader } from "./StageHeader";
import { StageProgress } from "./StageProgress";
import { TimelineOccasion } from "../occasion/TimelineOccasion";

interface TimelineStageProps {
  stage: Stage;
  metrics: TimelineMetrics;
  isSelected: boolean;
  isExpanded: boolean;
  layout: LayoutType
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
    layout,
    occasions,
  }: TimelineStageProps) => {
    const [selectedOccasion, setSelectedOccasion] = useState<string | null>(
      null
    );
    // const getStageWidth = (stage: Stage) => {
    //   if (layout === "even") {
    //     return 100 / stages.length;
    //   }
    //   return calculateStageWidth(stage, metrics.start, timelineEnd);
    // };

    const width = getStageWidth(stage, metrics, layout);
    const position = getStagePosition(stage, metrics);

    const stageStartDate = parseDate(stage.date_beginning);
    const stageEndDate = parseDate(stage.date_end);

    // Calculate final width with expansion factor
    const expansionFactor = isSelected && isExpanded ? 1.2 : 1;
    const finalWidth = `${width * expansionFactor}px`;

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
          "absolute bottom-0 transition-all duration-300",
          isSelected && "z-10"
        )}
        style={{ width: finalWidth, left: position }}
        role="button"
        aria-pressed={isSelected}
        onClick={onClick}
      >
        <StageHeader
          title={stage.title}
          overhead={stage.title_overhead}
          isSelected={isSelected}
        />
        {occasions && (
          <div
            className={clx(
              "relative z-0 rounded-full transition-all duration-300 border-4 border-solid bg-white border-white outline-secondary outline-4 outline h-5",
              isSelected && "outline-primary z-10"
            )}
          >
            <StageProgress
              startDate={stageStartDate}
              endDate={stageEndDate}
              className={clx(isSelected && "bg-primary")}
            />

            {occasions.map((occasion) => {
              return (
                <TimelineOccasion
                  key={occasion.id}
                  occasion={occasion}
                  position={getOccasionPosition(
                    parseDate(occasion.date),
                    stageStartDate,
                    metrics
                  )}
                  isSelected={selectedOccasion === occasion.id}
                  onClick={() => handleOccasionClick(occasion.id)}
                />
              );
            })}
          </div>
        )}
        <div
          className={clx(
            "flex items-center justify-between mt-3 text-xs text-gray-500",
            isSelected && "text-primary"
          )}
        >
          <span>{convertToLocaleDateString(stageStartDate)}</span>
          <span>{convertToLocaleDateString(stageEndDate)}</span>
        </div>
      </div>
    );
  }
);

TimelineStage.displayName = "TimelineStage";
