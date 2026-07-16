"use client";

import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F0F0F]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.35,
          ease: "easeInOut",
        },
      }}
    >
      <div className="flex flex-col items-center gap-8">

        {/* Logo / Brand */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl font-extrabold tracking-[0.35em] text-[#D4AF37]"
        >
          ZASHAM
        </motion.h1>

        {/* Progress Line */}
        <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-[#D4AF37]"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </div>

      </div>
    </motion.div>
  );
}