"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";

interface OrderSheetStatusModalProps {
  isOpen: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
}

export default function OrderSheetStatusModal({
  isOpen,
  type,
  title,
  message,
  onClose,
}: OrderSheetStatusModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md rounded-3xl border border-[#C8A44D]/30 bg-[#181818] p-8 shadow-[0_0_40px_rgba(200,164,77,.25)]"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 text-gray-400 transition hover:text-white"
            >
              <FaTimes size={18} />
            </button>

            <div className="flex justify-center">
              {type === "success" ? (
                <FaCheckCircle
                  size={72}
                  className="text-green-400"
                />
              ) : (
                <FaExclamationTriangle
                  size={72}
                  className="text-red-400"
                />
              )}
            </div>

            <h2 className="mt-6 text-center text-2xl font-bold text-white">
              {title}
            </h2>

            <p className="mt-3 text-center text-gray-400">
              {message}
            </p>

            <button
              onClick={onClose}
              className="mt-8 w-full rounded-xl bg-[#C8A44D] py-3 font-semibold text-black transition hover:bg-[#d8b45d]"
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}