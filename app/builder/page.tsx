"use client";
import { SectionBox } from "@/sections/section-box";
import clsx from "clsx";
import {
  Award,
  Briefcase,
  Cpu,
  FileText,
  GraduationCap,
  Languages,
  MoreHorizontal,
  User,
  Users2,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const ResumeCanvas = dynamic(() => import("@/components/resume-canvas"), {
  ssr: false,
});

const Page = () => {
  const [activeSection, setActiveSection] = useState<{
    id: string;
    title: string;
  }>({
    id: "personal-info",
    title: "Personal info",
  });

  const sections = [
    { id: "personal-info", title: "Personal info", icon: User },
    { id: "summary", title: "Summary", icon: FileText },
    { id: "work-experience", title: "Work experience", icon: Briefcase },
    { id: "education", title: "Education", icon: GraduationCap },
    { id: "skills", title: "Skills", icon: Cpu },
    { id: "language", title: "Language", icon: Languages },
    {
      id: "courses-certificates",
      title: "Courses & Certificates",
      icon: Award,
    },
    { id: "references", title: "References", icon: Users2 },
    { id: "more-details", title: "More details", icon: MoreHorizontal },
  ];

  return (
    <div className="w-full flex items-start h-[calc(100vh-65px)]">
      <div className="max-w-xs w-full h-full">
        {sections.map((section) => {
          const isActive = activeSection.id === section.id;
          const Icon = section.icon;
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
              <div className="flex items-center justify-start gap-4">
                <Icon size={18} />
                <span className="font-semibold">{section.title}</span>
              </div>
              {isActive && (
                <div className="size-4 bg-green-400 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>

      <div className="max-w-lg w-full h-full overflow-y-auto border-l border-r border-b border-gray-200">
        <SectionBox activeSection={activeSection} />
      </div>

      <div className="w-full h-full">
        <ResumeCanvas />
      </div>
    </div>
  );
};

export default Page;
