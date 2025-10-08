"use client";
import ResumeCanvas from "@/components/resume-canvas";
import { SectionBox } from "@/sections/section-box";
import clsx from "clsx";
import { useState } from "react";

const Page = () => {
  const [activeSection, setActiveSection] = useState<{
    id: string;
    title: string;
  }>({
    id: "personal-info",
    title: "Personal info",
  });

  const sections = [
    { id: "personal-info", title: "Personal info" },
    { id: "summary", title: "Summary" },
    { id: "work-experience", title: "Work experience" },
    { id: "education", title: "Education" },
    { id: "language", title: "Language" },
    { id: "courses-certificates", title: "Courses & Certificates" },
    { id: "references", title: "References" },
    { id: "more-details", title: "More details" },
  ];

  return (
    <div className="w-full flex items-start h-[calc(100vh-65px)]">
      <div className="max-w-xs w-full h-full">
        {sections.map((section) => {
          const isActive = activeSection.id === section.id;
          return (
            <button
              onClick={() => setActiveSection(section)}
              key={section.id}
              id={section.id}
              className={clsx(
                "w-full flex items-center justify-between p-6 border-b border-gray-200",
                isActive && "bg-gray-100"
              )}
            >
              <span className="font-semibold">{section.title}</span>
              {isActive && (
                <div className="size-4 bg-green-400 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>

      <div className="max-w-lg w-full h-full border-l border-r border-b border-gray-200">
        <SectionBox activeSection={activeSection} />
      </div>

      <div className="w-full h-full">
        <ResumeCanvas />
      </div>
    </div>
  );
};

export default Page;
