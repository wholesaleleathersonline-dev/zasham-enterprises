"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black px-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="flex w-full max-w-md flex-col items-center text-center"
      >
        {/* Brand */}
        <h1 className="text-2xl font-bold tracking-[0.35em] text-white sm:text-3xl md:text-4xl">
          ZASHAM ENTERPRISES
        </h1>

        <p className="mt-3 text-xs uppercase tracking-[0.25em] text-[#D4AF37] sm:text-sm">
          Customized Sportswear Manufacturer
        </p>

        {/* Loading Bar */}
        <div className="mt-10 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-[#D4AF37]"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}