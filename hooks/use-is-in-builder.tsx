"use client";

import { usePathname } from "next/navigation";

export const useIsInBuilder = () => {
  const pathname = usePathname();
  return pathname?.startsWith("/builder/");
};
