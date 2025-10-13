import { getUser } from "@/lib/auth/get-user";
import AutoSaveStatus from "./autosave-status";
import NavLogo from "./nav-logo";
import SiteHeaderProfile from "./site-header-profile";

export const SiteHeader = async () => {
  const user = await getUser();

  return (
    <header className="w-full border-b border-gray-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <NavLogo />
        </div>

        <AutoSaveStatus />

        {user && (
          <div className="flex items-center gap-3">
            <SiteHeaderProfile user={user} />
          </div>
        )}
      </div>
    </header>
  );
};
