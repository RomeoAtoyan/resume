"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { marked } from "marked";
import MotivationLetterSkeleton from "@/components/motivation-letter-skeleton";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Download, LogOut, Pencil, Save } from "lucide-react";
import { saveMotivationLetter } from "@/lib/actions/save-motivation-letter";
import { CvStore } from "@/store/types/cv-data-types";

const CKEditor = dynamic(
  async () => {
    const { CKEditor } = await import("@ckeditor/ckeditor5-react");
    const ClassicEditor = (await import("@ckeditor/ckeditor5-build-classic"))
      .default;

    return function WrappedEditor({
      value,
      onChange,
    }: {
      value: string;
      onChange: (val: string) => void;
    }) {
      return (
        <CKEditor
          editor={ClassicEditor as any}
          data={value}
          onChange={(_, editor) => onChange(editor.getData())}
          config={{
            toolbar: [
              "bold",
              "italic",
              "underline",
              "|",
              "bulletedList",
              "numberedList",
              "|",
              "link",
              "undo",
              "redo",
            ],
          }}
        />
      );
    };
  },
  { ssr: false }
);

export default function MotivationLetter({
  response,
  loading,
  editMode,
  setEditMode,
  resumeId,
  setField,
}: {
  response: string;
  loading: boolean;
  editMode: boolean;
  setEditMode: (val: boolean) => void;
  resumeId: string;
  setField: (field: keyof CvStore, value: any) => void;
}) {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (!response) return;

    const convertMarkdown = async () => {
      const html = await marked.parse(response);
      setValue(html);
    };

    convertMarkdown();
  }, [response]);

  return (
    <div className="relative z-0 flex flex-col min-h-full">
      {loading ? (
        <MotivationLetterSkeleton />
      ) : (
        <>
          <div
            className={clsx(
              "flex-1 overflow-auto mb-16 max-w-none rounded-xl scroll-smooth transition-all duration-300",
              editMode
                ? "border-0 border-blue-500/40 bg-blue-50/40 dark:bg-blue-900/20"
                : "bg-transparent border-2 border-transparent"
            )}
          >
            {editMode ? (
              <div className="bg-white dark:bg-zinc-900 w-full max-w-full p-4 h-full">
                <div className="prose dark:prose-invert h-full">
                  <CKEditor value={value} onChange={setValue} />
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 h-full">
                <article
                  className={clsx(
                    "prose prose-neutral dark:prose-invert max-w-none",
                    "prose-h1:text-2xl prose-h1:font-bold prose-h2:text-xl",
                    "prose-p:leading-relaxed prose-strong:text-gray-900 dark:prose-strong:text-gray-50",
                    "prose-ul:list-disc prose-ul:ml-5 prose-li:my-1"
                  )}
                  dangerouslySetInnerHTML={{ __html: value }}
                />
              </div>
            )}
          </div>

          <div className="fixed bottom-0 left-0 right-0 flex items-center justify-end gap-2 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
            {editMode ? (
              <div className="flex items-center justify-end gap-2 w-full">
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
                  onClick={async () => {
                    await saveMotivationLetter({
                      resumeId,
                      analysis: value,
                    });
                    setField("motivationLetter", {
                      letter: value,
                      date: new Date(),
                    });
                    setEditMode(false);
                  }}
                  disabled={loading}
                  className="flex items-center gap-1"
                >
                  <Save size={16} />
                  Save
                </Button>
              </div>
            ) : (
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
