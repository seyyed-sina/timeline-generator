import { memo } from "react";

import { clx } from "@/utils";

interface StageHeaderProps {
  title: string;
  isSelected: boolean;
  overhead?: string;
  className?: string;
}

export const StageHeader = memo(
  ({ title, overhead, className, isSelected }: StageHeaderProps) => {
    return (
      <div className={clx("flex flex-col gap-1 mb-6", className)}>
        {overhead && (
          <div className="text-sm text-gray-400 font-normal">
            {overhead}
          </div>
        )}
        <h3
          className={clx(
            "font-bold text-xl text-gray-500",
            isSelected && "text-gray-800"
          )}
          title={title}
        >
          {title.toUpperCase()}
        </h3>
      </div>
    );
  }
);

StageHeader.displayName = "StageHeader";
