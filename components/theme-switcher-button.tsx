import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeSwitcherButton = () => {
  const { setTheme, theme } = useTheme();
  return (
    <>
      {theme === "light" ? (
        <>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className="cursor-pointer"
          >
            <Moon className="size-4 text-gray-500" />
            Switch to Dark
          </DropdownMenuItem>
        </>
      ) : (
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer"
        >
          <Sun className="size-4 text-gray-500" />
          Switch to Light
        </DropdownMenuItem>
      )}
    </>
  );
};

export default ThemeSwitcherButton;
