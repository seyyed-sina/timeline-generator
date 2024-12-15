import { Circle, Milestone, Flag } from "lucide-react";

interface OccasionMarkerProps {
  type: "status" | "milestone" | "stage";
  isPrimary: boolean;
  isSelected: boolean;
  isBoundary: boolean;
}

export function OccasionMarker({
  type,
  isPrimary,
  isSelected,
  isBoundary,
}: OccasionMarkerProps) {
  const baseClasses = `
    transition-all
    duration-300
    ${isSelected ? "text-blue-500 scale-125" : "text-gray-400"}
    ${isPrimary ? "scale-110" : ""}
    ${isBoundary ? "stroke-2" : ""}
  `;

  const iconProps = {
    className: baseClasses,
    size: 16,
  };

  switch (type.toLowerCase()) {
    case "milestone":
      return <Milestone {...iconProps} />;
    case "status":
      return <Circle {...iconProps} />;
    default:
      return <Flag {...iconProps} />;
  }
}