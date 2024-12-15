import { GapLayoutType, Occasion, Stage } from "@/types/timeline";
import { memo, useMemo, useState } from "react";
// import { TimelineStage } from "./TimelineStage";
import { TimelineOccasion } from "./TimelineOccasion";
import {
  calculatePosition,
  calculateStageWidth,
  getTimelineBoundaries,
} from "@/utils/date";
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
    const [selectedStage, setSelectedStage] = useState<string | null>(null);
    const [selectedOccasion, setSelectedOccasion] = useState<string | null>(
      null
    );

    const timelineData = useMemo(() => {
      try {
        const { start: timelineStart, end: timelineEnd } =
          getTimelineBoundaries(stages);

        const getStageWidth = (stage: (typeof stages)[0]) => {
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

        // Adjust stage widths to account for gaps
        const adjustStageWidth = (width: number) => {
          const availableWidth = 100 - totalGaps;
          return (width / 100) * availableWidth;
        };

        return {
          timelineStart,
          timelineEnd,
          getStageWidth: (stage: (typeof stages)[0]) =>
            adjustStageWidth(getStageWidth(stage)),
          getGapWidth,
          totalGaps,
        };
      } catch (error) {
        console.error("Error calculating timeline data:", error);
        return null;
      }
    }, [stages, layout, gapLayout]);

    if (!timelineData) {
      return <div>Error loading timeline</div>;
    }

    return (
      <div className="relative mt-8">
        <div
          className="flex items-stretch"
          style={{ gap: `${timelineData.getGapWidth()}%` }}
        >
          {stages.map((stage, index) => (
            <TimelineStage
              key={`${stage.title}-${index}`}
              stage={stage}
              width={timelineData.getStageWidth(stage)}
              isSelected={selectedStage === stage.title}
              onClick={() =>
                setSelectedStage(
                  selectedStage === stage.title ? null : stage.title
                )
              }
              isExpanded={isExpanded}
            />
          ))}
        </div>

        {occasions.map((occasion) => (
          <TimelineOccasion
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
        ))}
        <div className="relative">
          <TimelineAxis
            stages={stages}
            boundaries={{
              start: timelineData.timelineStart,
              end: timelineData.timelineEnd,
              totalDuration:
                timelineData.timelineEnd.getTime() -
                timelineData.timelineStart.getTime(),
            }}
          />
        </div>
      </div>
    );
  }
);

TimelineBody.displayName = "TimelineBody";
