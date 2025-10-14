"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleCheck, CircleX, Info, Link2, Sparkles } from "lucide-react";
import SectionBoxWrapper from "./section-box-wrapper";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { scanJob } from "@/lib/actions/scan-job";
import { useCanvasStore } from "@/store/use-canvas-store";

const AiMotivation = ({ resumeId }: { resumeId: string }) => {
  const [jobLink, setJobLink] = useState<string>("");
  const {
    openCanvas,
    setError,
    error,
    setMotivationLetterText,
    loading,
    setLoading,
  } = useCanvasStore();

  return (
    <SectionBoxWrapper>
      <TooltipProvider delayDuration={0}>
        <div className="space-y-6">
          <div>
            <Label className="text-lg font-semibold text-gray-800 flex items-center gap-1">
              <div>
                <span className="bg-purple-500 text-white px-1.5 py-1 rounded-sm font-mono">
                  AI
                </span>{" "}
                Motivation Letter
              </div>
            </Label>

            <p className="text-xs text-gray-500 mt-1">
              Paste the job link you want to apply for, and let AI craft a
              personalized motivation letter for you.
            </p>
          </div>

          <div className="space-y-1">
            <Label>Job link</Label>
            <InputGroup className="mb-1">
              <InputGroupInput
                value={jobLink}
                onChange={(e) => setJobLink(String(e.target.value))}
                placeholder="https://careers.microsoft.com/job/12345"
              />
              <InputGroupAddon>
                <Link2 />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                {loading ? (
                  <>
                    <InputGroupText className="text-green-500">
                      Scanning...
                    </InputGroupText>
                    <Spinner className={clsx(loading && "text-green-500")} />
                  </>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InputGroupButton className="rounded-full" size="icon-xs">
                        <Info />
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="max-w-xs text-sm space-y-2 py-3 bg-white border text-gray-600"
                    >
                      <p>
                        Paste a <strong>public job link</strong> below. The AI
                        will scan the page and extract key details
                        automatically.
                      </p>
                      <Separator className="bg-muted-foreground" />
                      <div className="space-y-1 text-xs">
                        <div className="flex items-start gap-1">
                          <CircleCheck className="text-green-500" size={18} />
                          <span>
                            Works with: Indeed, company career pages, public
                            listings.
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CircleX className="text-red-500" size={18} />
                          <span>
                            Won’t work with: LinkedIn, pages requiring login.
                          </span>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )}
              </InputGroupAddon>
            </InputGroup>
            <span className="block text-xs text-red-400 font-semibold">
              {error}
            </span>
          </div>

          <div className="flex items-center justify-end">
            <Button
              onClick={() => {
                scanJob({
                  jobLink,
                  setJobLink,
                  setError,
                  setLoading,
                  setMotivationLetterText,
                  resumeId,
                  openCanvas,
                });
              }}
              disabled={loading}
            >
              Scan Job
              <Sparkles />
            </Button>
          </div>
        </div>
      </TooltipProvider>
    </SectionBoxWrapper>
  );
};

export default AiMotivation;
