import AiMotivationInput from "@/components/ai-motivation-input";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCanvasStore } from "@/store/use-canvas-store";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { Eye, File } from "lucide-react";
import { useState } from "react";
import SectionBoxWrapper from "./section-box-wrapper";

const AiMotivation = () => {
  const [jobLink, setJobLink] = useState<string>("");
  const { openCanvas, setError, error, loading, setLoading } = useCanvasStore();
  const { resumeId, setField, motivationLetter } = useCvDataStore();

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
          <div className="p-4 border rounded-xl flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <File strokeWidth={1} size={48} />
              <div>
                <p className="font-semibold">Motivation Letter Ready!</p>
                <p className="text-sm">
                  You can view or regenerate it anytime.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Button
                variant="outline"
                onClick={() => openCanvas("motivation-letter")}
              >
                <Eye />
                View
              </Button>
            </div>
          </div>
        )}
      </TooltipProvider>
    </SectionBoxWrapper>
  );
};

export default AiMotivation;
