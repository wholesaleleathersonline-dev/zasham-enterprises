"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface PriceListFormData {
  section: string;
  item_name: string;
  price: string;
  moq: number;
  display_order: number;
  status: boolean;
}

interface PriceListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PriceListFormData) => Promise<void>;
  initialData?: PriceListFormData | null;
  mode: "create" | "edit";
}

const defaultData: PriceListFormData = {
  section: "Team Uniforms",
  item_name: "",
  price: "",
  moq: 10,
  display_order: 0,
  status: true,
};

export default function PriceListModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode,
}: PriceListModalProps): React.JSX.Element {
  const [formData, setFormData] =
    useState<PriceListFormData>(defaultData);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultData);
    }
  }, [initialData, isOpen]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const target = e.target;

    setFormData((prev) => ({
      ...prev,
      [target.name]:
        target instanceof HTMLInputElement
          ? target.type === "checkbox"
            ? target.checked
            : target.name === "display_order" ||
              target.name === "moq"
            ? Number(target.value)
            : target.value
          : target.value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      await onSave(formData);
      onClose();
    } finally {
      setLoading(false);
    }
  }

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
            className="w-full max-w-2xl rounded-3xl border border-[#C8A44D]/20 bg-[#111111] shadow-[0_0_80px_rgba(200,164,77,.18)]"
          >
            <div className="border-b border-[#C8A44D]/20 px-8 py-6">

              <h2 className="text-2xl font-bold text-white">
                {mode === "create"
                  ? "Add Price Item"
                  : "Edit Price Item"}
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Manage pricing displayed on your website.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-8"
            >

                <div className="grid gap-6 md:grid-cols-2">

  {/* Section */}

  <div>
    <label className="mb-2 block text-sm font-medium text-gray-300">
      Section
    </label>

    <select
      name="section"
      value={formData.section}
      onChange={handleChange}
      className="h-12 w-full rounded-xl border border-[#C8A44D]/20 bg-[#0A0A0A] px-4 text-white outline-none focus:border-[#C8A44D]"
    >
      <option value="Team Uniforms">
        Team Uniforms
      </option>

      <option value="Team Apparel">
        Team Apparel
      </option>

      <option value="Team Accessories">
        Team Accessories
      </option>
    </select>
  </div>

  {/* MOQ */}

  <div>
    <label className="mb-2 block text-sm font-medium text-gray-300">
      MOQ
    </label>

    <input
      type="number"
      name="moq"
      value={formData.moq}
      onChange={handleChange}
      className="h-12 w-full rounded-xl border border-[#C8A44D]/20 bg-[#0A0A0A] px-4 text-white outline-none focus:border-[#C8A44D]"
    />
  </div>

  {/* Item Name */}

  <div className="md:col-span-2">
    <label className="mb-2 block text-sm font-medium text-gray-300">
      Item Name
    </label>

    <input
      type="text"
      name="item_name"
      value={formData.item_name}
      onChange={handleChange}
      placeholder="Basketball Jersey"
      className="h-12 w-full rounded-xl border border-[#C8A44D]/20 bg-[#0A0A0A] px-4 text-white outline-none focus:border-[#C8A44D]"
    />
  </div>

  {/* Price */}

  <div>
    <label className="mb-2 block text-sm font-medium text-gray-300">
      Price
    </label>

    <input
      type="text"
      name="price"
      value={formData.price}
      onChange={handleChange}
      placeholder="$25.00"
      className="h-12 w-full rounded-xl border border-[#C8A44D]/20 bg-[#0A0A0A] px-4 text-white outline-none focus:border-[#C8A44D]"
    />
  </div>

  {/* Display Order */}

  <div>
    <label className="mb-2 block text-sm font-medium text-gray-300">
      Display Order
    </label>

    <input
      type="number"
      name="display_order"
      value={formData.display_order}
      onChange={handleChange}
      className="h-12 w-full rounded-xl border border-[#C8A44D]/20 bg-[#0A0A0A] px-4 text-white outline-none focus:border-[#C8A44D]"
    />
  </div>

  {/* Status */}

  <div className="md:col-span-2 flex items-center justify-between rounded-2xl border border-[#C8A44D]/20 bg-[#0A0A0A] p-4">

    <div>
      <h3 className="font-medium text-white">
        Active Item
      </h3>

      <p className="mt-1 text-sm text-gray-400">
        Show this item on the public pricing page.
      </p>
    </div>

    <input
      type="checkbox"
      name="status"
      checked={formData.status}
      onChange={handleChange}
      className="h-5 w-5 accent-[#C8A44D]"
    />

  </div>

</div>

{/* Footer */}

<div className="flex flex-col-reverse gap-4 border-t border-[#C8A44D]/20 pt-6 sm:flex-row sm:justify-end">

  <button
    type="button"
    onClick={onClose}
    disabled={loading}
    className="rounded-xl border border-[#C8A44D]/20 px-6 py-3 font-medium text-white transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={loading}
    className="rounded-xl bg-[#C8A44D] px-8 py-3 font-semibold text-black transition hover:bg-[#d8b45d] disabled:cursor-not-allowed disabled:opacity-60"
  >
    {loading
      ? "Saving..."
      : mode === "create"
      ? "Save Item"
      : "Update Item"}
  </button>

</div>

</form>

</motion.div>

</motion.div>

      )}
    </AnimatePresence>
  );
}