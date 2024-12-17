import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  GapLayoutType,
  Occasion,
  Stage,
  TimelineMetrics,
} from "@/types/timeline";
import { parseDate } from "@/utils/date";
import {
  calculateTimelineMetricsFromOccasions,
  getOccasionPosition,
} from "@/utils/timeline-calculation";

import { TimelineOccasion } from "./occasion/TimelineOccasion";
import { TimelineStage } from "./stage/TimelineStage";
import { TimelineAxis } from "./TimelineAxis";

interface TimelineBodyProps {
  stages: Stage[];
  occasions: Occasion[];
  layout: "precise" | "even";
  gapLayout: GapLayoutType;
  isExpanded: boolean;
}

export const TimelineBody = memo(
  ({ stages, occasions, layout, gapLayout, isExpanded }: TimelineBodyProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedStage, setSelectedStage] = useState<string | null>(null);
    const [metrics, setMetrics] = useState<TimelineMetrics | null>(null);
    const [selectedOccasion, setSelectedOccasion] = useState<string | null>(
      null
    );

    const handleOccasionClick = useCallback(
      (occasionId: string) => {
        setSelectedOccasion(
          occasionId === selectedOccasion ? null : occasionId
        );
      },
      [selectedOccasion]
    );

    // const timelineData = useMemo(() => {
    //   try {
    //     // const { start: timelineStart, end: timelineEnd } =
    //     //   calculateTimelineBoundaries(stages);

    //     const getStageWidth = (stage: Stage) => {
    //       if (layout === "even") {
    //         return 100 / stages.length;
    //       }
    //       return calculateStageWidth(stage, metrics.start, timelineEnd);
    //     };

    //     const getGapWidth = () => {
    //       switch (gapLayout) {
    //         case "none":
    //           return 0;
    //         case "minimum":
    //           return 1; // 1% of container width
    //         default:
    //           return 2; // 2% of container width
    //       }
    //     };

    //     // Calculate total gap width
    //     const totalGaps = (stages.length - 1) * getGapWidth();

    //     // Adjust stage widths to account for gaps
    //     const adjustStageWidth = (width: number) => {
    //       const availableWidth = 100 - totalGaps;
    //       return (width / 100) * availableWidth;
    //     };

    //     return {
    //       timelineStart,
    //       timelineEnd,
    //       getStageWidth: (stage: Stage) =>
    //         adjustStageWidth(getStageWidth(stage)),
    //       getGapWidth,
    //       totalGaps,
    //     };
    //   } catch (error) {
    //     console.error("Error calculating timeline data:", error);
    //     return null;
    //   }
    // }, [stages, layout, gapLayout]);

    useEffect(() => {
      const updateMetrics = () => {
        if (containerRef.current) {
          setMetrics(
            calculateTimelineMetricsFromOccasions(
              occasions,
              containerRef.current.offsetWidth
            )
          );
        }
      };

      updateMetrics();
      window.addEventListener("resize", updateMetrics);
      return () => window.removeEventListener("resize", updateMetrics);
    }, [occasions, layout, gapLayout]);

    const handleSelectStage = useCallback(
      (stage: Stage) => {
        setSelectedStage(stage.title === selectedStage ? null : stage.title);
      },
      [selectedStage]
    );

    const stageOccasions = useCallback(
      (stage: Stage) => {
        return occasions.filter(
          (occasion) =>
            parseDate(occasion.date) >= parseDate(stage.date_beginning) &&
            parseDate(occasion.date) <= parseDate(stage.date_end)
        );
      },
      [occasions]
    );

    const timelineOccasions = useMemo(() => {
      return occasions.filter((occasion) => {
        // Check if occasion is outside ALL stages
        return !stages.some(
          (stage) =>
            parseDate(occasion.date) >= parseDate(stage.date_beginning) &&
            parseDate(occasion.date) <= parseDate(stage.date_end)
        );
      });
    }, [occasions, stages]);

    return (
      <div ref={containerRef} className="relative min-h-25 mt-20">
        {metrics &&
          stages.map((stage, index) => (
            <TimelineStage
              key={index}
              layout={layout}
              stage={stage}
              metrics={metrics}
              isSelected={selectedStage === stage.title}
              isExpanded={isExpanded}
              occasions={stageOccasions(stage)}
              onClick={() => handleSelectStage(stage)}
            />
          ))}
        {metrics && (
          <div className="absolute bottom-[38px]">
            {timelineOccasions.map((occasion) => {
              return (
                <TimelineOccasion
                  key={occasion.id}
                  occasion={occasion}
                  position={getOccasionPosition(
                    parseDate(occasion.date),
                    metrics.start,
                    metrics
                  )}
                  isSelected={selectedOccasion === occasion.id}
                  onClick={() => handleOccasionClick(occasion.id)}
                />
              );
            })}
          </div>
        )}
        {metrics && <TimelineAxis {...metrics} />}
      </div>
    );
  }
);

TimelineBody.displayName = "TimelineBody";
