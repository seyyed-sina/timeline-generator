import { formatDate } from "@/utils/date";

interface StageDatesProps {
  startDate: Date;
  endDate: Date;
}

export function StageDates({ startDate, endDate }: StageDatesProps) {
  return (
    <div className="text-xs text-gray-500">
      <span title={startDate.toISOString()}>{formatDate(startDate)}</span>
      {" - "}
      <span title={endDate.toISOString()}>{formatDate(endDate)}</span>
    </div>
  );
}
