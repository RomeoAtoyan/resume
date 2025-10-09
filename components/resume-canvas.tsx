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
    languages,
    courses,
    references,
    moreDetails,
  } = useCvDataStore();

  return (
    <div className="relative h-[calc(100vh-65px)] w-full overflow-y-auto bg-[radial-gradient(circle_at_center,_#e5e7eb_1px,_transparent_1px)] [background-size:20px_20px] flex justify-center pl-10 py-10">
      <div
        className="bg-white shadow-lg border border-gray-300 rounded-md overflow-hidden"
        style={{
          width: "210mm",
          height: "297mm",
        }}
      >
        <div className="p-6 space-y-8 text-gray-800">
          {/* --- Personal Info --- */}
          <section>
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              Personal Information
            </h2>
            <ul className="text-sm space-y-1">
              <li>
                <strong>Full Name:</strong> {fullName || "—"}
              </li>
              <li>
                <strong>Job Title:</strong> {jobTitle || "—"}
              </li>
              <li>
                <strong>Email:</strong> {email || "—"}
              </li>
              <li>
                <strong>Phone:</strong> {phoneNumber || "—"}
              </li>
              <li>
                <strong>Address:</strong> {address || "—"}
              </li>
            </ul>
          </section>

          {/* --- Summary --- */}
          <section>
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              Summary
            </h2>
            <p className="text-sm leading-relaxed">{summary || "—"}</p>
          </section>

          {/* --- Work Experience --- */}
          <section>
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              Work Experience
            </h2>
            <div className="space-y-3">
              {workExperience?.length ? (
                workExperience.map((exp) => (
                  <div key={exp.id} className="text-sm">
                    <p className="font-medium">
                      {exp.jobTitle || "Untitled"} — {exp.company || "Company"}
                    </p>
                    <p className="text-xs text-gray-600">
                      {exp.startDate} → {exp.endDate || "Present"}{" "}
                      {exp.location && `• ${exp.location}`}
                    </p>
                    <p className="mt-1">{exp.summary}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No work experience added.
                </p>
              )}
            </div>
          </section>

          {/* --- Education --- */}
          <section>
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-3">
              {education?.length ? (
                education.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <p className="font-medium">
                      {edu.degree || "Degree"} — {edu.school || "School"}
                    </p>
                    <p className="text-xs text-gray-600">
                      {edu.startDate} → {edu.endDate}{" "}
                      {edu.location && `• ${edu.location}`}
                    </p>
                    <p className="mt-1">{edu.fieldOfStudy}</p>
                    {edu.summary && (
                      <p className="text-gray-700 text-xs mt-1">
                        {edu.summary}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No education added.</p>
              )}
            </div>
          </section>

          {/* --- Languages --- */}
          <section>
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              Languages
            </h2>
            <ul className="text-sm space-y-1">
              {languages?.length ? (
                languages.map((lang) => (
                  <li key={lang.id}>
                    {lang.language || "Language"} — Level: {lang.level ?? "—"}
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500">No languages added.</p>
              )}
            </ul>
          </section>

          {/* --- Courses & Certificates --- */}
          <section>
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              Courses & Certificates
            </h2>
            <div className="space-y-2 text-sm">
              {courses?.length ? (
                courses.map((c) => (
                  <div key={c.id}>
                    <p className="font-medium">
                      {c.title || "Course"} — {c.issuer || "Issuer"}
                    </p>
                    <p className="text-xs text-gray-600">{c.date}</p>
                    {c.description && (
                      <p className="text-gray-700 mt-1">{c.description}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No courses added.</p>
              )}
            </div>
          </section>

          {/* --- References --- */}
          <section>
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              References
            </h2>
            <ul className="text-sm space-y-2">
              {references?.length ? (
                references.map((ref) => (
                  <li key={ref.id}>
                    <span className="font-medium">
                      {ref.fullName || "Reference Name"}
                    </span>{" "}
                    — {ref.position} at {ref.company}
                    <div className="text-xs text-gray-600">
                      {ref.email} • {ref.phone}
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500">No references added.</p>
              )}
            </ul>
          </section>

          {/* --- More Details --- */}
          {/* <section>
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              More Details
            </h2>
            {moreDetails.map(det => (
              <div>
                <div>{det.achievements}</div>
                <div>{det.hobbies}</div>
                <div>{det.misc}</div>
                <div>{det.personalStatement}</div>
              </div>
            ))}
          </section> */}
        </div>
      </div>
    </div>
  );
};

export default ResumeCanvas;
