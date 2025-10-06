import { Separator } from "@/components/ui/separator";
import NavLogo from "./nav-logo";

export function SiteHeader() {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <NavLogo />
      </div>
    </header>
  );
}
