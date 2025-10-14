"use client";

import { useEffect } from "react";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { usePathname } from "next/navigation";

let timeout: NodeJS.Timeout | null = null;

export const useAutoSaveResume = () => {
  const pathname = usePathname();
  const isInBuilder = pathname?.startsWith("/builder/");

  const { title, template, resumeId, setSaveStatus, setLastSaved, ...data } =
    useCvDataStore();

  useEffect(() => {
    if (!isInBuilder) return;
    if (!resumeId) return;

    if (timeout) clearTimeout(timeout);
    setSaveStatus("saving");

    timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/resumes/${resumeId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title || "Untitled Resume",
            template,
            data,
          }),
        });

        if (!res.ok) throw new Error("Failed to save");

        setSaveStatus("saved");
        setLastSaved(new Date());
      } catch (err) {
        setSaveStatus("error");
      }
    }, 1500);
  }, [
    isInBuilder,
    title,
    template,
    resumeId,
    data.profileImage,
    data.fullName,
    data.jobTitle,
    data.email,
    data.phoneNumber,
    data.address,
    data.summary,
    JSON.stringify(data.workExperience),
    JSON.stringify(data.education),
    JSON.stringify(data.languages),
    JSON.stringify(data.courses),
    JSON.stringify(data.references),
    JSON.stringify(data.moreDetails),
    JSON.stringify(data.skills),
  ]);
};
