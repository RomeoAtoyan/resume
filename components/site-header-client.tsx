"use client";

import { User } from "@/types/user";
import SiteHeaderProfile from "./site-header-profile";
import AutoSaveStatus from "./autosave-status";
import NavLogo from "./nav-logo";
import clsx from "clsx";
import { useIsInBuilder } from "@/hooks/use-is-in-builder";
import { shouldHideHeader } from "@/lib/helpers/should-show-header";

const SiteHeaderClient = ({ user }: { user: User | null }) => {
  const isInBuilder = useIsInBuilder();
  const hideHeader = shouldHideHeader();

  return (
    <header
      className={clsx(
        "w-full border-b border-gray-200 overflow-hidden",
        !isInBuilder && "sticky top-0 z-50 bg-white",
        hideHeader && "hidden",
      )}
    >
      <div className={clsx("flex items-center justify-between px-6 py-3", !isInBuilder && "max-w-6xl mx-auto")}>
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

export default SiteHeaderClient;
