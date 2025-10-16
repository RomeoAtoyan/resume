import { LoadingState } from "@/store/use-download-store";

export const handleDownloadResumePDF = async ({
  html,
  setDownloading,
}: {
  html: string;
  setDownloading: (id: LoadingState, val: boolean) => void;
}) => {
  setDownloading("download-resume", true);

  try {
    const res = await fetch("/api/pdf-resume", {
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
    a.download = "resume.pdf";
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Resume PDF download failed:", error);
  } finally {
    setDownloading("download-resume", false);
  }
};
