"use client";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { useState } from "react";

const ResumeCanvas = () => {
  const [downloading, setDownloading] = useState(false);
  const {
    fullName,
    jobTitle,
    email,
    phoneNumber,
    address,
    summary,
    workExperience,
    education,
    languages
  } = useCvDataStore();

  return (
    <div className="relative h-[calc(100vh-65px)] w-full overflow-y-auto bg-[radial-gradient(circle_at_center,_#e5e7eb_1px,_transparent_1px)] [background-size:20px_20px] flex justify-start pl-10 py-10">
      <div
        className="bg-white shadow-lg border border-gray-300 rounded-md overflow-hidden"
        style={{
          width: "210mm",
          height: "297mm",
        }}
      >
        <div className="p-6">
          <h1>{fullName}</h1>
          <h1>{jobTitle}</h1>
          <h1>{email}</h1>
          <h1>{phoneNumber}</h1>
          <h1>{address}</h1>

          <p>{summary}</p>

          <div>{JSON.stringify(workExperience)}</div>
          <div>{JSON.stringify(education)}</div>
          <div>{JSON.stringify(languages)}</div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCanvas;
