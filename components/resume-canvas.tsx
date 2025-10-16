"use client";

import Default from "@/resume-templates/default";
import Modern from "@/resume-templates/modern";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { Button } from "./ui/button";
import { handleDownloadResumePDF } from "@/lib/actions/download-pdf-resume";
import { useDownloadStore } from "@/store/use-download-store";
import { getResumeContent } from "@/lib/helpers/get-resume-content";

const ResumeCanvas = () => {
  const { template } = useCvDataStore();
  const { setDownloading } = useDownloadStore();

  const renderTemplate = () => {
    switch (template) {
      case "default":
        return <Default />;
      case "modern":
        return <Modern />;
      default:
        return <div>How even?</div>;
    }
  };

  return (
    <div className="w-full h-full bg-[radial-gradient(circle,_#e5e7eb_1px,_transparent_1px)] [background-size:20px_20px] overflow-auto  flex items-center justify-center">
      <div className="w-full h-full overflow-auto flex flex-col items-center gap-10 py-10">
        <div
          style={{ width: "210mm", minHeight: "297mm" }}
          className="bg-white border shadow-sm p-6"
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumeCanvas;
