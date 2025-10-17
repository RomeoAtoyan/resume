"use client";

import { TemplateTypes } from "@/store/types/cv-data-types";
import React, { SetStateAction } from "react";

export const createResume = async ({
  loading,
  setLoading,
  title,
  selectedTemplate,
  close,
  router,
}: {
  loading: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  selectedTemplate: TemplateTypes;
  close: () => void;
  router: ReturnType<typeof import("next/navigation").useRouter>;
}) => {
  if (loading) return;
  setLoading(true);

  try {
    const res = await fetch("/api/resumes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title || "Untitled Resume",
        template: selectedTemplate,
        data: {},
      }),
    });

    const data = await res.json();

    if (res.ok && data.resume?.id) {
      router.push(`/builder/${data.resume.id}`);
    } else {
      console.error("Failed to create resume:", data.error);
    }
  } catch (err) {
    console.error("Error creating resume:", err);
  } finally {
    close();
    setLoading(false);
  }
};
