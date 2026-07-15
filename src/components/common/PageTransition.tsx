"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({
  children,
}: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="min-h-screen"
    >
      {children}
    </motion.main>
  );
}