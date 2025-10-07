import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PersonalInfo = () => {
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

      <div className="space-y-1">
        <Label>Full name</Label>
        <Input type="text" id="fullName" placeholder="Full name" />
      </div>

      <div className="space-y-1">
        <Label>Job title</Label>
        <Input type="text" id="jobTitle" placeholder="Job Title" />
      </div>

      <div className="space-y-1">
        <Label>Email</Label>
        <Input type="text" id="email" placeholder="Email" />
      </div>

      <div className="space-y-1">
        <Label>Phone number</Label>
        <Input type="text" id="phoneNumber" placeholder="Phone number" />
      </div>

      <div className="space-y-1">
        <Label>Address</Label>
        <Input type="text" id="address" placeholder="Address" />
      </div>
    </div>
  );
};

export default PersonalInfo;
