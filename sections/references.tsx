"use client";

import SectionBoxWrapper from "./section-box-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { useCvDataStore } from "@/store/use-cv-data-store";
import {
  User,
  Briefcase,
  Building2,
  Mail,
  Phone,
  Trash2,
  Plus,
} from "lucide-react";

const References = () => {
  const { references, setItemField, addItem, removeItem } = useCvDataStore();

  const referencesFields = [
    {
      id: "fullName",
      label: "Full Name",
      placeholder: "e.g. Jane Doe",
    },
    {
      id: "position",
      label: "Position / Title",
      placeholder: "e.g. Senior Engineer",
    },
    {
      id: "company",
      label: "Company / Organization",
      placeholder: "e.g. Google",
    },
    {
      id: "email",
      label: "Email Address",
      placeholder: "e.g. jane.doe@example.com",
    },
    {
      id: "phone",
      label: "Phone Number",
      placeholder: "e.g. +32 485 123 456",
    },
  ] as const;

  const getIcon = (id: string) => {
    switch (id) {
      case "fullName":
        return <User className="h-4 w-4 text-gray-500" />;
      case "position":
        return <Briefcase className="h-4 w-4 text-gray-500" />;
      case "company":
        return <Building2 className="h-4 w-4 text-gray-500" />;
      case "email":
        return <Mail className="h-4 w-4 text-gray-500" />;
      case "phone":
        return <Phone className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <SectionBoxWrapper>
      <div className="space-y-6">
        <div>
          <Label className="text-lg font-semibold text-gray-800">
            References
          </Label>
          <p className="text-xs text-gray-500">
            Add people who can professionally vouch for your work or character.
          </p>
        </div>

        <div className="space-y-8">
          {references.map((ref) => (
            <div
              key={ref.id}
              className="bg-gray-100 p-4 rounded-md space-y-4 shadow-sm relative z-0"
            >
              <div className="flex justify-between items-start absolute top-1 right-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeItem("references", ref.id)}
                >
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </Button>
              </div>

              {referencesFields.map((field) => {
                const icon = getIcon(field.id);
                const value =
                  (ref[field.id as keyof typeof ref] as string) ?? "";

                return (
                  <div key={field.id} className="space-y-1">
                    <Label>{field.label}</Label>
                    {icon ? (
                      <InputGroup className="bg-white overflow-hidden">
                        <InputGroupInput
                          id={`${field.id}-${ref.id}`}
                          placeholder={field.placeholder}
                          value={value}
                          className="bg-white"
                          onChange={(e) =>
                            setItemField(
                              "references",
                              ref.id,
                              field.id as keyof typeof ref,
                              e.target.value
                            )
                          }
                        />
                        <InputGroupAddon>{icon}</InputGroupAddon>
                      </InputGroup>
                    ) : (
                      <Input
                        id={`${field.id}-${ref.id}`}
                        placeholder={field.placeholder}
                        value={value}
                        className="bg-white"
                        onChange={(e) =>
                          setItemField(
                            "references",
                            ref.id,
                            field.id as keyof typeof ref,
                            e.target.value
                          )
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button onClick={() => addItem("references")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Reference
          </Button>
        </div>
      </div>
    </SectionBoxWrapper>
  );
};

export default References;
