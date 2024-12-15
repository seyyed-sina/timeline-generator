import { Stage, Occasion } from "../types/timeline";
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
