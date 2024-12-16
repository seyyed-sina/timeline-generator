import { memo, useEffect, useMemo, useRef, useState } from "react";

import {
  GapLayoutType,
  Occasion,
  Stage,
  TimelineMetrics,
} from "@/types/timeline";
import { calculateTimelineMetrics } from "@/utils/timeline-calculation";
import { calculateStageWidth, calculateTimelineBoundaries } from "@/utils/timeline-utils";

import { TimelineOccasion } from "./occasion/TimelineOccasion";
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
     const [metrics, setMetrics] = useState(() =>
       containerRef.current
         ? calculateTimelineMetrics(
             stages,
             containerRef.current.offsetWidth,
             layout,
             gapLayout
           )
         : null
     );
    const [selectedOccasion, setSelectedOccasion] = useState<string | null>(
      null
    );

    const timelineData = useMemo(() => {
      try {
        const { start: timelineStart, end: timelineEnd } =
          calculateTimelineBoundaries(stages);

        const getStageWidth = (stage: Stage) => {
          if (layout === "even") {
            return 100 / stages.length;
          }
          const width = calculateStageWidth(stage, timelineStart, timelineEnd);
          console.debug(`Stage ${stage.title} width:`, width);
          return width;
        };

        const getGapWidth = () => {
          switch (gapLayout) {
            case "none":
              return 0;
            case "minimum":
              return 1; // 1% of container width
            default:
              return 2; // 2% of container width
          }
        };

        // Calculate total gap width
        const totalGaps = (stages.length - 1) * getGapWidth();
        console.debug("totalGaps: ", totalGaps);

        // Adjust stage widths to account for gaps
        const adjustStageWidth = (width: number) => {
          const availableWidth = 100 - totalGaps;
          console.log("availableWidth: ", availableWidth);
          return (width / 100) * availableWidth;
        };

        return {
          timelineStart,
          timelineEnd,
          getStageWidth: (stage: Stage) =>
            adjustStageWidth(getStageWidth(stage)),
          getGapWidth,
          totalGaps,
        };
      } catch (error) {
        console.error("Error calculating timeline data:", error);
        return null;
      }
    }, [stages, layout, gapLayout]);

     useEffect(() => {
       const updateMetrics = () => {
         if (containerRef.current) {
           setMetrics(
             calculateTimelineMetrics(
               stages,
               containerRef.current.offsetWidth,
               layout,
               gapLayout
             )
           );
         }
       };

       updateMetrics();
       window.addEventListener("resize", updateMetrics);
       return () => window.removeEventListener("resize", updateMetrics);
     }, [stages, layout, gapLayout]);

    //  if (!metrics) return null;
 const filteredOccasions = occasions.filter((o) => o.is_on_timeline);
    return (
      <div className="relative mt-8">
        <div
          ref={containerRef}
          className="relative mt-8 overflow-x-auto w-full"
          style={{ height: "200px" }}
        >
          {/* {stages.map((stage, index) => (
            <TimelineStage
              key={`${stage.title}-${index}`}
              stage={stage}
              metrics={metrics}
              // width={timelineData.getStageWidth(stage)}
              isSelected={selectedStage === stage.title}
              isExpanded={isExpanded}
              onClick={() =>
                setSelectedStage(
                  selectedStage === stage.title ? null : stage.title
                )
              }
            />
          ))} */}

          {metrics &&
            stages.map((stage, index) => (
              <TimelineStage
                key={index}
                stage={stage}
                metrics={metrics}
                isSelected={selectedStage === stage.title}
                isExpanded={isExpanded}
                onClick={() =>
                  setSelectedStage(
                    selectedStage === stage.title ? null : stage.title
                  )
                }
                occasions={filteredOccasions.filter(
                  (o) =>
                    new Date(o.date) >= new Date(stage.date_beginning) &&
                    new Date(o.date) <= new Date(stage.date_end)
                )}
              />
            ))}

          {/* {occasions.map((occasion) => (
            <TimelineOccasion
              stages={stages}
              key={occasion.id}
              occasion={occasion}
              position={calculatePosition(
                occasion.date,
                stages[0].date_beginning,
                stages[stages.length - 1].date_end
              )}
              isSelected={selectedOccasion === occasion.id}
              onClick={() =>
                setSelectedOccasion(
                  selectedOccasion === occasion.id ? null : occasion.id
                )
              }
            />
          ))} */}
          {/* <div className="relative">
          <TimelineAxis
            stages={stages}
            boundaries={calculateTimelineBoundaries(stages)}
          />
        </div> */}
          {metrics &&
            occasions.map((occasion) => (
              <TimelineOccasion
                key={occasion.id}
                occasion={occasion}
                metrics={metrics}
                isSelected={selectedOccasion === occasion.id}
                onClick={() =>
                  setSelectedOccasion(
                    selectedOccasion === occasion.id ? null : occasion.id
                  )
                }
              />
            ))}
        </div>
      </div>
    );
  }
);

TimelineBody.displayName = "TimelineBody";
