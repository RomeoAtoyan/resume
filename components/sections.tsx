"use client";

import clsx from "clsx";
import { useSectionStore } from "@/store/use-sections-store";
import {
  Award,
  Brain,
  Briefcase,
  Cpu,
  FileText,
  GraduationCap,
  Languages,
  MoreHorizontal,
  User,
  Users2,
} from "lucide-react";
import { motion } from "framer-motion";

const Sections = () => {
  const { activeSection, setActiveSection } = useSectionStore();

  const sections = [
    {
      id: "personal-info",
      title: "Personal info",
      icon: User,
      highlight: false,
    },
    { id: "summary", title: "Summary", icon: FileText, highlight: false },
    {
      id: "work-experience",
      title: "Work experience",
      icon: Briefcase,
      highlight: false,
    },
    {
      id: "education",
      title: "Education",
      icon: GraduationCap,
      highlight: false,
    },
    { id: "skills", title: "Skills", icon: Cpu, highlight: false },
    { id: "language", title: "Language", icon: Languages, highlight: false },
    {
      id: "courses-certificates",
      title: "Courses & Certificates",
      icon: Award,
      highlight: false,
    },
    { id: "references", title: "References", icon: Users2, highlight: false },
    {
      id: "more-details",
      title: "More details",
      icon: MoreHorizontal,
      highlight: false,
    },
    {
      id: "ai-motivation",
      title: "AI Motivation Letter",
      icon: Brain,
      highlight: true,
    },
  ];
  return (
    <>
      {sections.map((section) => {
        const isActive = activeSection.id === section.id;
        const Icon = section.icon;
        return (
          <button
            onClick={() => setActiveSection(section)}
            key={section.id}
            id={section.id}
            className={clsx(
              "w-full flex items-center justify-between p-3 border rounded-md border-gray-200",
              isActive && "bg-gray-100",
              section.highlight && "bg-purple-500 text-white"
            )}
          >
            <div className="flex items-center justify-start gap-4">
              <Icon size={18} />
              <span className="font-semibold">{section.title}</span>
            </div>
            {isActive && (
              <motion.div
                className="size-4 bg-green-400 border border-green-500 rounded-full"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
          </button>
        );
      })}
    </>
  );
};

export default Sections;
