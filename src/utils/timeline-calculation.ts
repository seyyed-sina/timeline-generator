import {
  GapLayoutType,
  LayoutType,
  Stage,
  TimelineMetrics,
} from "@/types/timeline";

import { parseDate } from "./date";

export const calculateTimelineMetrics = (
  stages: Stage[],
  containerWidth: number
): TimelineMetrics => {
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
};

// export function calculateTimelineMetrics(
//   stages: Stage[],
//   containerWidth: number,
//   layout: LayoutType,
//   gapLayout: GapLayoutType
// ): TimelineMetrics {
//   const allDates = stages.flatMap((stage) => [
//     new Date(stage.date_beginning),
//     new Date(stage.date_end),
//   ]);

//   const startDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
//   const endDate = new Date(Math.max(...allDates.map((d) => d.getTime())));
//   const totalDays =
//     (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

//   let totalWidth = containerWidth;
//   let pixelsPerDay = totalWidth / totalDays;

//   if (layout === "even") {
//     const stageWidth = containerWidth / stages.length;
//     totalWidth = containerWidth;
//     pixelsPerDay = stageWidth;
//   }

//   // Handle gaps based on gapLayout
//   if (gapLayout !== "actual") {
//     const gapSize = gapLayout === "minimum" ? 20 : 0;
//     const gaps = stages.length - 1;
//     totalWidth += gaps * gapSize;
//   }

//   return {
//     totalWidth,
//     pixelsPerDay,
//     // getPositionForDate: (date: Date) => {
//     //   const days =
//     //     (date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
//     //   return `${days * pixelsPerDay}px`;
//     // },
//     // getPositionForGrid: (gridIndex: number) => `${gridIndex * pixelsPerDay}px`,
//     // getPositionForStage: (stage: Stage) => {
//     //   const stageStart = new Date(stage.date_beginning);
//     //   const days =
//     //     (stageStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
//     //   return `${days * pixelsPerDay}px`;
//     // },
//   };
// }

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
