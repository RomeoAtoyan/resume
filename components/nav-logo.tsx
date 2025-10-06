import { File } from "lucide-react";
import React from "react";

const NavLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="size-8 bg-blue-400 flex items-center justify-center rounded-sm">
        <File color="white" size={20} />
      </div>
      <span className="font-semibold text-xl">Builder</span>
    </div>
  );
};

export default NavLogo;
