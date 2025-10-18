"use client";

import { useState } from "react";

import TemplatesCarousel from "@/components/templates-carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { editResumeGlobalDetails } from "@/lib/actions/resume/edit-resume-global-details";
import { TemplateTypes } from "@/store/types/cv-data-types";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { useModalStore } from "@/store/use-modal-store";
import { useRouter } from "next/navigation";

const templates = [
  { id: "default", name: "Default", thumbnail: "/templates/default.png" },
  { id: "modern", name: "Modern", thumbnail: "/templates/modern.png" },
  { id: "minimal", name: "Minimal", thumbnail: "/templates/minimal.png" },
  { id: "creative", name: "Creative", thumbnail: "/templates/creative.png" },
  {
    id: "professional",
    name: "Professional",
    thumbnail: "/templates/professional.png",
  },
];

const EditResumeTemplate = () => {
  const { title, setField, template, resumeId } = useCvDataStore();
  const { close } = useModalStore();
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateTypes>(template);

  const [loading, setLoading] = useState(false);

  return (
    <div className="overflow-hidden">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Edit resume</h2>
        <p className="text-sm text-gray-500">Edit the title and/or template</p>
      </div>

      <div className="space-y-4 px-px">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="e.g. Product Designer Resume"
            value={title || ""}
            onChange={(e) => setField("title", e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="space-y-2">
          <Label>Choose a Template</Label>

          <TemplatesCarousel
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            templates={templates}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (resumeId) {
              editResumeGlobalDetails({
                setField,
                setLoading,
                selectedTemplate,
                title,
                close,
                resumeId,
              });
            }
          }}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default EditResumeTemplate;
