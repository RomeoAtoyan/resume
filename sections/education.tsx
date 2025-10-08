import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SectionBoxWrapper from "./section-box-wrapper";
import { Button } from "@/components/ui/button";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { Textarea } from "@/components/ui/textarea";

export const educationFields = [
  {
    id: "school",
    label: "School / University",
    placeholder: "Stanford University",
    textarea: false,
  },
  {
    id: "degree",
    label: "Degree",
    placeholder: "Bachelor of Science",
    textarea: false,
  },
  {
    id: "fieldOfStudy",
    label: "Field of Study",
    placeholder: "Computer Science",
    textarea: false,
  },
  {
    id: "location",
    label: "Location",
    placeholder: "California, USA",
    textarea: false,
  },
  {
    id: "startDate",
    label: "Start Date",
    placeholder: "Sep 2016",
    textarea: false,
    type: "date", // optional, useful for future date picker
  },
  {
    id: "endDate",
    label: "End Date",
    placeholder: "Jun 2020",
    textarea: false,
    type: "date",
  },
  {
    id: "grade",
    label: "Grade / GPA",
    placeholder: "3.8 GPA",
    textarea: false,
  },
  {
    id: "summary",
    label: "Summary / Coursework",
    placeholder:
      "Briefly describe your studies, focus areas, or relevant projects...",
    textarea: true,
  },
] as const;

const Education = () => {
  const { setEducationField } = useCvDataStore();

  return (
    <SectionBoxWrapper>
      <div className="space-y-6 overflow-y-auto">
        <div>
          <Label className="text-sm font-semibold text-gray-800">
            Work Experience
          </Label>
          <p className="text-xs text-gray-500">
            Add your previous roles, companies, and key achievements. Focus on
            responsibilities and results that demonstrate your skills and
            growth.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md space-y-4">
          {educationFields.map((field) => (
            <div key={field.id} className="space-y-1">
              <Label>{field.label}</Label>
              {field.textarea ? (
                <Textarea
                  onChange={(e) =>
                    setEducationField("1", field.id, e.target.value)
                  }
                  placeholder={field.placeholder}
                  className="bg-white"
                />
              ) : (
                <Input
                  onChange={(e) =>
                    setEducationField("1", field.id, e.target.value)
                  }
                  className="bg-white"
                  type="text"
                  id={field.id}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end">
          <Button>Add education</Button>
        </div>
      </div>
    </SectionBoxWrapper>
  );
};

export default Education;
