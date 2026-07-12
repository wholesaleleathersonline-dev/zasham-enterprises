"use client";

import { FaTrashAlt } from "react-icons/fa";

import BaseModal from "./BaseModal";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  onConfirm,
  onClose,
}: ConfirmModalProps): React.JSX.Element {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex justify-center">
        <div
          className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            border
            border-red-500/30
            bg-red-500/10
          "
        >
          <FaTrashAlt
            size={38}
            className="text-red-500"
          />
        </div>
      </div>

      <h2 className="mt-8 text-center text-3xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-4 text-center leading-7 text-gray-300">
        {message}
      </p>
            <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="
            flex-1
            rounded-2xl
            border
            border-yellow-500/20
            bg-[#222222]
            py-4
            font-semibold
            text-white
            transition-all
            duration-300
            hover:border-yellow-500
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {cancelText}
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className="
            flex-1
            rounded-2xl
            bg-red-500
            py-4
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-red-600
            hover:shadow-[0_0_30px_rgba(239,68,68,.35)]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isLoading ? "Please wait..." : confirmText}
        </button>
      </div>
    </BaseModal>
  );
}