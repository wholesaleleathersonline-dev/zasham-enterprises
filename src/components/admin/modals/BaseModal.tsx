"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BaseModal({
  isOpen,
  onClose,
  children,
}: BaseModalProps): React.JSX.Element | null {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.body.style.overflow = "hidden";

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen, onClose]);

  if (typeof window === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
        >
          <motion.div
            onClick={(event) =>
              event.stopPropagation()
            }
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            transition={{
              duration: 0.35,
            }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-yellow-500/30 bg-[#161616] p-8 shadow-[0_0_60px_rgba(234,179,8,.15)]"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 rounded-full border border-yellow-500/20 p-2 text-gray-400 transition hover:border-yellow-500 hover:text-yellow-500"
            >
              <FaTimes />
            </button>

            {children}
                      </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}