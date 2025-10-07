import { Spinner } from "@/components/ui/spinner";
import NavLogo from "./nav-logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export const SiteHeader = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <NavLogo />

          <nav className="flex items-center text-sm text-gray-500">
            <span className="cursor-pointer hover:text-black">Dashboard</span>
            <span className="mx-2">/</span>
            <span className="text-black">Create resume</span>
          </nav>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Spinner />
          <span>Saving your resume...</span>
        </div>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
