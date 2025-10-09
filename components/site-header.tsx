import { Spinner } from "@/components/ui/spinner";
import { getUser } from "@/lib/auth/get-user";
import NavLogo from "./nav-logo";
import SiteHeaderProfile from "./site-header-profile";

export const SiteHeader = async () => {
  const user = await getUser();
  return (
    <header className="w-full border-b border-gray-200 bg-white overflow-hidden">
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

        {user && (
          <div className="flex items-center gap-3">
            <SiteHeaderProfile user={user} />
          </div>
        )}
      </div>
    </header>
  );
};
