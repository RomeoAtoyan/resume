import AccountInfo from "@/components/account-info";
import { ROUTES } from "@/constants/routes";
import { getUser } from "@/lib/auth/get-user";
import React from "react";

const Account = async () => {
  const user = await getUser({ redirectTo: ROUTES.AUTH });
  return (
    <div className="w-full flex flex-col items-center min-h-[calc(100vh-65px)] bg-gray-50">
      <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">My Profile</h1>
          <p className="text-sm text-gray-500">
            Manage your personal information and preferences
          </p>
        </div>

        {user && <AccountInfo user={user} />}
      </div>
    </div>
  );
};

export default Account;
