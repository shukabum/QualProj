"use client";

import LectureHallGrid from "../../components/LectureHallGrid";
import { mockBuildings } from "../../data/mockData";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-full max-w-5xl mt-8">
        <LectureHallGrid buildings={mockBuildings} />
      </div>
    </div>
  );
}
