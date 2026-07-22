"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevenueCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
}

export default function RevenueCard({
  title,
  value,
  icon,
  subtitle,
}: RevenueCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-400">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-zinc-500">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}