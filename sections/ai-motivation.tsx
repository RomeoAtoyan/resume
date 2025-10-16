"use client";

import AiMotivationInput from "@/components/ai-motivation-input";
import MotivationLetterReady from "@/components/motivation-letter-ready";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCanvasStore } from "@/store/use-canvas-store";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { useState } from "react";
import SectionBoxWrapper from "./section-box-wrapper";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useModalStore } from "@/store/use-modal-store";
import { useDownloadStore } from "@/store/use-download-store";

const AiMotivation = () => {
  const [jobLink, setJobLink] = useState<string>("");
  const { openCanvas, setError, error, loading, setLoading } = useCanvasStore();
  const { resumeId, setField, motivationLetter } = useCvDataStore();
  const { openModal } = useModalStore();
  const { setDownloading, downloading } = useDownloadStore();

  return (
    <SectionBoxWrapper>
      <TooltipProvider delayDuration={0}>
        {!motivationLetter.letter ? (
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
        ) : (
          <div className="space-y-6">
            <MotivationLetterReady
              setDownloading={setDownloading}
              downloading={downloading}
              openModal={openModal}
              openCanvas={openCanvas}
              motivationLetter={motivationLetter}
            />
          </div>
        )}
      </TooltipProvider>
    </SectionBoxWrapper>
  );
};

export default AiMotivation;
