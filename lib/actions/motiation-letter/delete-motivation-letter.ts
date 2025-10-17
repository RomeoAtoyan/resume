import { CvStore } from "@/store/types/cv-data-types";
import React, { SetStateAction } from "react";

export const deleteMotivationLetter = async ({
  resumeId,
  close,
  setField,
  setLoading,
}: {
  resumeId: string | undefined;
  close: () => void;
  setField: (field: keyof CvStore, value: any) => void;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
}) => {
  try {
    if (!resumeId) return null;

    setLoading(true);
    await fetch(`/api/resumes/${resumeId}/motivation`, {
      method: "DELETE",
    });
    await setField("motivationLetter", {
      letter: "",
      date: null,
    });
    setLoading(false);
  } catch (error) {
    console.log("error", error);
  } finally {
    close();
  }
};
