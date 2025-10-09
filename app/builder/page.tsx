"use client";
import Sections from "@/components/sections";
import { SectionBox } from "@/sections/section-box";
import dynamic from "next/dynamic";

const ResumeCanvas = dynamic(() => import("@/components/resume-canvas"), {
  ssr: false,
});

const Page = () => {
  return (
    <div className="w-full flex items-start h-[calc(100vh-65px)]">
      <div className="max-w-xs w-full h-full">
        <Sections />
      </div>

      <div className="max-w-lg w-full h-full overflow-y-auto border-l border-r border-b border-gray-200">
        <SectionBox />
      </div>

      <div className="w-full h-full">
        <ResumeCanvas />
      </div>
    </div>
  );
};

export default Page;
