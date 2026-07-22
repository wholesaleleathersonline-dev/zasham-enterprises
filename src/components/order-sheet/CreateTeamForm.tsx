"use client";

import { useState } from "react";
import Link from "next/link";

import { createOrderSheet } from "../../services/order-sheet.service";

export default function CreateTeamForm() {
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);

  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const [copied, setCopied] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!teamName.trim()) {
      alert("Please enter team name.");
      return;
    }

    try {
      setLoading(true);

      const order = await createOrderSheet({
        team_name: teamName,
      });

      setCreatedOrder(order);
      setTeamName("");
   } catch (error: any) {
  console.error(error);

  alert(error.message || JSON.stringify(error));
} finally {
  setLoading(false);
}
  }

  async function copy(text: string, type: string) {
    await navigator.clipboard.writeText(text);

    setCopied(type);

    setTimeout(() => {
      setCopied("");
    }, 2000);
  }

  if (createdOrder) {
    const playerLink = `${window.location.origin}/order-sheet/${createdOrder.order_code}`;

    const captainLink = `${window.location.origin}/order-sheet/manage/${createdOrder.order_code}?token=${createdOrder.manage_token}`;

    return (
      <div className="w-full max-w-3xl rounded-2xl border border-yellow-500/20 bg-[#181818] p-6 shadow-xl sm:p-8">
        <h1 className="text-center text-3xl font-bold text-yellow-400">
          ✅ Team Created Successfully
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Share the Player Link with your team. Keep the Captain Dashboard link
          private.
        </p>

        {/* Player Link */}

        <div className="mt-8 rounded-xl border border-yellow-500/20 bg-[#111] p-5">
          <h2 className="text-xl font-bold text-yellow-400">
            👥 Player Link
          </h2>

          <p className="mt-3 break-all text-sm text-gray-300">
            {playerLink}
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => copy(playerLink, "player")}
              className="flex-1 rounded-xl bg-yellow-500 py-3 font-semibold text-black transition hover:bg-yellow-400"
            >
              {copied === "player" ? "Copied!" : "Copy Link"}
            </button>

            <Link
              href={`/order-sheet/${createdOrder.order_code}`}
              target="_blank"
              className="flex-1 rounded-xl border border-yellow-500 py-3 text-center font-semibold text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
            >
              Open
            </Link>
          </div>
        </div>

        {/* Captain Link */}

        <div className="mt-6 rounded-xl border border-yellow-500/20 bg-[#111] p-5">
          <h2 className="text-xl font-bold text-yellow-400">
            👑 Captain Dashboard
          </h2>

          <p className="mt-3 break-all text-sm text-gray-300">
            {captainLink}
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => copy(captainLink, "captain")}
              className="flex-1 rounded-xl bg-yellow-500 py-3 font-semibold text-black transition hover:bg-yellow-400"
            >
              {copied === "captain" ? "Copied!" : "Copy Link"}
            </button>

            <Link
              href={`/order-sheet/manage/${createdOrder.order_code}?token=${createdOrder.manage_token}`}
              target="_blank"
              className="flex-1 rounded-xl border border-yellow-500 py-3 text-center font-semibold text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
            >
              Open Dashboard
            </Link>
          </div>
        </div>

        <button
          onClick={() => setCreatedOrder(null)}
          className="mt-8 w-full rounded-xl border border-gray-700 py-3 font-semibold text-white transition hover:border-yellow-500 hover:text-yellow-400"
        >
          Create Another Team
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg rounded-2xl border border-yellow-500/20 bg-[#181818] p-8 shadow-xl">
      <h1 className="text-center text-3xl font-bold text-yellow-400">
        Create Order Sheet
      </h1>

      <p className="mt-2 text-center text-gray-400">
        Enter your team name to create an order sheet.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Team Name
          </label>

          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Texas Wildcats"
            className="w-full rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-yellow-500 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Team"}
        </button>
      </form>
    </div>
  );
}