import { Stage } from "../types/timeline";

export function parseDate(dateString: string): Date {
  const trimmedDate = dateString.trim();
  const parsedDate = new Date(trimmedDate);

  if (isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid date: ${dateString}`);
  }

  return parsedDate;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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

    // Calculate stage duration and position
    const stageDuration = stageEndTime - stageStartTime;

    // Calculate width as a percentage of total timeline
    const widthPercentage = (stageDuration / timelineDuration) * 100;

    // Log calculations for debugging
    console.debug("Stage width calculation:", {
      title: stage.title,
      date_beginning: stage.date_beginning,
      stage: stage.title,
      timelineStart: timelineStart.toISOString(),
      timelineEnd: timelineEnd.toISOString(),
      stageStart: stageStart.toISOString(),
      stageEnd: stageEnd.toISOString(),
      timelineDuration,
      stageDuration,
      widthPercentage,
    });

    // Ensure width is between 0 and 100
    return Math.max(0, Math.min(100, widthPercentage));
  } catch (error) {
    console.error(`Error calculating width for stage ${stage.title}:`, error);
    return 0;
  }
}

export function getTimelineBoundaries(stages: Stage[]): {
  start: Date;
  end: Date;
} {
  if (!stages.length) {
    throw new Error("No stages provided");
  }

  try {
    // Get all dates as timestamps
    const timestamps = stages.flatMap((stage) => [
      parseDate(stage.date_beginning).getTime(),
      parseDate(stage.date_end).getTime(),
    ]);

    // Find min and max timestamps
    const minTimestamp = Math.min(...timestamps);
    const maxTimestamp = Math.max(...timestamps);

    // Add padding to the timeline (5% on each side)
    const timelineDuration = maxTimestamp - minTimestamp;
    const padding = timelineDuration * 0.05;

    return {
      start: new Date(minTimestamp - padding),
      end: new Date(maxTimestamp + padding),
    };
  } catch (error) {
    console.error("Error calculating timeline boundaries:", error);
    throw error;
  }
}
