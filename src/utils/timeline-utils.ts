import { Stage } from "../types/timeline";
import { parseDate } from "./date";

export interface TimelineBoundaries {
  start: Date;
  end: Date;
  totalDuration: number;
}

export function calculateTimelineBoundaries(
  stages: Stage[]
): TimelineBoundaries {
  if (!stages.length) {
    throw new Error("No stages provided");
  }

  const timestamps = stages.flatMap((stage) => [
    parseDate(stage.date_beginning).getTime(),
    parseDate(stage.date_end).getTime(),
  ]);

  const minTimestamp = Math.min(...timestamps);
  const maxTimestamp = Math.max(...timestamps);
  const duration = maxTimestamp - minTimestamp;
  const padding = duration * 0.05;

  return {
    start: new Date(minTimestamp - padding),
    end: new Date(maxTimestamp + padding),
    totalDuration: duration + padding * 2,
  };
}

export function isDateOnStageBoundary(
  date: Date,
  stages: Stage[]
): { isBoundary: boolean; stageIndex?: number } {
  for (let i = 0; i < stages.length - 1; i++) {
    const currentStageEnd = parseDate(stages[i].date_end);
    const nextStageStart = parseDate(stages[i + 1].date_beginning);

    if (
      date.getTime() === currentStageEnd.getTime() ||
      date.getTime() === nextStageStart.getTime()
    ) {
      return { isBoundary: true, stageIndex: i };
    }
  }

  return { isBoundary: false };
}

export function getStageForDate(date: Date, stages: Stage[]): number {
  for (let i = 0; i < stages.length; i++) {
    const stageStart = parseDate(stages[i].date_beginning);
    const stageEnd = parseDate(stages[i].date_end);

    if (date >= stageStart && date <= stageEnd) {
      return i;
    }
  }
  return -1;
}

export function calculatePosition(
  date: string,
  startDate: string,
  endDate: string
): string {
  const targetDate = parseDate(date).getTime();
  const start = parseDate(startDate).getTime();
  const end = parseDate(endDate).getTime();
  const position = ((targetDate - start) / (end - start)) * 100;
  return `${Math.max(0, Math.min(100, position))}%`;
}

export function calculateStageWidth(
  stage: Stage,
  timelineStart: Date,
  timelineEnd: Date
): number {
  try {
    const stageStart = parseDate(stage.date_beginning);
    const stageEnd = parseDate(stage.date_end);

    // Validate dates
    if (stageEnd < stageStart) {
      console.error(
        `Invalid stage dates for ${stage.title}: end date before start date`
      );
      return 0;
    }

    // Get timestamps in milliseconds
    const timelineStartTime = timelineStart.getTime();
    const timelineEndTime = timelineEnd.getTime();
    const stageStartTime = stageStart.getTime();
    const stageEndTime = stageEnd.getTime();

    // Calculate total timeline duration
    const timelineDuration = timelineEndTime - timelineStartTime;
    if (timelineDuration <= 0) {
      console.error("Invalid timeline duration");
      return 0;
    }

    const stageDuration = stageEndTime - stageStartTime;
    const widthPercentage = (stageDuration / timelineDuration) * 100;

    // Ensure width is between 0 and 100
    return Math.max(0, Math.min(100, widthPercentage));
  } catch (error) {
    console.error(`Error calculating width for stage ${stage.title}:`, error);
    return 0;
  }
}
