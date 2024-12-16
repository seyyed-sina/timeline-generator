export enum DATE_TYPES {
  STATUS = "status",
  MILESTONE = "milestone",
  STAGE = "stage",
}

export interface Stage {
  date_beginning: string;
  date_end: string;
  title: string;
  title_overhead?: string;
}

export interface Occasion {
  id: string;
  date: string;
  type: DATE_TYPES;
  created_at: string;
  created_by: string;
  description: string;
  is_on_timeline: boolean;
  is_primary: boolean;
  title: string;
}

export type LayoutType = "precise" | "even";

export type GapLayoutType = "actual" | "minimum" | "none";

export interface TimelineMetrics {
  start: Date;
  end: Date;
  totalDuration: number;
  pixelsPerDay: number;
}

// export interface TimelineMetrics {
//   totalWidth: number;
//   pixelsPerDay: number;
//   getPositionForDate: (date: Date) => string;
//   getPositionForGrid: (gridIndex: number) => string;
//   getPositionForStage: (stage: Stage) => string;
// }
