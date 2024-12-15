import { Timeline } from "@/components/timeline/Timeline";
import { occasions, stages } from "@/data/timeline";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Timeline
        stages={stages}
        occasions={occasions}
        layout="precise"
        gapLayout="actual"
        expandSelected
      />
    </div>
  );
}
