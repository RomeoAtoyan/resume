"use client";

import { useRef } from "react";
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
import { Briefcase, Mail, MapPin, Phone, Upload, Trash2 } from "lucide-react";
import SectionBoxWrapper from "./section-box-wrapper";

const PersonalInfo = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setField, profileImage, setProfileImage, ...cv } = useCvDataStore();

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setProfileImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setProfileImage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
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

      <div className="space-y-4 mt-4">
        <Label>Profile Image</Label>
        <div className="flex flex-col items-start">
          <div className="relative group">
            <Avatar className="h-20 w-20 border mb-4">
              <AvatarImage
                className="object-cover"
                src={profileImage || null || undefined}
                alt="Profile Image"
              />
              <AvatarFallback>
                {cv.fullName
                  ? cv.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  : "?"}
              </AvatarFallback>
            </Avatar>

            {profileImage && (
              <div className="flex items-center justify-center gap-2 rounded-full">
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-xs px-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="text-xs px-2"
                  onClick={handleRemoveImage}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>

          {!profileImage && (
            <Button
              variant="outline"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>Upload image</span>
            </Button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
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
                <InputGroup className="bg-white overflow-hidden">
                  <InputGroupInput
                    id={field.id}
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(e) =>
                      setField(field.id as keyof typeof cv, e.target.value)
                    }
                    className="bg-white"
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
                className="bg-white"
              />
            </div>
          );
        })}
      </div>
    </SectionBoxWrapper>
  );
};

export default PersonalInfo;
