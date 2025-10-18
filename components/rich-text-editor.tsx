"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Editor = dynamic(
  async () => {
    const { CKEditor } = await import("@ckeditor/ckeditor5-react");
    const ClassicEditor = (await import("@ckeditor/ckeditor5-build-classic"))
      .default;

    return function EditorInstance({
      value,
      onChange,
      onReady,
    }: {
      value: string;
      onChange: (val: string) => void;
      onReady?: () => void;
    }) {
      return (
        <CKEditor
          editor={ClassicEditor as any}
          data={value}
          onReady={() => onReady?.()}
          onChange={(_, editor) => onChange(editor.getData())}
          config={{
            toolbar: [
              "|",
              "bold",
              "italic",
              "underline",
              "|",
              "link",
              "bulletedList",
              "numberedList",
              "|",
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

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative min-h-[140px] bg-white dark:bg-zinc-900 rounded-lg border dark:border-zinc-800 p-1">
      {!isReady && (
        <div className="absolute inset-0 p-2 pointer-events-none">
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-24 w-full" />
        </div>
      )}

      <Editor
        value={value}
        onChange={onChange}
        onReady={() => setIsReady(true)}
      />
    </div>
  );
}
