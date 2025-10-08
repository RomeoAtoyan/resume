"use client";

import React from "react";
import SectionBoxWrapper from "./section-box-wrapper";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCvDataStore } from "@/store/use-cv-data-store";

const CoursesAndCertificates = () => {
  const { courses, setCourseField } = useCvDataStore();

  const coursesFields = [
    {
      id: "title",
      label: "Course / Certificate Title",
      placeholder: "e.g. React Advanced Development",
      textarea: false,
    },
    {
      id: "issuer",
      label: "Issuer / Organization",
      placeholder: "e.g. Coursera, Google, Udemy",
      textarea: false,
    },
    {
      id: "date",
      label: "Completion Date",
      placeholder: "e.g. Jun 2024",
      textarea: false,
      type: "date",
    },
    {
      id: "description",
      label: "Description",
      placeholder:
        "Briefly describe the skills learned, topics covered, or certification details...",
      textarea: true,
    },
    {
      id: "certificateUrl",
      label: "Certificate URL",
      placeholder: "https://www.example.com/certificate",
      textarea: false,
    },
  ] as const;

  return (
    <SectionBoxWrapper>
      <div className="space-y-6">
        <div>
          <Label className="text-sm font-semibold text-gray-800">
            Courses & Certificates
          </Label>
          <p className="text-xs text-gray-500">
            List completed courses, certifications, or training programs that
            enhance your professional profile.
          </p>
        </div>

        <div className="space-y-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-100 p-4 rounded-md space-y-4 shadow-sm"
            >
              {coursesFields.map((field) => (
                <div key={field.id} className="space-y-1">
                  <Label>{field.label}</Label>
                  {field.textarea ? (
                    <Textarea
                      placeholder={field.placeholder}
                      value={course[field.id as keyof typeof course] as string}
                      onChange={(e) =>
                        setCourseField(course.id, field.id, e.target.value)
                      }
                      className="bg-white"
                    />
                  ) : (
                    <Input
                      type={field.type ?? "text"}
                      placeholder={field.placeholder}
                      value={course[field.id as keyof typeof course] as string}
                      onChange={(e) =>
                        setCourseField(course.id, field.id, e.target.value)
                      }
                      className="bg-white"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button>Add Certificate</Button>
        </div>
      </div>
    </SectionBoxWrapper>
  );
};

export default CoursesAndCertificates;
