import React from "react";

interface TimelineCardProps {
  title: string;
  content: string;
  position: string;
  type: "date" | "grid" | "stage";
}

export const TimelineCard = ({
  title,
  content,
  position,
  type,
}: TimelineCardProps) => {
  return (
    <div
      className="absolute -translate-x-1/2 top-24 bg-white border rounded-lg p-4 shadow-lg max-w-xs"
      style={{ left: position }}
    >
      <div className="text-xs text-gray-500 mb-1">{type}</div>
      <h4 className="font-medium mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{content}</p>
    </div>
  );
};
