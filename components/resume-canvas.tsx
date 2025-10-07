"use client";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeCanvas = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [downloading, setDownloading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  // --- DRAG LOGIC ---
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  // --- ZOOM LOGIC ---
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => {
      const newScale = Math.min(2, Math.max(0.5, prev + delta));
      return parseFloat(newScale.toFixed(2));
    });
  };

  // --- DOWNLOAD PDF ---
  const handleDownloadPDF = async () => {
    if (!paperRef.current) return;
    setDownloading(true);

    try {
      const canvas = await html2canvas(paperRef.current, {
        scale: 2,
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
    <div className="relative h-[calc(100vh-4.25rem)] w-full bg-[radial-gradient(circle_at_center,_#e5e7eb_1px,_transparent_1px)] [background-size:20px_20px] overflow-hidden cursor-grab active:cursor-grabbing">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white shadow-sm hover:bg-gray-50 disabled:opacity-50"
        >
          {downloading ? "Generating..." : "Download PDF"}
        </button>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        className="relative w-full h-full"
      >
        <div
          ref={paperRef}
          className="absolute bg-white shadow-lg border border-gray-300 rounded-md origin-top-left transition-transform duration-0"
          onMouseDown={handleMouseDown}
          style={{
            width: "210mm",
            height: "297mm",
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        >
          <div className="w-full h-full p-10 text-gray-700 select-none">
            <h1 className="text-2xl font-semibold mb-4">My Resume</h1>
            <p>
              🧭 Drag me around and use <strong>Ctrl + Scroll</strong> or your
              trackpad to zoom in/out!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCanvas;
