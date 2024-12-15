import { Stage, TimelineMetrics } from "@/types/timeline";


export function calculateTimelineMetrics(
  stages: Stage[],
  containerWidth: number
): TimelineMetrics {
  const allDates = stages.flatMap((stage) => [
    new Date(stage.date_beginning),
    new Date(stage.date_end),
  ]);

  const start = new Date(Math.min(...allDates.map((d) => d.getTime())));
  const end = new Date(Math.max(...allDates.map((d) => d.getTime())));
  const totalDuration = end.getTime() - start.getTime();
  const totalDays = totalDuration / (1000 * 60 * 60 * 24); // in days
  const pixelsPerDay = containerWidth / totalDays;

  return { start, end, totalDuration, pixelsPerDay };
}

export function getExactPosition(date: Date, metrics: TimelineMetrics): number {
  const timeDiff = date.getTime() - metrics.start.getTime();
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
  return daysDiff * metrics.pixelsPerDay;
}

export function getStageWidth(stage: Stage, metrics: TimelineMetrics): number {
  const start = new Date(stage.date_beginning);
  const end = new Date(stage.date_end);
  const duration = end.getTime() - start.getTime();
  const days = duration / (1000 * 60 * 60 * 24);
  return days * metrics.pixelsPerDay;
}
