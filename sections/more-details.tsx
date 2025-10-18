"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { Heart, Info, Trophy } from "lucide-react";
import SectionBoxWrapper from "./section-box-wrapper";
import { RichTextEditor } from "@/components/rich-text-editor"; // ✅ reusable CKEditor

const MoreDetails = () => {
  const { moreDetails, setItemField } = useCvDataStore();

  return (
    <SectionBoxWrapper>
      <div className="space-y-6">
        <div>
          <Label className="text-lg font-semibold text-gray-800">
            More Details
          </Label>
          <p className="text-xs text-gray-500">
            Add any additional information you’d like to highlight about
            yourself.
          </p>
        </div>

        <div className="space-y-8">
          {moreDetails.map((section) => (
            <div
              key={section.id}
              className="bg-gray-100 p-4 rounded-md space-y-4 shadow-sm relative z-0"
            >
              <div className="space-y-2">
                <Label className="font-medium">Additional Info</Label>
                <InputGroup className="bg-white overflow-hidden">
                  <InputGroupInput
                    placeholder="e.g. Hackathon Winner 2024, Best UI Design Award..."
                    value={section.achievements}
                    onChange={(e) =>
                      setItemField(
                        "moreDetails",
                        section.id,
                        "achievements",
                        e.target.value
                      )
                    }
                    className="bg-white"
                  />
                  <InputGroupAddon>
                    <Trophy className="h-4 w-4 text-gray-500" />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <div className="space-y-2">
                <Label>Hobbies / Interests</Label>
                <InputGroup className="bg-white overflow-hidden">
                  <InputGroupInput
                    placeholder="e.g. Classic cars, AI education, design..."
                    value={section.hobbies}
                    onChange={(e) =>
                      setItemField(
                        "moreDetails",
                        section.id,
                        "hobbies",
                        e.target.value
                      )
                    }
                    className="bg-white"
                  />
                  <InputGroupAddon>
                    <Heart className="h-4 w-4 text-gray-500" />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <div className="space-y-2">
                <Label>Personal Statement</Label>
                <RichTextEditor
                  value={section.personalStatement ?? ""}
                  onChange={(val) =>
                    setItemField(
                      "moreDetails",
                      section.id,
                      "personalStatement",
                      val
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Other Details</Label>
                <InputGroup className="bg-white overflow-hidden">
                  <InputGroupInput
                    placeholder="e.g. Open to relocation, available immediately..."
                    value={section.misc}
                    onChange={(e) =>
                      setItemField(
                        "moreDetails",
                        section.id,
                        "misc",
                        e.target.value
                      )
                    }
                    className="bg-white"
                  />
                  <InputGroupAddon>
                    <Info className="h-4 w-4 text-gray-500" />
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionBoxWrapper>
  );
};

export default MoreDetails;
