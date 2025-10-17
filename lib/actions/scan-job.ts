import { CanvasStore } from "@/store/use-canvas-store";
import React from "react";
import { z } from "zod";
import { saveMotivationLetter } from "./save-motivation-letter";
import { CvStore } from "@/store/types/cv-data-types";
import { MLLength, MLTone } from "@/components/ai-motivation-input";

const jobLinkSchema = z
  .string()
  .trim()
  .min(1, "Please insert a link")
  .max(500, "Your link is too long")
  .regex(/^https:\/\/[^\s$.?#].[^\s]*$/, "Please enter a valid https:// URL");

export interface ScanJobProps {
  jobLink: string;
  setJobLink: React.Dispatch<React.SetStateAction<string>>;
  setError: (any: any) => void;
  setLoading: (isLoading: boolean) => void;
  setField: (field: keyof CvStore, value: any) => void;
  resumeId?: string;
  openCanvas: (id: CanvasStore, title?: string) => void;
}

export const scanJob = async ({
  jobLink,
  setJobLink,
  setError,
  setLoading,
  setField,
  resumeId,
  openCanvas,
  tone,
  length
}: ScanJobProps & { tone: MLTone; length: MLLength }) => {
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

    setTimeout(() => {
      openCanvas("motivation-letter");
    }, 1500);

    const res = await fetch(`/api/analyze-job/${resumeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: jobLink, tone, length }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to analyze job");
    }

    const data = await res.json();
    const { analysis } = data;
    await saveMotivationLetter({ resumeId, analysis });
    setField("motivationLetter", {
      letter: analysis,
      date: new Date(),
    });
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
