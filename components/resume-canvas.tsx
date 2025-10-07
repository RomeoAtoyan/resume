"use client";
import { useCvDataStore } from "@/store/use-cv-data-store";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import { Separator } from "./ui/separator";
import { TimelineItem } from "@/components/ui/timeline-item";
import { SkillBar } from "./ui/skill-bar"

const ResumeCanvas = () => {
  const [downloading, setDownloading] = useState(false);
  const { fullName } = useCvDataStore();

  const paperRef = useRef<HTMLDivElement>(null);

  // --- DOWNLOAD PDF ---
  const handleDownloadPDF = async () => {
    if (!paperRef.current) return;
    setDownloading(true);

    try {
      const canvas = await html2canvas(paperRef.current, {
        scale: 4,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="relative h-[calc(100vh-65px)] w-full overflow-y-auto bg-[radial-gradient(circle_at_center,_#e5e7eb_1px,_transparent_1px)] [background-size:20px_20px] flex justify-start pl-10 py-10">
      <div className="fixed top-20 right-4">
        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white shadow-sm hover:bg-gray-50 disabled:opacity-50"
        >
          {downloading ? "Generating..." : "Download PDF"}
        </button>
      </div>

      <div
        ref={paperRef}
        className="bg-white shadow-lg border border-gray-300 rounded-md overflow-hidden"
        style={{
          width: "210mm",
          height: "297mm",
        }}
      >
        <div className="w-full h-full flex select-none">
          <div className="w-4/12 bg-gray-300 p-4">
          
          </div>
          <div className="w-8/12">
            <div className="w-full p-8 bg-gray-200 flex items-center gap-6">
              <img
                className="size-32 object-cover rounded-full"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
                alt=""
              />
              <div>
                <h1 className="text-3xl font-bold">Romeo Atoyan</h1>
                <p className="font-medium">Front-End Developer</p>
              </div>
            </div>

            <div className="p-8 w-full space-y-8">
              <div className="w-full space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="uppercase font-bold inline">Education</h1>
                  <Separator className="max-w-xs" />
                </div>
                <div className="">
                  <TimelineItem
                    university="University of Stanford"
                    years="2005 – 2007"
                    title="CERTIFICATE OF WEB TRAINING"
                    description="Porttitor amet massa. Donec consectetur dolor et orci ornare, sit amet mollis massa."
                  />
                  <TimelineItem
                    university="University of Stanford"
                    years="2005 – 2007"
                    title="CERTIFICATE OF WEB TRAINING"
                    description="Porttitor amet massa. Donec consectetur dolor et orci ornare, sit amet mollis massa."
                  />
                </div>
              </div>
              <div className="w-full space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="uppercase font-bold inline">Experience</h1>
                  <Separator className="max-w-xs" />
                </div>
                <div className="">
                  <TimelineItem
                    university="University of Stanford"
                    years="2005 – 2007"
                    title="CERTIFICATE OF WEB TRAINING"
                    description="Porttitor amet massa. Donec consectetur dolor et orci ornare, sit amet mollis massa."
                  />
                  <TimelineItem
                    university="University of Stanford"
                    years="2005 – 2007"
                    title="CERTIFICATE OF WEB TRAINING"
                    description="Porttitor amet massa. Donec consectetur dolor et orci ornare, sit amet mollis massa."
                  />
                </div>
              </div>
              <div className="w-full space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="uppercase font-bold inline">Skills</h1>
                  <Separator className="max-w-xs" />
                </div>
                <div className="grid grid-cols-2 gap-x-10">
                  <div className="col-span-1">
                    <h1 className="text-base font-semibold mb-2">
                      Professional skills
                    </h1>
                    <SkillBar skill="Photoshop" level={90} />
                    <SkillBar skill="Photoshop" level={90} />
                    <SkillBar skill="Photoshop" level={90} />
                  </div>
                  <div className="col-span-1">
                    <h1 className="text-base font-semibold mb-2">
                      Personal skills
                    </h1>
                    <SkillBar skill="Photoshop" level={90} />
                    <SkillBar skill="Photoshop" level={90} />
                    <SkillBar skill="Photoshop" level={90} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCanvas;
