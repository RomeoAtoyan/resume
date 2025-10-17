"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { User } from "@prisma/client";
import { Mail, Pencil, Save, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const AccountInfo = ({ user }: { user: User }) => {
  const { name, email, image } = user;
  const [editMode, setEditMode] = useState<boolean>(false);

  const fields = [
    {
      id: "fullName",
      label: "Full Name",
      value: name || "",
      placeholder: "Enter your name",
      icon: <UserIcon className="h-4 w-4 text-gray-500" />,
    },
    {
      id: "email",
      label: "Email",
      value: email || "",
      placeholder: "Enter your email",
      icon: <Mail className="h-4 w-4 text-gray-500" />,
    },
  ];

  return (
    <>
      <Card className="border shadow-sm">
        <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6">
          <div className="flex items-center gap-4">
            <div className="relative inline-block">
              <Avatar className="h-[90px] w-[90px]">
                {image && <AvatarImage src={image} alt="Profile" />}
                <AvatarFallback className="bg-gray-200 text-gray-600 font-medium">
                  RA
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-sm cursor-pointer hover:bg-gray-50 transition">
                <Pencil className="w-3.5 h-3.5 text-gray-600" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
              <p className="text-sm text-gray-500">Front-End Developer</p>
              <p className="text-sm text-gray-400">Antwerp, Belgium</p>
            </div>
          </div>

          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-300 hover:bg-gray-100"
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      <Card className="border shadow-sm mt-6">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Personal Information
            </h2>
            <Button
              onClick={() => setEditMode(!editMode)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-gray-300 hover:bg-gray-100"
            >
              <Pencil className="h-3.5 w-3.5" />
              {editMode ? "Cancel" : "Edit"}
            </Button>
          </div>

          <Separator />

          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.id} className="flex flex-col gap-1.5">
                <Label className="text-sm">{field.label}</Label>
                <InputGroup className="bg-white overflow-hidden">
                  <InputGroupInput
                    id={field.id}
                    disabled={!editMode}
                    value={field.value}
                    placeholder={field.placeholder}
                    className="bg-white"
                  />
                  <InputGroupAddon>{field.icon}</InputGroupAddon>
                </InputGroup>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end mt-6">
        <Button disabled={!editMode} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save
        </Button>
      </div>
    </>
  );
};

export default AccountInfo;
