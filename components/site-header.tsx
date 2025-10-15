import { getUser } from "@/lib/auth/get-user";
import SiteHeaderClient from "./site-header-client";

export const SiteHeader = async () => {
  const user = await getUser();

  return <SiteHeaderClient user={user} />;
};
