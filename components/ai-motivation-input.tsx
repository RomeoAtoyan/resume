"use client";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { scanJob, ScanJobProps } from "@/lib/actions/scan-job";
import { CircleCheck, CircleX, Info, Link2, Sparkles } from "lucide-react";
import { useState } from "react";

export type MLTone = "formal" | "friendly" | "enthousiastic" | "neutral";
export type MLLength = "short" | "medium" | "detailed";

const tones = {
  label: "Tone",
  options: [
    { id: "formal", label: "Formal" },
    { id: "friendly", label: "Friendly" },
    { id: "enthousiastic", label: "Enthousiastic" },
    { id: "neutral", label: "Neutral" },
  ],
};

const lengths = {
  label: "Length",
  options: [
    { id: "short", label: "Short" },
    { id: "medium", label: "Medium" },
    { id: "detailed", label: "Detailed" },
  ],
};

const AiMotivationInput = ({
  jobLink,
  setJobLink,
  loading,
  error,
  setError,
  setLoading,
  setField,
  resumeId,
  openCanvas,
}: ScanJobProps & { loading: boolean; error: string }) => {
  const [tone, setTone] = useState<MLTone>("neutral");
  const [length, setLength] = useState<MLLength>("short");

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg font-semibold text-gray-800 flex items-center gap-1">
          <span className="bg-purple-500 text-white px-1.5 py-1 rounded-sm font-mono">
            AI
          </span>{" "}
          Motivation Letter
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
                  Paste a <strong>public job link</strong> below. The AI will
                  scan the page and extract key details automatically.
                </p>
                <Separator className="bg-muted-foreground" />
                <div className="space-y-1 text-xs">
                  <div className="flex items-start gap-1">
                    <CircleCheck className="text-green-500" size={18} />
                    <span>
                      Works with: Indeed, company career pages, public listings.
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
          </InputGroupAddon>
        </InputGroup>
        <span className="block text-xs text-red-400 font-semibold">
          {error}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <Label>{tones.label}</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-gray-500 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="max-w-xs text-sm space-y-2 py-3 bg-white border text-gray-600"
            >
              <p>
                The <strong>tone</strong> sets the voice of your motivation
                letter — how it sounds to the reader.
              </p>
              <ul className="list-disc list-inside text-xs space-y-1">
                <li>
                  <strong>Formal:</strong> Professional and polite.
                </li>
                <li>
                  <strong>Friendly:</strong> Conversational and warm.
                </li>
                <li>
                  <strong>Enthusiastic:</strong> Passionate and energetic.
                </li>
                <li>
                  <strong>Neutral:</strong> Balanced and objective.
                </li>
              </ul>
            </TooltipContent>
          </Tooltip>
        </div>

        <RadioGroup
          onValueChange={(val) => setTone(val as MLTone)}
          defaultValue={tones.options[0].id}
          className="grid grid-cols-3"
        >
          {tones.options.map((t) => (
            <div
              key={t.id}
              className="border rounded-md py-1.5 px-3 flex items-center space-x-2"
            >
              <RadioGroupItem value={t.id} id={t.id} />
              <Label className="cursor-pointer" htmlFor={t.id}>
                {t.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <Label>{lengths.label}</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-gray-500 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="max-w-xs text-sm space-y-2 py-3 bg-white border text-gray-600"
            >
              <p>
                The <strong>length</strong> controls how detailed and
                comprehensive the AI will make your motivation letter.
              </p>
              <ul className="list-disc list-inside text-xs space-y-1">
                <li>
                  <strong>Short:</strong> Around <em>150–200 words</em> (~3
                  paragraphs) — concise but complete.
                </li>
                <li>
                  <strong>Medium:</strong> Around <em>250–350 words</em> (~4
                  paragraphs) — the ideal balance for most applications.
                </li>
                <li>
                  <strong>Detailed:</strong> Around <em>400–550 words</em> (~5+
                  paragraphs) — thorough and persuasive, best for competitive
                  roles.
                </li>
              </ul>
            </TooltipContent>
          </Tooltip>
        </div>

        <RadioGroup
          onValueChange={(val) => setLength(val as MLLength)}
          className="grid grid-cols-3"
          defaultValue={lengths.options[0].id}
        >
          {lengths.options.map((l) => (
            <div
              key={l.id}
              className="border rounded-md py-1.5 px-3 flex items-center space-x-2"
            >
              <RadioGroupItem value={l.id} id={l.id} />
              <Label className="cursor-pointer" htmlFor={l.id}>
                {l.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex items-center justify-end">
        <Button
          onClick={() =>
            scanJob({
              jobLink,
              setJobLink,
              setError,
              setLoading,
              setField,
              resumeId,
              openCanvas,
              tone,
              length,
            })
          }
          disabled={loading}
        >
          {loading ? (
            <>
              Scanning
              <Spinner className="size-4" />
            </>
          ) : (
            <>
              Scan Job
              <Sparkles />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AiMotivationInput;
