"use client";

import AuthForm from "@/components/auth-form";
import MockResume from "@/components/mock-resume";
import NavLogo from "@/components/nav-logo";

const Page = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 overflow-hidden">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <NavLogo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <AuthForm />
        </div>
      </div>

      <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-blue-50">
        <MockResume />
      </div>
    </div>
  );
};

export default Page;
