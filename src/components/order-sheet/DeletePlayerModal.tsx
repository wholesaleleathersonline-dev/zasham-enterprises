"use client";

import { useState } from "react";

import { deletePlayer } from "../../services/player.service";
import OrderSheetStatusModal from "./OrderSheetStatusModal";

interface Props {
  player: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeletePlayerModal({
  player,
  isOpen,
  onClose,
  onSuccess,
}: Props) {

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

const [modalType, setModalType] = useState<"success" | "error">("success");

const [modalTitle, setModalTitle] = useState("");

const [modalMessage, setModalMessage] = useState("");

  if (!isOpen || !player) return null;


 async function handleDelete() {
  try {
    setLoading(true);

    await deletePlayer(player.id);

    setModalType("success");
    setModalTitle("Player Deleted");
    setModalMessage("Player has been removed successfully.");
    setModalOpen(true);

  } catch (error) {
    console.error(error);

    setModalType("error");
    setModalTitle("Delete Failed");
    setModalMessage("Failed to delete player.");
    setModalOpen(true);

  } finally {
    setLoading(false);
  }
}


  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4">

      <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#181818] p-6 shadow-2xl">

        <div className="text-center">

          <div className="mb-5 text-5xl">
            ⚠️
          </div>


          <h2 className="text-2xl font-bold text-red-400">
            Delete Player?
          </h2>


          <p className="mt-3 text-gray-400">
            Are you sure you want to remove
            <span className="mx-1 font-semibold text-white">
              {player.player_name}
            </span>
            from this team?
          </p>


          <div className="mt-8 flex gap-3">

            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl border border-gray-700 py-3 font-semibold text-white transition hover:border-gray-500"
            >
              Cancel
            </button>


            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-400 disabled:opacity-60"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>

          </div>

        </div>

      </div>

<OrderSheetStatusModal
  isOpen={modalOpen}
  type={modalType}
  title={modalTitle}
  message={modalMessage}
  onClose={() => {
  setModalOpen(false);

  if (modalType === "success") {
    onClose();
    onSuccess();
    }
  }}
/>


    </div>
  );
}