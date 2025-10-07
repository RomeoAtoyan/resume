"use client";
import { useCvDataStore } from "@/store/use-cv-data-store";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import { Separator } from "./ui/separator";
import { TimelineItem } from "@/components/ui/timeline-item";
import { SkillBar } from "./ui/skill-bar";

const ResumeCanvas = () => {
  const [downloading, setDownloading] = useState(false);
  const { fullName, jobTitle, email, phoneNumber, address, summary } = useCvDataStore();

  return (
    <div className="relative h-[calc(100vh-65px)] w-full overflow-y-auto bg-[radial-gradient(circle_at_center,_#e5e7eb_1px,_transparent_1px)] [background-size:20px_20px] flex justify-start pl-10 py-10">
      <div
        className="bg-white shadow-lg border border-gray-300 rounded-md overflow-hidden"
        style={{
          width: "210mm",
          height: "297mm",
        }}
      >
        <div className="p-6">
          <h1>{fullName}</h1>
          <h1>{jobTitle}</h1>
          <h1>{email}</h1>
          <h1>{phoneNumber}</h1>
          <h1>{address}</h1>

          <p>{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeCanvas;
