import { headers } from "next/headers";

export const getPathname = async () => {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path") || "/";

  return pathname;
};
