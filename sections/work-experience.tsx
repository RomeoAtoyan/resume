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
import { useCvDataStore } from "@/store/use-cv-data-store";
import { parse, format } from "date-fns";
import {
  CalendarIcon,
  Briefcase,
  Building2,
  MapPin,
  Trash2,
  Plus,
} from "lucide-react";
import SectionBoxWrapper from "./section-box-wrapper";

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
  { id: "jobTitle", label: "Job Title", placeholder: "Front-End Developer" },
  { id: "company", label: "Company", placeholder: "Google" },
  { id: "location", label: "Location", placeholder: "Antwerp, Belgium" },
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
  const { workExperience, setItemField, addItem, removeItem } =
    useCvDataStore();

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

  const handleDateSelect = (expId: string, fieldId: string, date: Date | undefined) => {
    if (date) {
      setItemField("workExperience", expId, fieldId as any, format(date, "MMM yyyy"));
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
            responsibilities and results that demonstrate your skills and
            growth.
          </p>
        </div>

        <div className="space-y-8">
          {workExperience.map((exp) => (
            <div
              key={exp.id}
              className="bg-gray-100 p-4 rounded-md space-y-4 shadow-sm relative z-0"
            >
              <div className="absolute top-1 right-1">
                <Button
                  className="group"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeItem("workExperience", exp.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500 group-hover:text-red-400" />
                </Button>
              </div>

              {workExperienceFields.map((field) => {
                const icon = getIcon(field.id);
                const value = (exp[field.id as keyof typeof exp] as string) ?? "";

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
                              handleDateSelect(exp.id, field.id, date)
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
                      <Textarea
                        placeholder={field.placeholder}
                        value={value}
                        onChange={(e) =>
                          setItemField(
                            "workExperience",
                            exp.id,
                            field.id as any,
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
                          id={`${field.id}-${exp.id}`}
                          placeholder={field.placeholder}
                          value={value}
                          className="bg-white"
                          onChange={(e) =>
                            setItemField(
                              "workExperience",
                              exp.id,
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
                      id={`${field.id}-${exp.id}`}
                      placeholder={field.placeholder}
                      value={value}
                      className="bg-white"
                      onChange={(e) =>
                        setItemField(
                          "workExperience",
                          exp.id,
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
          <Button onClick={() => addItem("workExperience")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>
      </div>
    </SectionBoxWrapper>
  );
};

export default WorkExperience;
