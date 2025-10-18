"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

const SectionBoxWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    className="p-6 space-y-6 overflow-x-hidden h-full"
    initial={{ opacity: 0, x: -60 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{
      duration: 1.3,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {children}
  </motion.div>
);

export default SectionBoxWrapper;
