import { useMemo } from "react";

import { Circle } from "lucide-react";

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
    "transition-all duration-300 fill-middle stroke-middle rounded-full cursor-pointer",
    isSelected ? "fill-primary scale-125" : "text-gray-400",
    isPrimary && "scale-110"
  );

  const iconProps = useMemo(
    () => ({ className: baseClasses, size: 10 }),
    [baseClasses]
  );

  switch (type.toLowerCase()) {
    case "milestone":
      return (
        <Circle
          {...iconProps}
          className={clx(
            baseClasses,
            "stroke-primary",
            isSelected && "fill-white"
          )}
          strokeWidth={isSelected ? 8 : 4}
          size={isSelected ? 20 : 12}
        />
      );
    case "status":
      return <Circle {...iconProps} />;
    default:
      return <Circle {...iconProps} />;
  }
}
