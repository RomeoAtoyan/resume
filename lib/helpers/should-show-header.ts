"use client";

import { usePathname } from "next/navigation";

export function shouldHideHeader() {
  const pathname = usePathname();

  const hiddenRoutes = ["/authentication"];

  const dynamicHiddenPatterns = [
    /^\/resume\/[^/]+$/, // e.g. /resume/123
  ];

  if (hiddenRoutes.includes(pathname)) return true;

  if (dynamicHiddenPatterns.some((pattern) => pattern.test(pathname))) {
    return true;
  }

  return false;
}
