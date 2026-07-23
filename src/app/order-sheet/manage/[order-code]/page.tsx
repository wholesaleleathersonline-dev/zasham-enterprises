"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import EditPlayerModal from "../../../../components/order-sheet/EditPlayerModal";
import DeletePlayerModal from "../../../../components/order-sheet/DeletePlayerModal";
import OrderSheetStatusModal from "../../../../components/order-sheet/OrderSheetStatusModal";
import { useRouter } from "next/navigation";


import DeleteOrderSheetModal from "../../../../components/order-sheet/DeleteOrderSheetModal";

import { deleteOrderSheet } from "../../../../services/order-sheet.service";
import {
  lockOrderSheet,
  unlockOrderSheet,
} from "../../../../services/order-sheet.service";

import {
  getManageOrderSheet,
} from "../../../../services/order-sheet.service";

import {
  getPlayers,
} from "../../../../services/player.service";

import PlayersList from "../../../../components/order-sheet/PlayersList";
import { exportOrderPDF } from "../../../../lib/export-order-pdf";

export default function CaptainDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const orderCode = params["order-code"] as string;
  const token = searchParams.get("token") || "";


  const [orderSheet, setOrderSheet] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<any>(null);
  const [deletingPlayer, setDeletingPlayer] = useState<any>(null);
  const [locking, setLocking] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

const [modalType, setModalType] = useState<"success" | "error">("success");

const [modalTitle, setModalTitle] = useState("");

