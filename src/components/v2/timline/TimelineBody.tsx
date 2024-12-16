import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  GapLayoutType,
  Occasion,
  Stage,
  TimelineMetrics,
} from "@/types/timeline";
import { calculateTimelineMetrics } from "@/utils/timeline-calculation";
import { calculateStageWidth } from "@/utils/timeline-utils";

import { TimelineStage } from "./stage/TimelineStage";

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
    // const [selectedOccasion, setSelectedOccasion] = useState<string | null>(
    //   null
    // );

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
            calculateTimelineMetrics(stages, containerRef.current.offsetWidth)
          );
        }
      };

      updateMetrics();
      window.addEventListener("resize", updateMetrics);
      return () => window.removeEventListener("resize", updateMetrics);
    }, [stages, layout, gapLayout]);

    // useEffect(() => {
    //   const element = containerRef.current;
    //   console.log("element.offsetWidth: ", element?.offsetWidth);

    //   if (!element) return;

    //   const resizeObserver = new ResizeObserver(() => {
    //     setMetrics(
    //       calculateTimelineMetrics(
    //         stages,
    //         element.offsetWidth,
    //         layout,
    //         gapLayout
    //       )
    //     );
    //   });

    //   resizeObserver.observe(element);

    //   // Cleanup
    //   return () => {
    //     resizeObserver.disconnect();
    //   };
    // }, [gapLayout, layout, stages]);

    const handleSelectStage = useCallback(
      (stage: Stage) => {
        setSelectedStage(stage.title === selectedStage ? null : stage.title);
      },
      [selectedStage]
    );

    const stageOccasions = useCallback(
      (stage: Stage) => {
        return occasions.filter(
          (o) =>
            new Date(o.date) >= new Date(stage.date_beginning) &&
            new Date(o.date) <= new Date(stage.date_end)
        );
      },
      [occasions]
    );

    return (
      <div ref={containerRef} className="relative min-h-25 mt-8">
        {metrics &&
          stages.map((stage, index) => (
            <TimelineStage
              key={index}
              stage={stage}
              metrics={metrics}
              isSelected={selectedStage === stage.title}
              isExpanded={isExpanded}
              occasions={stageOccasions(stage)}
              onClick={() => handleSelectStage(stage)}
            />
          ))}
      </div>
    );
  }
);

TimelineBody.displayName = "TimelineBody";
