"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { adminNavigation } from "../../../lib/constants/adminNavigation";

export default function MobileSidebar(): React.JSX.Element {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="flex h-16 items-center border-b border-yellow-600/20 bg-[#0B0B0B] px-4 xl:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-yellow-500"
        >
          <FaBars size={22} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 xl:hidden"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-[#0B0B0B] transition-transform duration-300 xl:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-yellow-600/20 p-5">
          <h2 className="text-xl font-bold text-yellow-500">
            ZASHAM
          </h2>

          <button
            type="button"
            onClick={() => setOpen(false)}
          >
            <FaTimes className="text-white" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {adminNavigation.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl border-l-4 px-4 py-3 transition ${
                      active
                        ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
                        : "border-transparent text-gray-300 hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}