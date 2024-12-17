"use client";
import { useState, useMemo } from "react";

import { occasions, stages } from "@/data/timeline";
import { LayoutType, GapLayoutType } from "@/types/timeline";

import { TimelineBody } from "./TimelineBody";
import { TimelineControls } from "./TimelineControls";

export const Timeline = () => {
  const [currentLayout, setCurrentLayout] = useState<LayoutType>("precise");
  const [currentGapLayout, setCurrentGapLayout] =
    useState<GapLayoutType>("actual");
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredOccasions = useMemo(
    () => occasions.filter((o) => o.is_on_timeline),
    []
  );

  return (
    <div className="sm:px-4">
      <TimelineControls
        layout={currentLayout}
        gapLayout={currentGapLayout}
        expandSelected={isExpanded}
        onLayoutChange={setCurrentLayout}
        onGapLayoutChange={setCurrentGapLayout}
        onExpandChange={setIsExpanded}
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
};

Timeline.displayName = "Timeline";
