"use client";

import React from "react";
import SectionBoxWrapper from "./section-box-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCvDataStore } from "@/store/use-cv-data-store";

const References = () => {
  const { references, setReferenceField } = useCvDataStore();
  const referencesFields = [
    {
      id: "fullName",
      label: "Full Name",
      placeholder: "e.g. Jane Doe",
      textarea: false,
    },
    {
      id: "position",
      label: "Position / Title",
      placeholder: "e.g. Senior Engineer",
      textarea: false,
    },
    {
      id: "company",
      label: "Company / Organization",
      placeholder: "e.g. Google",
      textarea: false,
    },
    {
      id: "email",
      label: "Email Address",
      placeholder: "e.g. jane.doe@example.com",
      textarea: false,
    },
    {
      id: "phone",
      label: "Phone Number",
      placeholder: "e.g. +32 485 123 456",
      textarea: false,
    },
  ] as const;

  return (
    <SectionBoxWrapper>
      <div className="space-y-6">
        <div>
          <Label className="text-sm font-semibold text-gray-800">
            References
          </Label>
          <p className="text-xs text-gray-500">
            Add people who can professionally vouch for your work or character.
          </p>
        </div>

        <div className="space-y-8">
          {references.map((ref) => (
            <div
              key={ref.id}
              className="bg-gray-100 p-4 rounded-md space-y-4 shadow-sm"
            >
              {referencesFields.map((field) => (
                <div key={field.id} className="space-y-1">
                  <Label>{field.label}</Label>
                  <Input
                    type="text"
                    placeholder={field.placeholder}
                    value={ref[field.id as keyof typeof ref] as string}
                    onChange={(e) =>
                      setReferenceField(ref.id, field.id, e.target.value)
                    }
                    className="bg-white"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button>Add Reference</Button>
        </div>
      </div>
    </SectionBoxWrapper>
  );
};

export default References;
