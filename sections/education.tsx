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
import { useCvDataStore } from "@/store/use-cv-data-store";
import { parse, format } from "date-fns";
import {
  Award,
  BookOpen,
  CalendarIcon,
  GraduationCap,
  MapPin,
  Trash2,
  Plus,
} from "lucide-react";
import SectionBoxWrapper from "./section-box-wrapper";
import { RichTextEditor } from "@/components/rich-text-editor";

type BaseField = {
  id: string;
  label: string;
  placeholder: string;
  textarea?: boolean;
  rows?: number;
};

type DateField = BaseField & { type: "date" };
type TextField = BaseField & { type?: "text" };
type EducationField = DateField | TextField;

const educationFields: readonly EducationField[] = [
  {
    id: "school",
    label: "School / University",
    placeholder: "Stanford University",
  },
  { id: "degree", label: "Degree", placeholder: "Bachelor of Science" },
  {
    id: "fieldOfStudy",
    label: "Field of Study",
    placeholder: "Computer Science",
  },
  { id: "location", label: "Location", placeholder: "California, USA" },
  {
    id: "startDate",
    label: "Start Date",
    placeholder: "Select month and year",
    type: "date",
  },
  {
    id: "endDate",
    label: "End Date",
    placeholder: "Select month and year",
    type: "date",
  },
  {
    id: "summary",
    label: "Summary / Coursework",
    placeholder:
      "Briefly describe your studies, focus areas, or relevant projects...",
    textarea: true,
    rows: 4,
  },
] as const;

const Education = () => {
  const { education, setItemField, addItem, removeItem } = useCvDataStore();

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

  const handleDateSelect = (
    eduId: string,
    fieldId: string,
    date: Date | undefined
  ) => {
    if (date) {
      setItemField(
        "education",
        eduId,
        fieldId as any,
        format(date, "MMM yyyy")
      );
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

        <div className="space-y-8">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-gray-100 p-4 rounded-md space-y-4 shadow-sm relative z-0"
            >
              <div className="absolute top-1 right-1">
                <Button
                  className="group"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeItem("education", edu.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500 group-hover:text-red-400" />
                </Button>
              </div>

              {educationFields.map((field) => {
                const icon = getIcon(field.id);
                const value =
                  (edu[field.id as keyof typeof edu] as string) ?? "";

                if (field.type === "date") {
                  const parsedDate = value
                    ? parse(value, "MMM yyyy", new Date())
                    : undefined;

                  return (
                    <div key={field.id} className="space-y-1">
                      <Label>{field.label}</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal bg-white ${
                              !value && "text-muted-foreground"
                            }`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {value || field.placeholder}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-2"
                          align="start"
                          sideOffset={4}
                        >
                          <Calendar
                            mode="single"
                            selected={parsedDate}
                            onSelect={(date) =>
                              handleDateSelect(edu.id, field.id, date)
                            }
                            captionLayout="dropdown"
                            fromYear={1970}
                            toYear={2035}
                            className="[&_.rdp-grid]:hidden"
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
                      <RichTextEditor
                        value={value}
                        onChange={(val) =>
                          setItemField(
                            "education",
                            edu.id,
                            field.id as any,
                            val
                          )
                        }
                      />
                    </div>
                  );
                }

                if (icon) {
                  return (
                    <div key={field.id} className="space-y-1">
                      <Label>{field.label}</Label>
                      <InputGroup className="bg-white overflow-hidden">
                        <InputGroupInput
                          id={`${field.id}-${edu.id}`}
                          placeholder={field.placeholder}
                          value={value}
                          className="bg-white"
                          onChange={(e) =>
                            setItemField(
                              "education",
                              edu.id,
                              field.id as any,
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
                      id={`${field.id}-${edu.id}`}
                      placeholder={field.placeholder}
                      value={value}
                      className="bg-white"
                      onChange={(e) =>
                        setItemField(
                          "education",
                          edu.id,
                          field.id as any,
                          e.target.value
                        )
                      }
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button onClick={() => addItem("education")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>
      </div>
    </SectionBoxWrapper>
  );
};

export default Education;
