"use client";

import { Progress } from "@/components/ui/progress";

interface SkillBarProps {
  skill: string;
  level: number; // percentage (0–100)
}

export function SkillBar({ skill, level }: SkillBarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-gray-700 w-32 shrink-0">{skill}</span>
      <Progress
        value={level}
        className="flex-1 h-2 bg-gray-200 [&>div]:bg-gray-800"
      />
    </div>
  );
}
