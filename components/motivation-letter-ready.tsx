"use client";

import { handleDownloadPDF } from "@/lib/actions/download-motivation-letter";
import { CanvasStore } from "@/store/use-canvas-store";
import { LoadingState } from "@/store/use-download-store";
import { ModalType } from "@/store/use-modal-store";
import { Clock, Eye, File, RotateCcw } from "lucide-react";
import moment from "moment";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { DownloadButton } from "./download-button";
import { useMarkdownToHtml } from "@/hooks/use-markdown-to-html";
;

const MotivationLetterReady = ({
  motivationLetter,
  openCanvas,
  openModal,
  downloading,
  setDownloading,
}: {
  motivationLetter: {
    letter: string;
    date: Date | null;
  };
  openCanvas: (id: CanvasStore, title?: string) => void;
  openModal: (id: ModalType, title?: string) => void;
  downloading: { [key in LoadingState]?: boolean };
  setDownloading: (id: LoadingState, val: boolean) => void;
}) => {

  const htmlValue = useMarkdownToHtml(motivationLetter.letter)
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
    <div className="relative z-0 px-4 py-8 border rounded-xl flex flex-col items-start justify-between w-full">
      {formattedDate && (
        <Badge className="absolute -top-3 right-3 px-2 py-1 text-xs bg-purple-500/90 text-white flex items-center gap-1 shadow-sm pointer-events-none">
          <Clock size={12} className="opacity-90" />
          {formattedDate}
        </Badge>
      )}

      <div className="flex items-center gap-3 mb-6">
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

      <div className="w-full flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => openCanvas("motivation-letter")}
          className="flex items-center gap-1"
        >
          <Eye size={16} />
          View
        </Button>
        <Button onClick={() => openModal("regenerate-letter", "Are you sure?")}>
          <RotateCcw />
          Regenerate
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
      </div>
    </div>
  );
};

export default MotivationLetterReady;
