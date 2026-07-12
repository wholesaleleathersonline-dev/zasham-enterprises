"use client";

import { FaExclamationTriangle } from "react-icons/fa";

import BaseModal from "./BaseModal";

interface ErrorModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function ErrorModal({
  isOpen,
  title,
  message,
  onClose,
}: ErrorModalProps): React.JSX.Element {
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
          <FaExclamationTriangle
            size={40}
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
            <button
        type="button"
        onClick={onClose}
        className="
          mt-8
          w-full
          rounded-2xl
          bg-red-500
          py-4
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-red-600
          hover:shadow-[0_0_30px_rgba(239,68,68,.35)]
        "
      >
        Close
      </button>
    </BaseModal>
  );
}