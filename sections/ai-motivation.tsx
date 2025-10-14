"use client";

import AiMotivationInput from "@/components/ai-motivation-input";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCanvasStore } from "@/store/use-canvas-store";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { Eye, File, Clock } from "lucide-react";
import { useState } from "react";
import SectionBoxWrapper from "./section-box-wrapper";
import { Badge } from "@/components/ui/badge";
import moment from "moment";

const AiMotivation = () => {
  const [jobLink, setJobLink] = useState<string>("");

  const { openCanvas, setError, error, loading, setLoading } = useCanvasStore();
  const { resumeId, setField, motivationLetter } = useCvDataStore();
  const formattedDate = (() => {
    if (!motivationLetter?.date) return null;

    const date = moment(motivationLetter.date);
    const now = moment();

    if (date.isSame(now, "day")) {
      return `Generated today at ${date.format("HH:mm")}`;
    } else if (date.isSame(moment().subtract(1, "day"), "day")) {
      return `Generated yesterday at ${date.format("HH:mm")}`;
    } else {
      return `Generated on ${date.format("MMM D, YYYY [at] HH:mm")}`;
    }
  })();

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
          <div className="relative z-0 px-4 py-8 border rounded-xl flex items-center justify-between w-full">
            {formattedDate && (
              <Badge className="absolute -top-3 right-3 px-2 py-1 text-xs bg-purple-500/90 text-white flex items-center gap-1 shadow-sm pointer-events-none">
                <Clock size={12} className="opacity-90" />
                {formattedDate}
              </Badge>
            )}

            <div className="flex items-center gap-3">
              <File strokeWidth={1} size={48} className="text-gray-700" />
              <div>
                <p className="font-semibold text-gray-900">
                  Motivation Letter Ready!
                </p>
                <p className="text-sm text-gray-600">
                  You can view or regenerate it anytime.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <Button
                variant="outline"
                onClick={() => openCanvas("motivation-letter")}
                className="flex items-center gap-1"
              >
                <Eye size={16} />
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
