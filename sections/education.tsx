"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import type { Education } from "@/store/use-cv-data-store";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { format } from "date-fns";
import {
  Award,
  BookOpen,
  CalendarIcon,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import SectionBoxWrapper from "./section-box-wrapper";

type BaseField = {
  id: string;
  label: string;
  placeholder: string;
  textarea?: boolean;
};

type DateField = BaseField & { type: "date" };
type TextField = BaseField & { type?: "text" };
type EducationField = DateField | TextField;

export const educationFields: readonly EducationField[] = [
  { id: "school", label: "School / University", placeholder: "Stanford University" },
  { id: "degree", label: "Degree", placeholder: "Bachelor of Science" },
  { id: "fieldOfStudy", label: "Field of Study", placeholder: "Computer Science" },
  { id: "location", label: "Location", placeholder: "California, USA" },
  { id: "startDate", label: "Start Date", placeholder: "Select month and year", type: "date" },
  { id: "endDate", label: "End Date", placeholder: "Select month and year", type: "date" },
  { id: "grade", label: "Grade / GPA", placeholder: "3.8 GPA" },
  {
    id: "summary",
    label: "Summary / Coursework",
    placeholder:
      "Briefly describe your studies, focus areas, or relevant projects...",
    textarea: true,
  },
] as const;

const Education = () => {
  const { setEducationField, education } = useCvDataStore();
  const [dates, setDates] = useState<{ [key: string]: Date | undefined }>({
    startDate: undefined,
    endDate: undefined,
  });

  const handleDateSelect = (fieldId: string, date: Date | undefined) => {
    setDates((prev) => ({ ...prev, [fieldId]: date }));
    if (date)
      setEducationField(
        "1",
        fieldId as keyof Education,
        format(date, "MMM yyyy")
      );
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "school":
        return <GraduationCap className="h-4 w-4 text-gray-500" />;
      case "degree":
        return <Award className="h-4 w-4 text-gray-500" />;
      case "fieldOfStudy":
        return <BookOpen className="h-4 w-4 text-gray-500" />;
      case "location":
        return <MapPin className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <SectionBoxWrapper>
      <div className="space-y-6 overflow-y-auto">
        <div>
          <Label className="text-lg font-semibold text-gray-800">
            Education
          </Label>
          <p className="text-xs text-gray-500">
            Add your academic background, including schools, degrees, and key
            areas of study. Highlight achievements or courses that best
            represent your expertise.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md space-y-4">
          {educationFields.map((field) => {
            const icon = getIcon(field.id);

            const currentValue =
              education?.[0]?.[field.id as keyof Education] ?? "";

            if (field.type === "date") {
              return (
                <div key={field.id} className="space-y-1">
                  <Label>{field.label}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal bg-white ${
                          !dates[field.id] && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dates[field.id]
                          ? format(dates[field.id]!, "MMM yyyy")
                          : field.placeholder}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-2"
                      align="start"
                      sideOffset={4}
                    >
                      <Calendar
                        mode="single"
                        selected={dates[field.id]}
                        onSelect={(date) => handleDateSelect(field.id, date)}
                        captionLayout="dropdown"
                        fromYear={1970}
                        toYear={2035}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              );
            }

            if (field.textarea) {
              return (
                <div key={field.id} className="space-y-1">
                  <Label>{field.label}</Label>
                  <Textarea
                    value={currentValue as string}
                    onChange={(e) =>
                      setEducationField(
                        "1",
                        field.id as keyof Education,
                        e.target.value
                      )
                    }
                    placeholder={field.placeholder}
                    className="bg-white"
                  />
                </div>
              );
            }

            if (icon) {
              return (
                <div key={field.id} className="space-y-1">
                  <Label>{field.label}</Label>
                  <InputGroup className="overflow-hidden bg-white">
                    <InputGroupInput
                      id={field.id}
                      placeholder={field.placeholder}
                      value={currentValue as string}
                      className="bg-white"
                      onChange={(e) =>
                        setEducationField(
                          "1",
                          field.id as keyof Education,
                          e.target.value
                        )
                      }
                    />
                    <InputGroupAddon>{icon}</InputGroupAddon>
                  </InputGroup>
                </div>
              );
            }

            return (
              <div key={field.id} className="space-y-1">
                <Label>{field.label}</Label>
                <Input
                  id={field.id}
                  placeholder={field.placeholder}
                  value={currentValue as string}
                  className="bg-white"
                  onChange={(e) =>
                    setEducationField(
                      "1",
                      field.id as keyof Education,
                      e.target.value
                    )
                  }
                />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-end">
          <Button>Add education</Button>
        </div>
      </div>
    </SectionBoxWrapper>
  );
};

export default Education;
