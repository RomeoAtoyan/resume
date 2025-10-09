"use client";

import React from "react";
import SectionBoxWrapper from "./section-box-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { useCvDataStore } from "@/store/use-cv-data-store";

const Skills = () => {
  const { skills, addItem, removeItem, setItemField } = useCvDataStore();

  return (
    <SectionBoxWrapper>
      <div className="space-y-1 mb-6">
        <Label className="text-lg font-semibold text-gray-800">Skills</Label>
        <p className="text-xs text-gray-500">
          Add your main technical and soft skills. Keep it short and clear so
          employers can quickly see your strengths.
        </p>
      </div>

      <div className="space-y-6">
        {skills?.map((skill) => (
          <div
            key={skill.id}
            className="border border-gray-200 rounded-lg p-5 space-y-4 relative z-0 bg-gray-100"
          >
            <div className="flex justify-end items-start absolute top-1 right-1">
              <Button
                className="group"
                size="icon"
                variant="ghost"
                onClick={() => removeItem("skills", skill.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500 group-hover:text-red-500/80" />
              </Button>
            </div>

            <div className="flex flex-col space-y-1">
              <Label className="text-sm text-gray-700">Skill Name</Label>
              <Input
                className="bg-white"
                placeholder="e.g. React"
                value={skill.name}
                onChange={(e) =>
                  setItemField("skills", skill.id, "name", e.target.value)
                }
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label className="text-sm text-gray-700">Category</Label>
              <Input
                className="bg-white"
                placeholder="e.g. Frontend, Communication"
                value={skill.category}
                onChange={(e) =>
                  setItemField("skills", skill.id, "category", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={() => addItem("skills")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>
    </SectionBoxWrapper>
  );
};

export default Skills;
