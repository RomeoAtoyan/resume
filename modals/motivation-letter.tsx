"use client";

import { useTextStream } from "@/components/response-stream";
import { Button } from "@/components/ui/button";
import { Download, Pencil } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MotivationLetter({
  response,
}: {
  response: { analysis: string };
}) {
  const { analysis } = response;

  const { displayedText } = useTextStream({
    textStream: analysis,
    mode: "typewriter",
    speed: 25,
  });

  return (
    <div className="relative z-0 flex flex-col min-h-full">
      <div className="flex-1 overflow-auto pb-32 prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {displayedText}
        </ReactMarkdown>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-end gap-2 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
        <Button variant="outline" className="flex items-center gap-1">
          <Pencil size={16} />
          Edit
        </Button>
        <Button className="flex items-center gap-1">
          <Download size={16} />
          Download
        </Button>
      </div>
    </div>
  );
}
