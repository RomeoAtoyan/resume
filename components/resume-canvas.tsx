"use client";

import Default from "@/app/resume-templates/default";
import Modern from "@/app/resume-templates/modern";
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

  return <>{renderTemplate()}</>;
};

export default ResumeCanvas;
