"use client";

import Link from "next/link";
import { adminNavigation } from "../../../lib/constants/adminNavigation";

export default function Sidebar(): React.JSX.Element {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-yellow-600/20 bg-[#0B0B0B]">
      {/* Logo */}
      <div className="border-b border-yellow-600/20 px-6 py-6">
        <h1 className="text-2xl font-bold tracking-wider text-yellow-500">
          ZASHAM
        </h1>

        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-gray-400">
          Enterprises
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-2">
          {adminNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-300 transition-all duration-200 hover:bg-yellow-500/10 hover:text-yellow-400"
                >
                  <Icon size={18} />

                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-yellow-600/20 p-4">
        <p className="text-center text-xs text-gray-500">
          © 2026 Zasham Enterprises
        </p>
      </div>
    </aside>
  );
}