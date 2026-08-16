"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type StickerOrder = {
  id: string;
  order_code: string;
  team_name: string;
  file_name: string | null;
  total_players: number;
  created_at: string;
};

export default function StickerOrdersPage() {
  const [orders, setOrders] = useState<StickerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/stickers/orders", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Failed to load sticker orders."
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load sticker orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-yellow-500">
            Zasham Enterprises
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-white">
            Saved Sticker Orders
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-white/45">
            View previously saved sticker orders and their player data.
          </p>
        </div>

        <button
          type="button"
          onClick={loadOrders}
          disabled={loading}
          className="
            rounded-xl
            border
            border-yellow-500/30
            bg-yellow-500/10
            px-5
            py-2.5
            text-sm
            font-semibold
            text-yellow-400
            transition
            hover:bg-yellow-500/20
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading ? "Loading..." : "↻ Refresh"}
        </button>

      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
          <p className="text-sm text-white/40">
            Loading saved orders...
          </p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && orders.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
          <p className="text-lg font-semibold text-white">
            No Saved Orders
          </p>

          <p className="mt-2 text-sm text-white/40">
            Orders saved from the Sticker Generator will appear here.
          </p>
        </div>
      )}

      {/* Orders */}
      {!loading && orders.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">

          {/* Table Header */}
          <div
            className="
              hidden
              grid-cols-[1.2fr_1.5fr_100px_150px_120px]
              border-b
              border-white/10
              bg-white/[0.03]
              px-5
              py-4
              text-xs
              uppercase
              tracking-[0.15em]
              text-white/35
              md:grid
            "
          >
            <span>Order Code</span>
            <span>Team</span>
            <span>Players</span>
            <span>Date</span>
            <span>Action</span>
          </div>

          {/* Rows */}
          {orders.map((order) => (
            <div
              key={order.id}
              className="
                grid
                gap-4
                border-b
                border-white/10
                px-5
                py-5
                last:border-b-0
                md:grid-cols-[1.2fr_1.5fr_100px_150px_120px]
                md:items-center
              "
            >

              {/* Order Code */}
              <div>
                <p className="text-xs text-white/35 md:hidden">
                  Order Code
                </p>

                <p className="mt-1 font-semibold text-yellow-400 md:mt-0">
                  {order.order_code}
                </p>
              </div>

              {/* Team */}
              <div>
                <p className="text-xs text-white/35 md:hidden">
                  Team
                </p>

                <p className="mt-1 font-medium text-white md:mt-0">
                  {order.team_name || "Unknown Team"}
                </p>

                {order.file_name && (
                  <p className="mt-1 truncate text-xs text-white/30">
                    {order.file_name}
                  </p>
                )}
              </div>

              {/* Players */}
              <div>
                <p className="text-xs text-white/35 md:hidden">
                  Players
                </p>

                <p className="mt-1 text-sm text-white/70 md:mt-0">
                  {order.total_players}
                </p>
              </div>

              {/* Date */}
              <div>
                <p className="text-xs text-white/35 md:hidden">
                  Created
                </p>

                <p className="mt-1 text-sm text-white/50 md:mt-0">
                  {new Date(
                    order.created_at
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Action */}
              <div>
        <Link
  href={`/admin/sticker-orders/${order.id}`}
  className="
    inline-flex
    rounded-lg
    border
    border-yellow-500/30
    bg-yellow-500/10
    px-4
    py-2
    text-xs
    font-semibold
    text-yellow-400
    transition
    hover:bg-yellow-500/20
  "
>
  View Order
</Link>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}