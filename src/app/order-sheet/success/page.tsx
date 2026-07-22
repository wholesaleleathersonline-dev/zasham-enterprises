"use client";

import Link from "next/link";

export default function OrderSheetSuccessPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">

      <div className="w-full max-w-lg rounded-2xl border border-yellow-500/20 bg-[#181818] p-8 text-center shadow-xl">

        <div className="text-6xl">
          ✅
        </div>

        <h1 className="mt-5 text-3xl font-bold text-yellow-400">
          Order Sheet Submitted Successfully
        </h1>

        <p className="mt-4 text-gray-400">
          Your order sheet has been generated successfully.
          <br />
          PDF has been prepared for download.
        </p>

        <Link
          href="/order-sheet"
          className="mt-8 inline-block rounded-xl bg-yellow-500 px-8 py-3 font-semibold text-black transition hover:bg-yellow-400"
        >
          Create New Order Sheet
        </Link>

      </div>

    </main>
  );
}