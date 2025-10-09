"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
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
import { format } from "date-fns";
import {
  BookOpen,
  Building2,
  CalendarIcon,
  Link2,
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
type CourseField = DateField | TextField;

const coursesFields: readonly CourseField[] = [
  {
    id: "title",
    label: "Course / Certificate Title",
    placeholder: "e.g. React Advanced Development",
  },
  {
    id: "issuer",
    label: "Issuer / Organization",
    placeholder: "e.g. Coursera, Google, Udemy",
  },
  {
    id: "date",
    label: "Completion Date",
    placeholder: "Select month and year",
    type: "date",
  },
  {
    id: "description",
    label: "Description",
    placeholder:
      "Briefly describe the skills learned, topics covered, or certification details...",
    textarea: true,
  },
  {
    id: "certificateUrl",
    label: "Certificate URL",
    placeholder: "https://www.example.com/certificate",
  },
] as const;

const CoursesAndCertificates = () => {
  const { courses, setItemField, addItem, removeItem } = useCvDataStore();
  const [dates, setDates] = useState<Record<string, Date | undefined>>({});

  const getIcon = (id: string) => {
    switch (id) {
      case "title":
        return <BookOpen className="h-4 w-4 text-gray-500" />;
      case "issuer":
        return <Building2 className="h-4 w-4 text-gray-500" />;
      case "certificateUrl":
        return <Link2 className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const handleDateSelect = (courseId: string, date: Date | undefined) => {
    setDates((prev) => ({ ...prev, [courseId]: date }));
    if (date)
      setItemField("courses", courseId, "date", format(date, "MMM yyyy"));
  };

  return (
    <SectionBoxWrapper>
      <div className="space-y-6">
        <div>
          <Label className="text-lg font-semibold text-gray-800">
            Courses & Certificates
          </Label>
          <p className="text-xs text-gray-500">
            List completed courses, certifications, or training programs that
            enhance your professional profile.
          </p>
        </div>

        <div className="space-y-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-100 p-4 rounded-md space-y-4 shadow-sm relative z-0"
            >
              <div className="flex justify-endbetween items-start absolute top-1 right-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeItem("courses", course.id)}
                >
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </Button>
              </div>

              {coursesFields.map((field) => {
                const icon = getIcon(field.id);
                const value =
                  (course[field.id as keyof typeof course] as string) ?? "";

                if (field.type === "date") {
                  return (
                    <div key={field.id} className="space-y-1">
                      <Label>{field.label}</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal bg-white ${
                              !dates[course.id] && "text-muted-foreground"
                            }`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dates[course.id]
                              ? format(dates[course.id]!, "MMM yyyy")
                              : field.placeholder}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-2"
                          align="start"
                          sideOffset={4}
                        >
                          <CalendarPicker
                            mode="single"
                            selected={dates[course.id]}
                            onSelect={(date) => handleDateSelect(course.id, date)}
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
                            "courses",
                            course.id,
                            field.id as keyof typeof course,
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
                          id={`${field.id}-${course.id}`}
                          placeholder={field.placeholder}
                          value={value}
                          className="bg-white"
                          onChange={(e) =>
                            setItemField(
                              "courses",
                              course.id,
                              field.id as keyof typeof course,
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
                      id={`${field.id}-${course.id}`}
                      placeholder={field.placeholder}
                      value={value}
                      className="bg-white"
                      onChange={(e) =>
                        setItemField(
                          "courses",
                          course.id,
                          field.id as keyof typeof course,
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
          <Button onClick={() => addItem("courses")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Certificate
          </Button>
        </div>
      </div>
    </SectionBoxWrapper>
  );
};

export default CoursesAndCertificates;
