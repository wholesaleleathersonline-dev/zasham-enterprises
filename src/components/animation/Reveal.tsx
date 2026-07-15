"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeUp } from "../../lib/animations";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export default function Reveal({
  children,
  className = "",
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
}