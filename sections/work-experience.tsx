import React from "react";
import SectionBoxWrapper from "./section-box-wrapper";
import { Label } from "@/components/ui/label";

const WorkExperience = () => {
  return (
    <SectionBoxWrapper>
      <div className="space-y-6">
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

        <div>test</div>
      </div>
    </SectionBoxWrapper>
  );
};

export default WorkExperience;
