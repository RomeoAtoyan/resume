import { CanvasStore } from "@/store/use-canvas-store";
import React from "react";
import { z } from "zod";
import { saveMotivationLetter } from "./save-motivation-letter";

const jobLinkSchema = z
  .string()
  .trim()
  .min(1, "Please insert a link")
  .max(500, "Your link is too long")
  .regex(/^https:\/\/[^\s$.?#].[^\s]*$/, "Please enter a valid https:// URL");

interface ScanJobProps {
  jobLink: string;
  setJobLink: React.Dispatch<React.SetStateAction<string>>;
  setError: (any: any) => void;
  setLoading: (isLoading: boolean) => void;
  setMotivationLetterText: (any: any) => void;
  resumeId?: string;
  openCanvas: (id: CanvasStore, title?: string) => void;
}

export const scanJob = async ({
  jobLink,
  setJobLink,
  setError,
  setLoading,
  setMotivationLetterText,
  resumeId,
  openCanvas,
}: ScanJobProps) => {
  if (!resumeId) {
    return null;
  }

  const validation = jobLinkSchema.safeParse(jobLink);

  if (!validation.success) {
    setError(validation.error.issues[0].message);
    setTimeout(() => {
      setError("");
    }, 3000);
    return;
  }

  try {
    setLoading(true);
    setError("");
    openCanvas("motivation-letter");

    const res = await fetch(`/api/analyze-job/${resumeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: jobLink }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to analyze job");
    }

    const data = await res.json();
    const { analysis } = data;
    await saveMotivationLetter({ resumeId, analysis });
    setMotivationLetterText(analysis);
  } catch (err: any) {
    console.error("Error while scanning job:", err);
    setError(err.message || "Something went wrong. Please try again.");
    setTimeout(() => {
      setError("");
    }, 3000);
    setJobLink("");
  } finally {
    setLoading(false);
    setJobLink("");
  }
};
