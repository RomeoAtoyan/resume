import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SectionBoxWrapper from "./section-box-wrapper";
import { Button } from "@/components/ui/button";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { Textarea } from "@/components/ui/textarea";

const workExperienceFields = [
  {
    id: "jobTitle",
    label: "Job Title",
    placeholder: "Front-End Developer",
    textarea: false,
  },
  { id: "company", label: "Company", placeholder: "Google", textarea: false },
  {
    id: "location",
    label: "Location",
    placeholder: "Antwerp, Belgium",
    textarea: false,
  },
  {
    id: "startDate",
    label: "Start Date",
    placeholder: "Jan 2020",
    textarea: false,
  },
  {
    id: "endDate",
    label: "End Date",
    placeholder: "Mar 2023",
    textarea: false,
  },
  {
    id: "summary",
    label: "Summary",
    placeholder: "Describe your role and key achievements...",
    textarea: true,
  },
] as const;

const WorkExperience = () => {
  const { setWorkExperienceField } = useCvDataStore();

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
          {workExperienceFields.map((field) => (
            <div key={field.id} className="space-y-1">
              <Label>{field.label}</Label>
              {field.textarea ? (
                <Textarea
                  onChange={(e) =>
                    setWorkExperienceField("1", field.id, e.target.value)
                  }
                  placeholder={field.placeholder}
                  className="bg-white"
                />
              ) : (
                <Input
                  onChange={(e) =>
                    setWorkExperienceField("1", field.id, e.target.value)
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
          <Button>Add experience</Button>
        </div>
      </div>
    </SectionBoxWrapper>
  );
};

export default WorkExperience;
