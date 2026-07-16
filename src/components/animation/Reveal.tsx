"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { fadeUp } from "../../lib/animations";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export default function Reveal({
  children,
  className = "",
}: RevealProps) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.15,
    margin: "0px 0px -10% 0px",
  });

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeUp}
      initial="hidden"
      animate={controls}
    >
      {children}
    </motion.div>
  );
}