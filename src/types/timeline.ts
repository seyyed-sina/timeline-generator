export const DATE_TYPES = {
  STATUS: "status",
  MILESTONE: "milestone",
  STAGE: "stage",
} as const;

export interface Stage {
  date_beginning: string;
  date_end: string;
  title: string;
  title_overhead?: string;
}

export interface Occasion {
  id: string;
  date: string;
  type: (typeof DATE_TYPES)[keyof typeof DATE_TYPES];
  created_at: string;
  created_by: string;
  description: string;
  is_on_timeline: boolean;
  is_primary: boolean;
  title: string;
}

export type LayoutType = "precise" | "even";
export type GapLayoutType = "actual" | "minimum" | "none";

export interface TimelineProps {
  stages: Stage[];
  occasions: Occasion[];
  layout?: LayoutType;
  gapLayout?: GapLayoutType;
  expandSelected?: boolean;
}
