"use client";

import { AnimatePresence, motion } from "framer-motion";

interface DeletePriceItemModalProps {
  isOpen: boolean;
  itemName: string;
  loading: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

export default function DeletePriceItemModal({
  isOpen,
  itemName,
  loading,
  onClose,
  onDelete,
}: DeletePriceItemModalProps): React.JSX.Element {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl border border-red-500/20 bg-[#111111] shadow-[0_0_80px_rgba(255,0,0,.12)]"
          >
            <div className="border-b border-red-500/20 px-8 py-6">

              <h2 className="text-2xl font-bold text-white">
                Delete Price Item
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                This action cannot be undone.
              </p>

            </div>

            <div className="px-8 py-8">

              <p className="text-gray-300">
                Are you sure you want to delete
              </p>

              <h3 className="mt-3 text-xl font-semibold text-red-400">
                {itemName}
              </h3>

            </div>

                        <div className="flex justify-end gap-4 border-t border-red-500/20 px-8 py-6">

              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-xl border border-white/10 px-6 py-3 font-medium text-white transition hover:bg-white/5 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onDelete}
                disabled={loading}
                className="rounded-xl bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}