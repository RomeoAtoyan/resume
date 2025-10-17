"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/lib/actions/profile/update-user";
import { getInitials } from "@/lib/helpers/get-initials";
import type { User } from "@prisma/client";
import { Mail, Pencil, Save, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AccountInfo = ({ user }: { user: User }) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedName, setUpdatedName] = useState(user.name ?? "");
  const [updatedEmail, setUpdatedEmail] = useState(user.email ?? "");

  const fields = [
    {
      id: "name",
      label: "Full Name",
      value: updatedName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUpdatedName(e.target.value),
      placeholder: "Enter your name",
      icon: <UserIcon className="h-4 w-4 text-gray-400" />,
    },
    {
      id: "email",
      label: "Email",
      value: updatedEmail,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUpdatedEmail(e.target.value),
      placeholder: "Enter your email",
      icon: <Mail className="h-4 w-4 text-gray-400" />,
    },
  ];

  const saveUser = async () => {
    try {
      setLoading(true);
      await updateUser({
        id: user.id,
        name: updatedName,
        email: updatedEmail,
      });
      setEditMode(false);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white border rounded-2xl shadow-sm p-6 sm:p-8 space-y-8 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <Avatar className="h-[100px] w-[100px] border shadow-sm">
              {user.image && <AvatarImage src={user.image} alt="Profile" />}
              <AvatarFallback className="bg-gray-100 text-gray-600 text-xl font-semibold">
                {getInitials(user.name ?? "JD")}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={() => setEditMode(true)}
              className="absolute bottom-1 right-1 bg-white border rounded-full p-1 hover:bg-gray-50 shadow-sm"
            >
              <Pencil className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {user.name || "Unnamed User"}
            </h2>
            <p className="text-gray-500 text-sm">
              {user.email || "No email provided"}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {editMode ? (
            <>
              <Button
                onClick={() => setEditMode(false)}
                variant="outline"
                size="sm"
                className="border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                onClick={saveUser}
                disabled={loading}
                size="sm"
                className="flex items-center gap-2"
              >
                {loading ? (
                  <span className="animate-pulse">Saving...</span>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setEditMode(true)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-gray-300 hover:bg-gray-100"
            >
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Editable Fields */}
      <div className="grid sm:grid-cols-2 gap-6 mt-4">
        {fields.map((field) => (
          <div key={field.id} className="flex flex-col gap-2">
            <Label
              htmlFor={field.id}
              className="text-sm font-medium text-gray-700"
            >
              {field.label}
            </Label>
            <InputGroup className="overflow-hidden bg-white">
              <InputGroupInput
                id={field.id}
                disabled={!editMode}
                value={field.value}
                onChange={field.onChange}
                placeholder={field.placeholder}
                className={`${
                  editMode ? "focus:ring-2 focus:ring-blue-500" : ""
                }`}
              />
              <InputGroupAddon>{field.icon}</InputGroupAddon>
            </InputGroup>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccountInfo;
