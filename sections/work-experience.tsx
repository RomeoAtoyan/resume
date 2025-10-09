"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SectionBoxWrapper from "./section-box-wrapper";
import { Button } from "@/components/ui/button";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarIcon,
  Briefcase,
  Building2,
  MapPin,
} from "lucide-react";
import { format } from "date-fns";
import type { WorkExperience as WorkExperienceType } from "@/store/use-cv-data-store";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";

type BaseField = {
  id: string;
  label: string;
  placeholder: string;
  textarea?: boolean;
};

type DateField = BaseField & { type: "date" };
type TextField = BaseField & { type?: "text" };
type WorkField = DateField | TextField;

const workExperienceFields: readonly WorkField[] = [
  {
    id: "jobTitle",
    label: "Job Title",
    placeholder: "Front-End Developer",
  },
  { id: "company", label: "Company", placeholder: "Google" },
  {
    id: "location",
    label: "Location",
    placeholder: "Antwerp, Belgium",
  },
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
    label: "Summary",
    placeholder: "Describe your role and key achievements...",
    textarea: true,
  },
] as const;

const WorkExperience = () => {
  const { workExperience, setWorkExperienceField } = useCvDataStore();
  const [dates, setDates] = useState<{ [key: string]: Date | undefined }>({
    startDate: undefined,
    endDate: undefined,
  });

  const handleDateSelect = (fieldId: string, date: Date | undefined) => {
    setDates((prev) => ({ ...prev, [fieldId]: date }));
    if (date)
      setWorkExperienceField(
        "1",
        fieldId as keyof WorkExperienceType,
        format(date, "MMM yyyy")
      );
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "jobTitle":
        return <Briefcase className="h-4 w-4 text-gray-500" />;
      case "company":
        return <Building2 className="h-4 w-4 text-gray-500" />;
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
            Work Experience
          </Label>
          <p className="text-xs text-gray-500">
            Add your previous roles, companies, and key achievements. Focus on
            responsibilities and results that demonstrate your skills and growth.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md space-y-4">
          {workExperienceFields.map((field) => {
            const icon = getIcon(field.id);
            const value =
              (workExperience?.[0]?.[field.id as keyof WorkExperienceType] as string) ?? "";

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
                  <Textarea
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(e) =>
                      setWorkExperienceField(
                        "1",
                        field.id as keyof WorkExperienceType,
                        e.target.value
                      )
                    }
                    className="bg-white"
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
                      id={field.id}
                      placeholder={field.placeholder}
                      value={value}
                      className="bg-white"
                      onChange={(e) =>
                        setWorkExperienceField(
                          "1",
                          field.id as keyof WorkExperienceType,
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
                  value={value}
                  className="bg-white"
                  onChange={(e) =>
                    setWorkExperienceField(
                      "1",
                      field.id as keyof WorkExperienceType,
                      e.target.value
                    )
                  }
                />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-end">
          <Button>Add experience</Button>
        </div>
      </div>
    </SectionBoxWrapper>
  );
};

export default WorkExperience;