const [modalMessage, setModalMessage] = useState("");


  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const order = await getManageOrderSheet(
        orderCode,
        token
      );

      setOrderSheet(order);

      const list = await getPlayers(order.id);

      setPlayers(list);
    } catch (error) {
      console.error(error);
      setUnauthorized(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleLockOrder() {
  if (!orderSheet) return;

  try {
    setLocking(true);

    if (orderSheet.is_locked) {
      await unlockOrderSheet(orderSheet.id);
    } else {
      await lockOrderSheet(orderSheet.id);
    }

    await loadData();

    setModalType("success");

setModalTitle("Success");

setModalMessage(
  orderSheet.is_locked
    ? "Order has been unlocked successfully."
    : "Order has been locked successfully."
);

setModalOpen(true);

 } catch (error) {
  console.error(error);

  setModalType("error");
  setModalTitle("Update Failed");
  setModalMessage("Failed to update order status.");
  setModalOpen(true);
} finally {
  setLocking(false);
}
}

async function handleDeleteOrderSheet() {
  if (!orderSheet) return;

  try {
    await deleteOrderSheet(orderSheet.id);

    setDeleteModalOpen(false);

    setModalType("success");
    setModalTitle("Team Deleted");
    setModalMessage(
      "Your team and all player records have been deleted successfully."
    );
    setModalOpen(true);

  } catch (error) {
    console.error(error);

    setDeleteModalOpen(false);

    setModalType("error");
    setModalTitle("Delete Failed");
    setModalMessage("Unable to delete this team. Please try again.");
    setModalOpen(true);
  }
}
    if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0F0F0F] px-4">
        <div className="w-full max-w-md rounded-2xl border border-yellow-500/20 bg-[#181818] p-8 text-center">
          <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent" />

          <h2 className="text-2xl font-bold text-yellow-400">
            Loading Dashboard...
          </h2>

          <p className="mt-2 text-gray-400">
            Please wait while we verify your access.
          </p>
        </div>
      </main>
    );
  }

  if (unauthorized || !orderSheet) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0F0F0F] px-4">
        <div className="w-full max-w-lg rounded-2xl border border-red-500/20 bg-[#181818] p-8 text-center">
          <div className="mb-5 text-6xl">🔒</div>

          <h1 className="text-3xl font-bold text-red-400">
            Unauthorized Access
          </h1>

          <p className="mt-4 text-gray-400">
            The dashboard link is invalid or has expired.
          </p>
        </div>
      </main>
    );
  }

  const playerLink = `${window.location.origin}/order-sheet/${orderSheet.order_code}`;

  return (
 <main className="min-h-screen bg-[#0F0F0F] px-4 pb-10 pt-48 sm:pt-48 md:pt-52 lg:pt-56 xl:pt-60">

     <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="rounded-2xl border border-yellow-500/20 bg-[#181818] p-5 shadow-xl sm:p-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="mb-2 text-sm uppercase tracking-widest text-yellow-500">
                Captain Dashboard
              </p>

              <button
  onClick={handleLockOrder}
  disabled={locking}
  className={`rounded-xl px-5 py-3 font-semibold transition ${
    orderSheet.is_locked
      ? "bg-green-500 text-black hover:bg-green-400 "
      : "bg-red-500 text-white hover:bg-red-400"
  }`}
>
  {locking
    ? "Updating..."
    : orderSheet.is_locked
    ? "🔓 Unlock Order"
    : "🔒 Lock Order"}
</button>

              <h1 className="break-words text-3xl font-bold text-white sm:text-4xl">
                {orderSheet.team_name}
              </h1>

              <p className="mt-2 text-gray-400">
                Order Code:{" "}
                <span className="font-semibold text-yellow-400">
                  {orderSheet.order_code}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

              <div className="rounded-xl bg-[#111] p-4 text-center">
                <p className="text-3xl font-bold text-yellow-400">
                  {players.length}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Players
                </p>
              </div>

              <div className="rounded-xl bg-[#111] p-4 text-center">
                <p className="text-3xl font-bold text-green-400">
                  {orderSheet.is_locked ? "Yes" : "No"}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Locked
                </p>
              </div>

              <div className="rounded-xl bg-[#111] p-4 text-center">
                <p className="truncate text-sm font-semibold text-yellow-400">
                  {orderSheet.order_code}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Order
                </p>
              </div>

              <div className="rounded-xl bg-[#111] p-4 text-center">
                <p className="text-lg font-bold text-yellow-400">
                  Active
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Status
                </p>
              </div>

            </div>

          </div>

        </div>
                {/* Quick Actions */}

        <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-[#181818] p-5 sm:p-6">

          <h2 className="mb-5 text-xl font-bold text-yellow-400">
            Quick Actions
          </h2>

          <div className="grid gap-4 lg:grid-cols-2">

            {/* Player Link */}

            <div className="rounded-xl border border-gray-700 bg-[#111] p-5">

              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
                Player Form Link
              </p>

              <p className="break-all text-sm text-white">
                {playerLink}
              </p>

              <button
                onClick={async () => {
  try {
    await navigator.clipboard.writeText(playerLink);

    setModalType("success");
    setModalTitle("Link Copied");
    setModalMessage("Player form link has been copied to your clipboard.");
    setModalOpen(true);
  } catch {
    setModalType("error");
    setModalTitle("Copy Failed");
    setModalMessage("Unable to copy the player link.");
    setModalOpen(true);
  }
}}
                className="mt-5 w-full rounded-xl bg-yellow-500 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                📋 Copy Player Link
              </button>
<button
 onClick={async () => {
  try {
    await exportOrderPDF(
      orderSheet.team_name,
      orderSheet.order_code,
      orderSheet.category,
      players
    );

    setModalType("success");
    setModalTitle("Order Submitted");
    setModalMessage(
      "Order sheet has been generated and submitted successfully."
    );
    setModalOpen(true);
  } catch (error) {
    console.error(error);

    setModalType("error");
    setModalTitle("Submission Failed");
    setModalMessage(
      "Failed to generate or submit the order sheet."
    );
    setModalOpen(true);
  }
}}
  className="mt-5 w-full rounded-xl bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-400"
>
  📄 Submit Order Sheet
</button>

            </div>

            {/* Lock Status */}

            <div className="rounded-xl border border-gray-700 bg-[#111] p-5">

              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
                Order Status
              </p>
             <button
  onClick={() => setDeleteModalOpen(true)}
  className="mt-4 w-full rounded-xl border border-red-500 bg-red-600 py-3 font-semibold text-white transition hover:bg-red-500"
>
  🗑 Delete Team
</button>

              <div className="mb-5">
                {orderSheet.is_locked ? (
                  <span className="rounded-lg bg-red-500/20 px-4 py-2 font-semibold text-red-400">
                    🔒 Locked
                  </span>
                ) : (
                  <span className="rounded-lg bg-green-500/20 px-4 py-2 font-semibold text-green-400">
                    ✅ Open
                  </span>
                )}
              </div>

             <button
  onClick={handleLockOrder}
  disabled={locking}
  className={`w-full rounded-xl py-3 font-semibold transition ${
    orderSheet.is_locked
      ? "bg-green-500 text-black hover:bg-green-400"
      : "bg-red-500 text-white hover:bg-red-400"
  }`}
>
  {locking
    ? "Updating..."
    : orderSheet.is_locked
    ? "🔓 Unlock Order"
    : "🔒 Lock Order"}
</button>

            </div>

          </div>

        </div>

        {/* Players */}
<PlayersList
  players={players}
  isCaptain
  onEdit={(player) => setEditingPlayer(player)}
  onDelete={(player) => setDeletingPlayer(player)}
/>

<EditPlayerModal
  player={editingPlayer}
  isOpen={!!editingPlayer}
  category={orderSheet.category}
  onClose={() => setEditingPlayer(null)}
  onSuccess={() => {
    setEditingPlayer(null);
    loadData();
  }}
/>
<DeletePlayerModal
  player={deletingPlayer}
  isOpen={!!deletingPlayer}
  onClose={() => setDeletingPlayer(null)}
  onSuccess={() => {
    setDeletingPlayer(null);
    loadData();
  }}
/>

<DeleteOrderSheetModal
  isOpen={deleteModalOpen}
  teamName={orderSheet.team_name}
  onClose={() => setDeleteModalOpen(false)}
  onConfirm={handleDeleteOrderSheet}
/>

      </div>

     <OrderSheetStatusModal
  isOpen={modalOpen}
  type={modalType}
  title={modalTitle}
  message={modalMessage}
  onClose={() => {
    setModalOpen(false);

    if (modalTitle === "Team Deleted") {
      router.push("/order-sheet/recover");
      router.refresh();
    }
  }}
/>
    </main>
  );
}