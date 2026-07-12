"use client";

import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Topbar(): React.JSX.Element {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-yellow-600/20 bg-[#111111] px-8">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          {currentDate}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <button
          type="button"
          className="rounded-full p-3 text-gray-300 transition hover:bg-yellow-500/10 hover:text-yellow-400"
        >
          <FaBell size={18} />
        </button>

        <div className="flex items-center gap-3">
          <FaUserCircle
            size={36}
            className="text-yellow-500"
          />

          <div className="hidden sm:block">
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