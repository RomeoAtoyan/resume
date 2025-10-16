import { LoadingState } from "@/store/use-download-store";

export const handleDownloadPDF = async ({
  html,
  setDownloading,
}: {
  html: string;
  setDownloading: (id: LoadingState, val: boolean) => void;
}) => {
  setDownloading("download-motivation-letter", true)
  const res = await fetch("/api/pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ html }),
  });

  if (!res.ok) {
    const { error } = await res.json().catch(() => ({ error: "Failed" }));
    console.error(error);
    return;
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "motivation-letter.pdf";
  a.click();
  URL.revokeObjectURL(url);
  setDownloading("download-motivation-letter", false)
};
