"use client";

import { DownloadButton } from "@/components/download-button";
import MotivationLetterSkeleton from "@/components/motivation-letter-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMarkdownToHtml } from "@/hooks/use-markdown-to-html";
import { handleDownloadPDF } from "@/lib/actions/motiation-letter/download-motivation-letter";
import { saveMotivationLetter } from "@/lib/actions/motiation-letter/save-motivation-letter";
import { CvStore } from "@/store/types/cv-data-types";
import { LoadingState } from "@/store/use-download-store";
import clsx from "clsx";
import { LogOut, Pencil, Save } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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
  downloading,
  setDownloading,
}: {
  response: string;
  loading: boolean;
  editMode: boolean;
  setEditMode: (val: boolean) => void;
  resumeId: string;
  setField: (field: keyof CvStore, value: any) => void;
  downloading: { [key in LoadingState]?: boolean };
  setDownloading: (id: LoadingState, val: boolean) => void;
}) {
  const htmlValue = useMarkdownToHtml(response);
  const [editorValue, setEditorValue] = useState<string>(htmlValue);

  useEffect(() => {
    setEditorValue(htmlValue);
  }, [htmlValue]);

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
                ? "border-2 border-green-500/40"
                : "bg-transparent border-2 border-transparent"
            )}
          >
            {editMode ? (
              <div className="bg-white dark:bg-zinc-900 w-full max-w-full p-4 h-full">
                <div className="prose max-w-full dark:prose-invert h-full">
                  <CKEditor value={editorValue} onChange={setEditorValue} />
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 h-full">
                <article
                  className={clsx(
                    "max-w-full",
                    "prose prose-neutral dark:prose-invert max-w-none",
                    "prose-h1:text-2xl prose-h1:font-bold prose-h2:text-xl",
                    "prose-p:leading-relaxed prose-strong:text-gray-900 dark:prose-strong:text-gray-50",
                    "prose-ul:list-disc prose-ul:ml-5 prose-li:my-1"
                  )}
                  dangerouslySetInnerHTML={{ __html: htmlValue }}
                />
              </div>
            )}
          </div>

          <div className="fixed bottom-0 left-0 right-0 flex items-center justify-end gap-2 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
            {editMode ? (
              <div className="flex items-center justify-between w-full">
                <Badge className="pointer-events-none flex items-center justify-center font-semibold gap-1 bg-green-200 border border-green-600 text-green-700">
                  <div className="size-2 bg-green-600 rounded-full"></div>
                  Edit mode
                </Badge>
                <div className="flex items-center justify-end gap-1">
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
                        analysis: editorValue,
                      });
                      setField("motivationLetter", {
                        letter: editorValue,
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
                <DownloadButton
                  downloading={downloading}
                  downloadKey="motivation-letter"
                  handleDownload={() =>
                    handleDownloadPDF({
                      html: htmlValue,
                      setDownloading,
                    })
                  }
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
