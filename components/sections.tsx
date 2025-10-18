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

export default function Sections() {
  const { activeSection, setActiveSection } = useSectionStore();

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

        if (section.highlight) {
          return (
            <motion.button
              key={section.id}
              id={section.id}
              onClick={() => setActiveSection(section)}
              className="relative w-full flex items-center justify-between p-3 rounded-md text-white font-semibold overflow-hidden border border-purple-400"
            >
              <motion.div
                className="absolute inset-0 bg-[linear-gradient(110deg,#7e22ce,45%,#3b82f6,55%,#7e22ce)] bg-[length:200%_100%]"
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="relative z-10 flex items-center gap-4">
                <Icon size={18} />
                <span>{section.title}</span>
              </div>

              {isActive && (
                <motion.div
                  className="size-4 bg-green-400 border border-green-500 rounded-full z-10"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
            </motion.button>
          );
        }
        return (
          <button
            onClick={() => setActiveSection(section)}
            key={section.id}
            id={section.id}
            className={clsx(
              "w-full flex items-center justify-between p-3 border rounded-md border-gray-200 transition-colors",
              isActive && "bg-gray-100",
              "hover:bg-gray-100"
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
}
