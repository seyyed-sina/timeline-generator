import { Occasion, Stage, TimelineMetrics } from "@/types/timeline";

import { parseDate } from "./date";

export const calculateTimelineMetrics = (
  stages: Stage[],
  containerWidth: number
): TimelineMetrics => {
  const allDates = stages.flatMap((stage) => [
    parseDate(stage.date_beginning),
    parseDate(stage.date_end),
  ]);
  // Find the minimum and maximum dates
  const start = new Date(Math.min(...allDates.map((d) => d.getTime())));
  const end = new Date(Math.max(...allDates.map((d) => d.getTime())));

  // Calculate total duration in milliseconds
  const totalDuration = end.getTime() - start.getTime();

  // Calculate pixels per day
  const totalDays = totalDuration / (1000 * 60 * 60 * 24);
  const pixelsPerDay = containerWidth / totalDays;

  return { start, end, totalDuration, pixelsPerDay, totalDays };
};

export const calculateTimelineMetricsFromOccasions = (
  occasions: Occasion[],
  containerWidth: number
): TimelineMetrics => {
  const allDates = occasions.map((occasion) => parseDate(occasion.date));

  // Find the minimum and maximum dates
  const start = new Date(Math.min(...allDates.map((d) => d.getTime())));
  const end = new Date(Math.max(...allDates.map((d) => d.getTime())));

  // Calculate total duration in milliseconds
  const totalDuration = end.getTime() - start.getTime();

  // Convert duration to total days
  const totalDays = totalDuration / (1000 * 60 * 60 * 24);

  // Calculate pixels per day
  const pixelsPerDay = containerWidth / totalDays;

  return { start, end, totalDuration, pixelsPerDay, totalDays };
};

export function getOccasionPosition(
  date: Date,
  startDate: Date,
  metrics: TimelineMetrics
): number {
  const timeDiff = date.getTime() - startDate.getTime();
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
  return daysDiff * metrics.pixelsPerDay;
}

export const getStageWidth = (
  stage: Stage,
  metrics: TimelineMetrics
): number => {
  const start = parseDate(stage.date_beginning);
  const end = parseDate(stage.date_end);
  const duration = end.getTime() - start.getTime();
  const days = duration / (1000 * 60 * 60 * 24);
  return days * metrics.pixelsPerDay;
};

export const getStagePosition = (stage: Stage, metrics: TimelineMetrics) => {
  const stageStart = new Date(stage.date_beginning);
  const days =
    (stageStart.getTime() - metrics.start.getTime()) / (1000 * 60 * 60 * 24);
  return `${days * metrics.pixelsPerDay}px`;
};
