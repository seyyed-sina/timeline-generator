import { memo } from "react";
import { LayoutType, GapLayoutType } from "@/types/timeline";

interface TimelineControlsProps {
  layout: LayoutType;
  gapLayout: GapLayoutType;
  expandSelected: boolean;
  onLayoutChange: (layout: LayoutType) => void;
  onGapLayoutChange: (gapLayout: GapLayoutType) => void;
  onExpandSelectedChange: (expand: boolean) => void;
}

export const TimelineControls = memo(
  ({
    layout,
    gapLayout,
    expandSelected,
    onLayoutChange,
    onGapLayoutChange,
    onExpandSelectedChange,
  }: TimelineControlsProps) => {
    return (
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Timeline Layout:</label>
          <select
            value={layout}
            onChange={(e) => onLayoutChange(e.target.value as LayoutType)}
            className="border rounded px-2 py-1"
          >
            <option value="precise">Precise</option>
            <option value="even">Even</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Gaps Layout:</label>
          <select
            value={gapLayout}
            onChange={(e) => onGapLayoutChange(e.target.value as GapLayoutType)}
            className="border rounded px-2 py-1"
          >
            <option value="actual">Actual</option>
            <option value="minimum">Minimum</option>
            <option value="none">None</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">
            <input
              type="checkbox"
              checked={expandSelected}
              onChange={(e) => onExpandSelectedChange(e.target.checked)}
              className="mr-2"
            />
            Expand Selected
          </label>
        </div>
      </div>
    );
  }
);

TimelineControls.displayName = "TimelineControls";
