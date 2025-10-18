"use client";

import { motion } from "framer-motion";
import { Skeleton } from "./ui/skeleton";

const MockResume = () => {
  const shimmer =
    "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent";

  return (
    <>
      <motion.div
        className="bg-white/90 backdrop-blur-md w-[370px] h-[570px] rounded-2xl shadow-xl border border-white/50 p-6 flex flex-col gap-4 relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="flex items-center gap-3 border-b pb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Skeleton className={`h-10 w-10 rounded-full ${shimmer}`} />
          <div className="flex-1 space-y-1.5">
            <Skeleton className={`h-3.5 w-3/4 ${shimmer}`} />
            <Skeleton className={`h-2.5 w-1/2 ${shimmer}`} />
          </div>
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Skeleton className={`h-3 w-1/3 ${shimmer}`} />
          <div className="space-y-1">
            <Skeleton className={`h-2.5 w-full ${shimmer}`} />
            <Skeleton className={`h-2.5 w-10/12 ${shimmer}`} />
            <Skeleton className={`h-2.5 w-9/12 ${shimmer}`} />
          </div>
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Skeleton className={`h-3 w-1/4 ${shimmer}`} />
          <div className="space-y-2">
            <Skeleton className={`h-2.5 w-full ${shimmer}`} />
            <Skeleton className={`h-2.5 w-5/6 ${shimmer}`} />
            <Skeleton className={`h-2.5 w-4/6 ${shimmer}`} />
          </div>
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Skeleton className={`h-3 w-1/4 ${shimmer}`} />
          <div className="space-y-2">
            <Skeleton className={`h-2.5 w-full ${shimmer}`} />
            <Skeleton className={`h-2.5 w-5/6 ${shimmer}`} />
            <Skeleton className={`h-2.5 w-4/6 ${shimmer}`} />
          </div>
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Skeleton className={`h-3 w-1/4 ${shimmer}`} />
          <div className="space-y-2">
            <Skeleton className={`h-2.5 w-full ${shimmer}`} />
            <Skeleton className={`h-2.5 w-5/6 ${shimmer}`} />
            <Skeleton className={`h-2.5 w-4/6 ${shimmer}`} />
          </div>
        </motion.div>

        <motion.div
          className="mt-auto space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <Skeleton className={`h-3 w-1/4 ${shimmer}`} />
          <motion.div
            className="grid grid-cols-3 gap-2"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {[...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                className={`h-3.5 w-full rounded-md ${shimmer}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MockResume;
