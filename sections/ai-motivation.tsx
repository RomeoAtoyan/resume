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
import { z } from "zod";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const AiMotivation = () => {
  const [jobLink, setJobLink] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState(null);

  const jobLinkSchema = z
    .string()
    .trim()
    .min(1, "Please insert a link")
    .max(500, "Your link is too long")
    .regex(/^https:\/\/[^\s$.?#].[^\s]*$/, "Please enter a valid https:// URL");

  const scanJob = async () => {
    const validation = jobLinkSchema.safeParse(jobLink);

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const res = await fetch("/api/analyze-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: jobLink }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to analyze job");
      }

      const data = await res.json();
      setData(data);
      console.log("Analysis result:", data);
    } catch (err: any) {
      console.error("Error while scanning job:", err);
      setError(err.message || "Something went wrong. Please try again.");
      setTimeout(() => {
        setError("");
      }, 3000);
      setJobLink("");
    } finally {
      setIsLoading(false);
      setJobLink("");
    }
  };

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
                {isLoading ? (
                  <>
                    <InputGroupText className="text-green-500">
                      Scanning...
                    </InputGroupText>
                    <Spinner className={clsx(isLoading && "text-green-500")} />
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
            <Button onClick={scanJob} disabled={isLoading}>
              Scan Job
              <Sparkles />
            </Button>
          </div>
          {data && (
            <div className="mt-4 p-4 rounded-md border bg-gray-50">
              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </TooltipProvider>
    </SectionBoxWrapper>
  );
};

export default AiMotivation;
