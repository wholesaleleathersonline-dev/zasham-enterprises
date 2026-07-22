"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBell,
  FaUserCircle,
  FaArrowLeft,
} from "react-icons/fa";

export default function Topbar(): React.JSX.Element {
  const pathname = usePathname();

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const pageTitles: Record<string, string> = {
    "/admin/dashboard": "Dashboard",
    "/admin/products": "Products",
    "/admin/invoices/create": "Create Invoice",
    "/admin/customers/create": "Add Customer",
    "/admin/revenue": "Revenue Stats",
    "/admin/settings": "Admin Settings",
  };

  const title = pageTitles[pathname] ?? "Admin Panel";
  const showBack = pathname !== "/admin/dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-yellow-600/20 bg-[#111111] px-8">
      {/* Left */}
      <div>
        

        <h1 className="text-2xl font-bold text-white">
          {title}
        </h1>

        <p className="mt-1 hidden text-sm text-gray-400 sm:block">
          {currentDate}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-6">
        <button
          type="button"
          className="rounded-full p-2 sm:p-3 text-gray-300 transition hover:bg-yellow-500/10 hover:text-yellow-400"
        >
          <FaBell size={18} />
        </button>

        <div className="flex items-center gap-3">
          <FaUserCircle
            size={34}
            className="text-yellow-500"
          />

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-white">
              Administrator
            </p>

            <p className="text-xs text-gray-400">
              Super Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}