"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface PageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  backHref = "/admin/dashboard",
  action,
}: PageHeaderProps): React.JSX.Element {
  return (
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      {/* Left */}
      <div>
        <Link
          href={backHref}
          className="group mb-6 inline-flex items-center gap-2 rounded-xl border-2 border-yellow-500/40 bg-white/5 px-5 py-2.5 text-sm font-semibold text-yellow-400 backdrop-blur-md transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-500 hover:text-black hover:shadow-[0_0_30px_rgba(234,179,8,0.45)] active:scale-95"
        >
          <FaArrowLeft
            size={13}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          <span>Back to Dashboard</span>
        </Link>

        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-zinc-400">
            {description}
          </p>
        )}
      </div>

      {/* Right Action */}
      {action && (
        <div className="flex items-center">
          {action}
        </div>
      )}
    </div>
  );
}