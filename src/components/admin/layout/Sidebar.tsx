"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavigation } from "../../../lib/constants/adminNavigation";

export default function Sidebar(): React.JSX.Element {
  const pathname = usePathname();

  return (
  <aside className="hidden xl:flex xl:w-72 xl:flex-col xl:sticky xl:top-0 xl:h-screen border-r border-yellow-600/20 bg-[#0B0B0B]">
      {/* Logo */}
      <div className="border-b border-yellow-600/20 px-3 py-6 lg:px-6">
        {/* Mobile / Tablet */}
        <div className="flex justify-center lg:hidden">
          <span className="text-2xl font-bold text-yellow-500">☰</span>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          <h1 className="text-2xl font-bold tracking-wider text-yellow-500">
            ZASHAM
          </h1>

          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-gray-400">
            Enterprises
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 lg:px-4 py-6">
        <ul className="space-y-2">
          {adminNavigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-center lg:justify-start gap-3 rounded-xl border-l-4 px-3 lg:px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
                      : "border-transparent text-gray-300 hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400"
                  }`}
                >
                  <Icon size={20} />

                  <span className="hidden lg:block font-medium">
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-yellow-600/20 p-4">
        <p className="hidden lg:block text-center text-xs text-gray-500">
          © 2026 Zasham Enterprises
        </p>
      </div>
    </aside>
  );
}