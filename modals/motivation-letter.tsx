"use client";

import MotivationLetterSkeleton from "@/components/motivation-letter-skeleton";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Download, LogOut, Pencil, Save } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MotivationLetter({
  response,
  loading,
  editMode,
  setEditMode,
}: {
  response: string;
  loading: boolean;
  editMode: boolean;
  setEditMode: (val: boolean) => void;
}) {
  return (
    <div className="relative z-0 flex flex-col min-h-full">
      {loading ? (
        <MotivationLetterSkeleton />
      ) : (
        <>
          <div
            contentEditable={editMode}
            suppressContentEditableWarning
            className={clsx(
              "flex-1 overflow-auto mb-16 prose prose-neutral dark:prose-invert max-w-none p-6 rounded-xl scroll-smooth transition-all duration-300",
              editMode
                ? "border-2 border-blue-500/40 bg-blue-50/40 dark:bg-blue-900/20 focus:outline-none focus:ring-0"
                : "bg-transparent border-2 border-transparent"
            )}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {response}
            </ReactMarkdown>
          </div>

          <div className="fixed bottom-0 left-0 right-0 flex items-center justify-end gap-2 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
            {editMode && (
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center justify-end gap-2">
                  <Button
                    onClick={() => setEditMode(false)}
                    disabled={loading}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <LogOut size={16} />
                    Quit Edit Mode
                  </Button>
                  <Button
                    disabled={loading}
                    className="flex items-center gap-1"
                  >
                    <Save size={16} />
                    Save
                  </Button>
                </div>
              </div>
            )}
            {!editMode && (
              <>
                <Button
                  onClick={() => setEditMode(true)}
                  disabled={loading}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <Pencil size={16} />
                  Edit
                </Button>
                <Button disabled={loading} className="flex items-center gap-1">
                  <Download size={16} />
                  Download
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
