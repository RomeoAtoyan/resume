"use client";

import { CvStore, TemplateTypes } from "@/store/types/cv-data-types";
import React, { SetStateAction } from "react";

export const editResumeGlobalDetails = async ({
  setLoading,
  title,
  selectedTemplate,
  close,
  resumeId,
  setField,
}: {
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  selectedTemplate: TemplateTypes;
  close: () => void;
  router: ReturnType<typeof import("next/navigation").useRouter>;
  resumeId: string;
  setField: (field: keyof CvStore, value: any) => void;
}) => {
  setLoading(true);

  try {
    const res = await fetch(`/api/resumes/${resumeId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title || "Untitled Resume",
        template: selectedTemplate,
      }),
    });

    const data = await res.json();

    if (!res.ok && !data.resume?.id) {
      console.error("Failed to update resume:", data.error);
    }
  } catch (err) {
    console.error("Error updating resume:", err);
  } finally {
    setLoading(false);
    close();
    setField("template", selectedTemplate);
    setField("title", title);
  }
};
