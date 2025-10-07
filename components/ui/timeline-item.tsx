"use client";

import { Circle } from "lucide-react";

interface TimelineItemProps {
  university: string;
  years: string;
  title: string;
  description: string;
}

export function TimelineItem({
  university,
  years,
  title,
  description,
}: TimelineItemProps) {
  return (
    <div className="relative pl-6 border-l border-gray-200">
      <div className="absolute left-[-6px] top-2 bg-white">
        <Circle className="w-3 h-3 text-gray-400 fill-white" strokeWidth={2} />
      </div>
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-700">{university}</h4>
        <span className="text-sm text-gray-500">{years}</span>
      </div>
      <h3 className="mt-1 text-[13px] font-semibold uppercase tracking-wide text-gray-800">
        {title}
      </h3>
      <p className="mt-1 text-sm text-gray-500 leading-relaxed pb-8">
        {description}
      </p>
    </div>
  );
}
