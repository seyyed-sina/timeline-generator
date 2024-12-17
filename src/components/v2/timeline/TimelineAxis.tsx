// import { memo, useMemo } from "react";

// import { TimelineMetrics } from "@/types/timeline";

// export const TimelineAxis = memo(({ totalDays }: TimelineMetrics) => {
//   const dayTicks = useMemo(
//     () => Array.from({ length: totalDays / 3 + 1 }, (_, i) => i),
//     [totalDays]
//   );
//   // const finalTicksAmount = dayTicks
//   console.log('dayTicks: ', dayTicks);

//   return (
//     <div>
//       {dayTicks.map((day) => {
//         const leftPercentage = (day / (totalDays / 3)) * 100;

//         return (
//           <div
//             key={day}
//             className="absolute top-1/2 -translate-y-1/2"
//             style={{ left: `${leftPercentage}%` }}
//           >
//             {/* Tick */}
//             <div className="w-px h-3 bg-gray-500" />
//             {/* Day Label */}
//             {/* {day % 5 === 0 && ( // Render labels for every 5th day for readability
//               <div className="mt-1 text-xs text-gray-700 -translate-x-1/2">
//                 {new Date(start.getTime() + day * 86400000).toLocaleDateString(
//                   "en-US",
//                   {
//                     day: "2-digit",
//                     month: "short",
//                   }
//                 )}
//               </div>
//             )} */}
//           </div>
//         );
//       })}
//     </div>
//   );
// });

// TimelineAxis.displayName = "TimelineAxis";

import { memo, useMemo } from "react";

import { TimelineMetrics } from "@/types/timeline";
import { clx } from "@/utils";

export const TimelineAxis = memo(({ totalDays }: TimelineMetrics) => {
  const dayTicks = useMemo(
    () => Array.from({ length: totalDays / 3 + 1 }, (_, i) => i),
    [totalDays]
  );

  return (
    <div className="flex justify-between items-center absolute inset-x-0 bottom-[30px] z-0">
      {dayTicks.map((day) => {
        return (
          <div
            key={day}
            className={clx(
              "w-px h-2 bg-gray-400",
              (day === 0 || day === dayTicks.length - 1) && "w-0.5 h-4 text-primary"
            )}
          />
        );
      })}
    </div>
  );
});

TimelineAxis.displayName = "TimelineAxis";
