"use client";

import React from "react";
import SectionBoxWrapper from "./section-box-wrapper";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCvDataStore } from "@/store/use-cv-data-store";

const MoreDetails = () => {
  const { moreDetails, setMoreDetailsField } = useCvDataStore();

  return (
    <SectionBoxWrapper>
      <div className="space-y-6">
        <div>
          <Label className="text-sm font-semibold text-gray-800">
            More Details
          </Label>
          <p className="text-xs text-gray-500">
            Add any additional information you’d like to highlight about
            yourself.
          </p>
        </div>

        {moreDetails.map((section) => (
          <div
            key={section.id}
            className="bg-gray-100 p-4 rounded-md space-y-4 shadow-sm"
          >
            <div className="space-y-2">
              <Label>Achievements / Awards</Label>
              <Textarea
                placeholder="e.g. Hackathon Winner 2024, Best UI Design Award..."
                value={section.achievements}
                onChange={(e) =>
                  setMoreDetailsField(
                    section.id,
                    "achievements",
                    e.target.value
                  )
                }
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label>Hobbies / Interests</Label>
              <Textarea
                placeholder="e.g. Classic cars, AI education, design..."
                value={section.hobbies}
                onChange={(e) =>
                  setMoreDetailsField(section.id, "hobbies", e.target.value)
                }
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label>Personal Statement</Label>
              <Textarea
                placeholder="Write a short paragraph describing your personality, values, or goals..."
                value={section.personalStatement}
                onChange={(e) =>
                  setMoreDetailsField(
                    section.id,
                    "personalStatement",
                    e.target.value
                  )
                }
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label>Other Details</Label>
              <Textarea
                placeholder="e.g. Open to relocation, available immediately..."
                value={section.misc}
                onChange={(e) =>
                  setMoreDetailsField(section.id, "misc", e.target.value)
                }
                className="bg-white"
              />
            </div>
          </div>
        ))}
      </div>
    </SectionBoxWrapper>
  );
};

export default MoreDetails;
