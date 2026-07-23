"use client";

import { useState } from "react";

interface Props {
  isOpen: boolean;
  teamName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteOrderSheetModal({
  isOpen,
  teamName,
  onClose,
  onConfirm,
}: Props) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleDelete() {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#181818] p-6 shadow-2xl">

        <div className="text-center">

          <div className="mb-5 text-6xl">
            🗑️
          </div>

          <h2 className="text-2xl font-bold text-red-400">
            Delete Team?
          </h2>

          <p className="mt-4 text-gray-400 leading-7">
            You are about to permanently delete
            <br />
            <span className="font-bold text-white">
              {teamName}
            </span>
            <br /><br />
            This will remove:
          </p>

          <div className="mt-4 rounded-xl bg-[#111] p-4 text-left text-sm text-gray-300">
            <p>• Team Information</p>
            <p>• All Players</p>
            <p>• Captain Dashboard</p>
            <p>• Player Form</p>

            <p className="mt-4 font-semibold text-red-400">
              This action cannot be undone.
            </p>
          </div>

          <div className="mt-8 flex gap-3">

            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl border border-gray-700 py-3 font-semibold text-white hover:border-gray-500"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-500 disabled:opacity-60"
            >
              {loading ? "Deleting..." : "Delete Team"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}