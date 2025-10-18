"use client";

import { Label } from "@/components/ui/label";
import { useCvDataStore } from "@/store/use-cv-data-store";
import SectionBoxWrapper from "./section-box-wrapper";
import { RichTextEditor } from "@/components/rich-text-editor";

const Summary = () => {
  const { setField, summary } = useCvDataStore();

  return (
    <SectionBoxWrapper>
      <div className="space-y-6">
        <div>
          <Label className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Professional Summary
          </Label>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Write a short introduction that highlights your experience,
            strengths, and career goals.
          </p>
        </div>

        <RichTextEditor
          value={summary ?? ""}
          onChange={(val) => setField("summary", val)}
        />
      </div>
    </SectionBoxWrapper>
  );
};

export default Summary;
