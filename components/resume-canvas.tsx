"use client";

import Default from "@/resume-templates/default";
import Modern from "@/resume-templates/modern";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { AnimatePresence, motion } from "framer-motion";

const ResumeCanvas = () => {
  const { template } = useCvDataStore();

  const renderTemplate = () => {
    switch (template) {
      case "default":
        return <Default key="default" />;
      case "modern":
        return <Modern key="modern" />;
      default:
        return <div key="unknown">How even?</div>;
    }
  };

  return (
    <div className="w-full h-full bg-[radial-gradient(circle,_#e5e7eb_1px,_transparent_1px)] [background-size:20px_20px] overflow-auto flex items-center justify-center">
      <div className="w-full h-full overflow-auto flex flex-col items-center gap-10 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={template}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              width: "210mm",
              minHeight: "297mm",
            }}
            className="bg-white border shadow-sm p-6 origin-center"
          >
            {renderTemplate()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumeCanvas;
