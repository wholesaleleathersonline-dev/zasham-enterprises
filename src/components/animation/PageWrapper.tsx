"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({
  children,
}: PageWrapperProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
     <motion.div
  key={pathname}
  className="min-h-screen bg-[#0F0F0F]"
  initial={{
    opacity: 0,
    scale: 0.98,
    filter: "blur(8px)",
  }}  
  animate={{
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  }}
  exit={{
    opacity: 0,
    scale: 1.02,
    filter: "blur(8px)",
  }}
  transition={{
    duration: 0.45,
    ease: "easeOut",
  }}
>
  {children}
</motion.div>
    </AnimatePresence>
  );
}