"use client";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { Languages as LanguagesIcon, Trash2, Plus } from "lucide-react";
import SectionBoxWrapper from "./section-box-wrapper";

const Language = () => {
  const { languages, setItemField, addItem, removeItem } = useCvDataStore();

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
          <Label className="text-lg font-semibold text-gray-800">
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
              className="bg-gray-100 p-4 rounded-md space-y-4 shadow-sm relative z-0"
            >
              <div className="flex justify-end items-start absolute top-1 right-1">
                <Button
                  className="group"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeItem("languages", lang.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500 group-hover:text-red-500/80" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`language-${lang.id}`}>Language Name</Label>
                <InputGroup className="bg-white overflow-hidden">
                  <InputGroupInput
                    id={`language-${lang.id}`}
                    placeholder="e.g. English"
                    value={lang.language}
                    onChange={(e) =>
                      setItemField(
                        "languages",
                        lang.id,
                        "language",
                        e.target.value
                      )
                    }
                    className="bg-white"
                  />
                  <InputGroupAddon>
                    <LanguagesIcon className="h-4 w-4 text-gray-500" />
                  </InputGroupAddon>
                </InputGroup>
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
                    setItemField("languages", lang.id, "level", val[0])
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button onClick={() => addItem("languages")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Language
          </Button>
        </div>
      </div>
    </SectionBoxWrapper>
  );
};

export default Language;
