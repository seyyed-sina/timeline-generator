import { memo } from "react";

import { LayoutType, GapLayoutType } from "@/types/timeline";

interface TimelineControlsProps {
  layout: LayoutType;
  gapLayout: GapLayoutType;
  expandSelected: boolean;
  onLayoutChange: (layout: LayoutType) => void;
  onGapLayoutChange: (gapLayout: GapLayoutType) => void;
  onExpandChange: (expand: boolean) => void;
}

export const TimelineControls = memo(
  ({
    layout,
    gapLayout,
    expandSelected,
    onLayoutChange,
    onGapLayoutChange,
    onExpandChange,
  }: TimelineControlsProps) => {
    return (
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Timeline Layout:</label>
          <select
            value={layout}
            onChange={(e) => onLayoutChange(e.target.value as LayoutType)}
            className="border text-sm focus:outline-0 rounded px-2 py-1"
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
            className="border focus:outline-0 text-sm rounded px-2 py-1"
          >
            <option value="actual">Actual</option>
            <option value="minimum">Minimum</option>
            <option value="none">None</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm flex items-center cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={expandSelected}
              onChange={(e) => onExpandChange(e.target.checked)}
              className="mr-2 size-3 checked:accent-secondary"
            />
            Expand Selected
          </label>
        </div>
      </div>
    );
  }
);

TimelineControls.displayName = "TimelineControls";
