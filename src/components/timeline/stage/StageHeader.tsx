import React from "react";

interface StageHeaderProps {
  title: string;
  overhead?: string;
}

export function StageHeader({ title, overhead }: StageHeaderProps) {
  return (
    <div className="mb-2">
      {overhead && (
        <div className="text-xs text-blue-600 font-semibold mb-1">
          {overhead}
        </div>
      )}
      <h3 className="font-medium text-sm truncate" title={title}>
        {title}
      </h3>
    </div>
  );
}
