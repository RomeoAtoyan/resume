"use client";

import AiMotivationInput from "@/components/ai-motivation-input";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCanvasStore } from "@/store/use-canvas-store";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { useState } from "react";
import SectionBoxWrapper from "./section-box-wrapper";

const AiMotivation = () => {
  const [jobLink, setJobLink] = useState<string>("");
  const { openCanvas, setError, error, loading, setLoading } = useCanvasStore();

  const { setField } = useCvDataStore();

  const { resumeId } = useCvDataStore();

  return (
    <SectionBoxWrapper>
      <TooltipProvider delayDuration={0}>
        <AiMotivationInput
          openCanvas={openCanvas}
          setError={setError}
          error={error}
          setField={setField}
          loading={loading}
          setLoading={setLoading}
          jobLink={jobLink}
          setJobLink={setJobLink}
          resumeId={resumeId}
        />
      </TooltipProvider>
    </SectionBoxWrapper>
  );
};

export default AiMotivation;
