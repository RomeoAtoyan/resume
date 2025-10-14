"use client";

import Default from "@/resume-templates/default";
import Modern from "@/resume-templates/modern";
import { useCvDataStore } from "@/store/use-cv-data-store";

const ResumeCanvas = () => {
  const { template } = useCvDataStore();

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
    <div className="h-full bg-[radial-gradient(circle,_#e5e7eb_1px,_transparent_1px)] [background-size:20px_20px]">
      {renderTemplate()}
    </div>
  );
};

export default ResumeCanvas;
