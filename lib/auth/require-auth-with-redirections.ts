import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getSessionServer } from "@/lib/auth/get-session-server";
import { ROUTES } from "@/constants/routes";

export const requireAuthWithRedirections = async () => {
  const session = await getSessionServer();
  const headerList = await headers();
  const pathname = headerList.get("x-current-path") || "/";
  const isDev = process.env.NODE_ENV === "development";
  // ONLY FOR DEVELOPMENT: when set, treat as authenticated locally
  const devUserId = process.env.DEV_USER_ID;

  if (
    !session?.user?.id &&
    !pathname.startsWith("/auth") &&
    !(isDev && devUserId)
  ) {
    redirect(ROUTES.AUTH);
  }

  if (
    (session?.user?.id || (isDev && devUserId)) &&
    pathname.startsWith("/auth")
  ) {
    redirect(ROUTES.DASHBOARD);
  }

  return session;
};
