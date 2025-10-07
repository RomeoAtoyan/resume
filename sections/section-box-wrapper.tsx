import React, { ReactNode } from "react";

const SectionBoxWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="p-6 space-y-6">{children}</div>;
};

export default SectionBoxWrapper;
