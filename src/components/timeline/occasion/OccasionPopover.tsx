import { Occasion } from "@/types/timeline";
import { formatDate, parseDate } from "@/utils/date";

interface OccasionPopoverProps {
  occasion: Occasion;
  isBoundary: boolean;
}

export function OccasionPopover({
  occasion,
  isBoundary,
}: OccasionPopoverProps) {
  return (
    <div
      className={`
      absolute top-6 
      transform -translate-x-1/2
      bg-white border rounded-lg p-3 shadow-lg 
      min-w-48 z-10
      ${isBoundary ? "border-blue-300" : ""}
    `}
    >
      <div className="text-xs font-medium uppercase text-blue-600">
        {occasion.type}
        {isBoundary && " (Stage Boundary)"}
      </div>
      <div className="text-sm font-medium mt-1">{occasion.title}</div>
      <div className="text-xs text-gray-500 mt-1">
        {formatDate(parseDate(occasion.date))}
      </div>
      {occasion.description && (
        <div className="text-xs text-gray-600 mt-2">{occasion.description}</div>
      )}
    </div>
  );
}
