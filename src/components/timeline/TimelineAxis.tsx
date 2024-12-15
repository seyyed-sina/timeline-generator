import { Fragment } from "react";
import { Stage } from "@/types/timeline";
import { parseDate, formatDate } from "@/utils/date";
import { TimelineBoundaries } from "@/utils/timeline-utils";

interface TimelineAxisProps {
  stages: Stage[];
  boundaries: TimelineBoundaries;
}

export function TimelineAxis({ stages, boundaries }: TimelineAxisProps) {
  return (
    <div className="absolute top-6 left-0 right-0 h-6">
      {/* Timeline ruler */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300" />

      {/* Stage boundary markers */}
      {stages.map((stage, index) => {
        const startDate = parseDate(stage.date_beginning);
        const endDate = parseDate(stage.date_end);

        const startPosition =
          ((startDate.getTime() - boundaries.start.getTime()) /
            boundaries.totalDuration) *
            100;

        const endPosition =
          ((endDate.getTime() - boundaries.start.getTime()) /
            boundaries.totalDuration) *
          100;

        return (
          <Fragment key={`boundary-${index}`}>
            {/* Start date marker */}
            <div
              className="absolute bottom-0 w-px h-3 bg-gray-400"
              style={{ left: `${startPosition}%` }}
            >
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
                {formatDate(startDate)}
              </div>
            </div>

            {/* End date marker */}
            {index === stages.length - 1 && (
              <div
                className="absolute bottom-0 w-px h-3 bg-gray-400"
                style={{ left: `${endPosition}%` }}
              >
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
                  {formatDate(endDate)}
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
