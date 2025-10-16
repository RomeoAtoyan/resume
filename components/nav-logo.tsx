import { ROUTES } from "@/constants/routes";
import { File } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavLogo = () => {
  return (
    <Link href={ROUTES.ROOT} className="flex items-center gap-2">
      <div className="size-8 bg-blue-400 flex items-center justify-center rounded-sm">
        <File color="white" size={20} />
      </div>
      <span className="font-semibold text-xl">Builder</span>
    </Link>
  );
};

export default NavLogo;
