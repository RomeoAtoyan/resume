"use client";

import Default from "@/app/resume-templates/default";
import Modern from "@/app/resume-templates/modern";

interface ResumeCanvasProps {
  template?: "default" | "modern";
}

const ResumeCanvas = ({ template = "default" }: ResumeCanvasProps) => {
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
