"use client";

import { FaCheckCircle } from "react-icons/fa";

import BaseModal from "./BaseModal";

interface SuccessModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function SuccessModal({
  isOpen,
  title,
  message,
  onClose,
}: SuccessModalProps): React.JSX.Element {
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
            border-yellow-500/30
            bg-yellow-500/10
          "
        >
          <FaCheckCircle
            size={42}
            className="text-yellow-500"
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
          bg-yellow-500
          py-4
          font-semibold
          text-black
          transition-all
          duration-300
          hover:bg-yellow-400
          hover:shadow-[0_0_30px_rgba(234,179,8,.35)]
        "
      >
        Continue
      </button>
    </BaseModal>
  );
}