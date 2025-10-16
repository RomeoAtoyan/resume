import { LoadingState } from "@/store/use-download-store";
import { Download } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

interface DownloadButtonProps {
  downloadKey: LoadingState;
  downloading: { [key in LoadingState]?: boolean };
  handleDownload: () => void | Promise<void>;
}

export const DownloadButton = ({
  downloadKey,
  downloading,
  handleDownload,
}: DownloadButtonProps) => {
  const isLoading = downloading[downloadKey];

  let label: string;
  switch (downloadKey) {
    case "resume":
      label = "Download CV";
      break;
    case "motivation-letter":
      label = "Download";
      break;
    default:
      label = "Download";
  }

  return (
    <Button onClick={handleDownload} disabled={isLoading}>
      {isLoading ? (
        <Spinner className="size-4" />
      ) : (
        <>
          <Download className="size-4" />
          {label}
        </>
      )}
    </Button>
  );
};
