"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { createResume } from "@/lib/actions/create-resume";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { useModalStore } from "@/store/use-modal-store";
import clsx from "clsx";
import { TemplateTypes } from "@/store/types/cv-data-types";
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

const AddCV = () => {
  const { title, setField } = useCvDataStore();
  const { close } = useModalStore();
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateTypes>("default");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="space-y-6 overflow-hidden">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Create a new resume
        </h2>
        <p className="text-sm text-gray-500">
          Pick a name and select a template to begin your CV.
        </p>
      </div>

      <div className="space-y-4">
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

          <div className="flex gap-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory pb-3 mt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {templates.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedTemplate(t.id as TemplateTypes)}
                className={clsx(
                  "relative w-40 flex-shrink-0 cursor-pointer snap-center rounded-xl border overflow-hidden transition-all group",
                  selectedTemplate === t.id
                    ? "border-blue-500 ring-2 ring-blue-300"
                    : "border-gray-200 hover:border-gray-400"
                )}
              >
                <div className="relative aspect-[3/4] bg-gray-100"></div>
                <div className="p-2 text-center text-sm font-medium text-gray-700">
                  {t.name}
                </div>
                {selectedTemplate === t.id && (
                  <div className="absolute inset-0 bg-blue-500/10 ring-2 ring-blue-500 rounded-xl pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button
          onClick={() =>
            createResume({
              loading,
              setLoading,
              selectedTemplate,
              title,
              close,
              router,
            })
          }
          disabled={loading}
        >
          {loading ? <Spinner /> : "Create Resume"}
        </Button>
      </div>
    </div>
  );
};

export default AddCV;
