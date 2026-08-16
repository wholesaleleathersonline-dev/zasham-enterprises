"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import A4StickerSheet from "../../../../../components/stickers/A4StickerSheet";

type Player = {
  id: string;
  number: string;
  playerName: string;
  topSize: string;
  bottomSize: string;
};

type StickerOrder = {
  id: string;
  orderCode: string;
  teamName: string;
  fileName: string | null;
  totalPlayers: number;
  createdAt: string;
  players: Player[];
};

type StickerOrderPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function StickerOrderDetailPage({
  params,
}: StickerOrderPageProps) {
  const [order, setOrder] =
    useState<StickerOrder | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");
    const [showStickers, setShowStickers] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const { id } = await params;

        const response = await fetch(
          `/api/stickers/orders/${id}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.error ||
              "Failed to load sticker order."
          );
        }

        setOrder(data.order);
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load sticker order."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [params]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
        <p className="text-sm text-white/40">
          Loading order...
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="space-y-5">
        <Link
          href="/admin/sticker-orders"
          className="text-sm text-yellow-500 hover:text-yellow-400"
        >
          ← Back to Sticker Orders
        </Link>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
          {error || "Order not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <Link
            href="/admin/sticker-orders"
            className="text-sm text-white/40 transition hover:text-yellow-400"
          >
            ← Back to Sticker Orders
          </Link>

          <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-yellow-500">
            Zasham Enterprises
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-white">
            {order.orderCode}
          </h1>

          <p className="mt-2 text-sm text-white/45">
            {order.teamName}
          </p>
        </div>

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.04] px-5 py-4 lg:text-right">
          <p className="text-xs uppercase tracking-[0.15em] text-white/35">
            Total Players
          </p>

          <p className="mt-1 text-2xl font-semibold text-yellow-400">
            {order.players.length}
          </p>
        </div>

      </div>

      {/* Order Information */}
      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-xs uppercase tracking-wider text-white/35">
            Order Code
          </p>

          <p className="mt-2 font-semibold text-white">
            {order.orderCode}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-xs uppercase tracking-wider text-white/35">
            Team
          </p>

          <p className="mt-2 font-semibold text-white">
            {order.teamName}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-xs uppercase tracking-wider text-white/35">
            Saved
          </p>

          <p className="mt-2 font-semibold text-white">
            {new Date(
              order.createdAt
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

      </div>

      {/* Players */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">

        <div className="border-b border-white/10 bg-white/[0.03] px-5 py-4">
          <h2 className="font-semibold text-white">
            Player Data
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Saved player information for this order.
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[650px]">

            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/35">
                <th className="px-5 py-4">
                  #
                </th>

                <th className="px-5 py-4">
                  Player
                </th>

                <th className="px-5 py-4">
                  Top
                </th>

                <th className="px-5 py-4">
                  Bottom
                </th>
              </tr>
            </thead>

            <tbody>
              {order.players.map(
                (player, index) => (
                  <tr
                    key={player.id}
                    className="border-b border-white/10 last:border-b-0"
                  >
                    <td className="px-5 py-4 text-sm text-white/40">
                      {player.number || index + 1}
                    </td>

                    <td className="px-5 py-4 font-medium text-white">
                      {player.playerName}
                    </td>

                    <td className="px-5 py-4 text-sm text-white/60">
                      {player.topSize || "-"}
                    </td>

                    <td className="px-5 py-4 text-sm text-white/60">
                      {player.bottomSize || "-"}
                    </td>
                  </tr>
                )
              )}
            </tbody>

          </table>

        </div>
      </div>
{/* Generate Stickers */}
<div className="mt-8 w-full rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.03] p-5">

  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

    <div>
      <p className="text-sm font-semibold text-white">
        Sticker Generator
      </p>

      <p className="mt-1 text-xs text-white/40">
        Generate printable stickers from this saved order.
      </p>
    </div>

    <button
      type="button"
      onClick={() => setShowStickers((value) => !value)}
      className="
        w-full
        rounded-xl
        bg-yellow-500
        px-5
        py-3
        text-sm
        font-semibold
        text-black
        transition
        hover:bg-yellow-400
        sm:w-auto
      "
    >
      {showStickers
        ? "Hide Sticker Sheets"
        : "Generate Stickers Again"}
    </button>

  </div>

</div>

{/* Sticker Sheets */}
{showStickers && (
  <div className="w-full">
    <A4StickerSheet
      teamName={order.teamName}
      players={order.players.map((player) => ({
        number: player.number,
        playerName: player.playerName,
        topSize: player.topSize,
        bottomSize: player.bottomSize,
      }))}
    />
  </div>
)}

    </div>
  );
}