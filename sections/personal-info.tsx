import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCvDataStore } from "@/store/use-cv-data-store";

const PersonalInfo = () => {
  const { setField, ...cv } = useCvDataStore();

  const fields = [
    { id: "fullName", label: "Full name", placeholder: "Full name" },
    { id: "jobTitle", label: "Job title", placeholder: "Job Title" },
    { id: "email", label: "Email", placeholder: "Email" },
    { id: "phoneNumber", label: "Phone number", placeholder: "Phone number" },
    { id: "address", label: "Address", placeholder: "Address" },
  ] as const;

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <Label>Upload your profile image</Label>
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://github.com/evilrabbit.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Button>Upload image</Button>
      </div>

      {fields.map((field) => (
        <div key={field.id} className="space-y-1">
          <Label>{field.label}</Label>
          <Input
            onChange={(e) => setField(field.id, e.target.value)}
            value={cv[field]}
            type="text"
            id={field.id}
            placeholder={field.placeholder}
          />
        </div>
      ))}
    </div>
  );
};

export default PersonalInfo;
