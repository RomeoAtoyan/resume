"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useCvDataStore } from "@/store/use-cv-data-store";
import { Briefcase, Mail, MapPin, Phone } from "lucide-react";
import SectionBoxWrapper from "./section-box-wrapper";

const PersonalInfo = () => {
  const { setField, ...cv } = useCvDataStore();

  const fields = [
    { id: "fullName", label: "Full name", placeholder: "Full name" },
    { id: "jobTitle", label: "Job title", placeholder: "Job title" },
    { id: "email", label: "Email", placeholder: "Email" },
    { id: "phoneNumber", label: "Phone number", placeholder: "Phone number" },
    { id: "address", label: "Address", placeholder: "Address" },
  ] as const;

  const getIcon = (id: string) => {
    switch (id) {
      case "email":
        return <Mail className="h-4 w-4 text-gray-500" />;
      case "phoneNumber":
        return <Phone className="h-4 w-4 text-gray-500" />;
      case "address":
        return <MapPin className="h-4 w-4 text-gray-500" />;
      case "jobTitle":
        return <Briefcase className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <SectionBoxWrapper>
      <div>
        <Label className="text-lg font-semibold text-gray-800">
          Personal Information
        </Label>
        <p className="text-xs text-gray-500">
          Provide your basic personal details such as name, job title, and
          contact information. This helps employers identify and reach you
          easily.
        </p>
      </div>

      <div className="space-y-4">
        <Label>Upload your profile image</Label>
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://github.com/evilrabbit.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Button variant="outline">Upload image</Button>
      </div>

      <div className="space-y-4 mt-6">
        {fields.map((field) => {
          const icon = getIcon(field.id);
          const rawValue = cv[field.id as keyof typeof cv];
          const value = typeof rawValue === "string" ? rawValue : "";

          if (icon) {
            return (
              <div key={field.id} className="space-y-1">
                <Label>{field.label}</Label>
                <InputGroup>
                  <InputGroupInput
                    id={field.id}
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(e) =>
                      setField(field.id as keyof typeof cv, e.target.value)
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
                onChange={(e) =>
                  setField(field.id as keyof typeof cv, e.target.value)
                }
              />
            </div>
          );
        })}
      </div>
    </SectionBoxWrapper>
  );
};

export default PersonalInfo;
