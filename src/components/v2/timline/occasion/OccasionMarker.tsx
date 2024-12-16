import { useMemo } from "react";

import { Circle, Milestone } from "lucide-react";

import { DATE_TYPES } from "@/types/timeline";
import { clx } from "@/utils";

interface OccasionMarkerProps {
  type: DATE_TYPES;
  isPrimary: boolean;
  isSelected: boolean;
}

export function OccasionMarker({
  type,
  isPrimary,
  isSelected,
}: OccasionMarkerProps) {
  
  const baseClasses = clx(
    "transition-all duration-300 fill-middle stroke-middle rounded-full",
    isSelected ? "fill-primary scale-125" : "text-gray-400",
    isPrimary && "scale-110"
  );

  const iconProps = useMemo(
    () => ({ className: baseClasses, size: 12 }),
    [baseClasses]
  );

  switch (type.toLowerCase()) {
    case "milestone":
      return <Milestone {...iconProps} />;
    case "status":
      return <Circle {...iconProps} />;
    default:
      return <Circle {...iconProps} />;
  }
}
