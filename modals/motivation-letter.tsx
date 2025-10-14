"use client";

import MotivationLetterSkeleton from "@/components/motivation-letter-skeleton";
import { Button } from "@/components/ui/button";
import { Download, Pencil, Save } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MotivationLetter({
  response,
  loading,
}: {
  response: string;
  loading: boolean;
}) {
  return (
    <div className="relative z-0 flex flex-col min-h-full">
      {loading ? (
        <MotivationLetterSkeleton />
      ) : (
        <>
          <div className="flex-1 overflow-auto pb-16 prose prose-neutral dark:prose-invert max-w-none p-10 scroll-smooth">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {response}
            </ReactMarkdown>
          </div>

          <div className="fixed bottom-0 left-0 right-0 flex items-center justify-end gap-2 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
            <Button
              disabled={loading}
              variant="outline"
              className="flex items-center gap-1"
            >
              <Pencil size={16} />
              Edit
            </Button>
            <Button disabled={loading} className="flex items-center gap-1">
              <Save size={16} />
              Save
            </Button>
            <Button disabled={loading} className="flex items-center gap-1">
              <Download size={16} />
              Download
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
