"use client";;
import { useState, useMemo } from "react";
import { TimelineProps, LayoutType, GapLayoutType } from "@/types/timeline";
import { TimelineControls } from "./TimelineControls";
import { TimelineBody } from "./TimelineBody";

export function Timeline({
  stages,
  occasions,
  layout = "precise",
  gapLayout = "actual",
  expandSelected = false,
}: TimelineProps) {
  const [currentLayout, setCurrentLayout] = useState<LayoutType>(layout);
  const [currentGapLayout, setCurrentGapLayout] =
    useState<GapLayoutType>(gapLayout);
  const [isExpanded, setIsExpanded] = useState(expandSelected);

  const filteredOccasions = useMemo(
    () => occasions.filter((o) => o.is_on_timeline),
    [occasions]
  );

  return (
    <div className="p-8">
      <TimelineControls
        layout={currentLayout}
        gapLayout={currentGapLayout}
        expandSelected={isExpanded}
        onLayoutChange={setCurrentLayout}
        onGapLayoutChange={setCurrentGapLayout}
        onExpandSelectedChange={setIsExpanded}
      />

      <TimelineBody
        stages={stages}
        occasions={filteredOccasions}
        layout={currentLayout}
        gapLayout={currentGapLayout}
        isExpanded={isExpanded}
      />
    </div>
  );
}
