"use client"
import dynamic from "next/dynamic";

export const ResumeCanvas = dynamic(() => import("@/components/resume-canvas"), {
  ssr: false,
});