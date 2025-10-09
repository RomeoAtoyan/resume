import React from "react";
import SectionBoxWrapper from "./section-box-wrapper";
import { Label } from "@/components/ui/label";

const Skills = () => {
  return (
    <SectionBoxWrapper>
      <div>
        <Label className="text-lg font-semibold text-gray-800">Skills</Label>
        <p className="text-xs text-gray-500">
          List your key technical and soft skills to showcase your strengths.
          Include tools, technologies, or abilities that best represent your
          expertise.
        </p>
      </div>
    </SectionBoxWrapper>
  );
};

export default Skills;
