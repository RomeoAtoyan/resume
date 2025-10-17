import { ROUTES } from "@/constants/routes";
import React, { SetStateAction } from "react";

export const removeResume = async ({
  resumeId,
  close,
  router,
  setLoading,
}: {
  resumeId: string;
  close: () => void;
  router: ReturnType<typeof import("next/navigation").useRouter>;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
}) => {
  if (!resumeId) {
    console.warn("No resume ID provided — skipping removal.");
    return;
  }

  try {
    setLoading(true);
    await fetch(`/api/resumes/${resumeId}`, {
      method: "DELETE",
    });
    router.push(ROUTES.DASHBOARD);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
    close();
  }
};
