"use client";

import React from "react";
import SectionBoxWrapper from "./section-box-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useCvDataStore } from "@/store/use-cv-data-store";

const Language = () => {
  const { languages, setLanguageField } = useCvDataStore();

  // Converts numeric level into a readable label
  const getLevelLabel = (level: number) => {
    if (level >= 90) return "Native";
    if (level >= 75) return "Fluent";
    if (level >= 50) return "Intermediate";
    if (level >= 25) return "Basic";
    return "Beginner";
  };

  return (
    <SectionBoxWrapper>
      <div className="space-y-6">
        <div>
          <Label className="text-sm font-semibold text-gray-800">
            Languages
          </Label>
          <p className="text-xs text-gray-500">
            Add your languages and rate your proficiency.
          </p>
        </div>

        <div className="space-y-8">
          {languages.map((lang) => (
            <div
              key={lang.id}
              className="bg-gray-100 p-4 rounded-md space-y-4 shadow-sm"
            >
              <div className="space-y-2">
                <Label htmlFor={`language-${lang.id}`}>Language</Label>
                <Input
                  id={`language-${lang.id}`}
                  placeholder="e.g. English"
                  value={lang.language}
                  onChange={(e) =>
                    setLanguageField(lang.id, "language", e.target.value)
                  }
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Proficiency Level</Label>
                  <span className="text-xs text-gray-600">
                    {getLevelLabel(lang.level ?? 0)} ({lang.level ?? 0}%)
                  </span>
                </div>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={[lang.level ?? 0]}
                  onValueChange={(val) =>
                    setLanguageField(lang.id, "level", val[0])
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button>Add Language</Button>
        </div>
      </div>
    </SectionBoxWrapper>
  );
};

export default Language;
