"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import type { ProductFormData } from "../../../lib/validations/product.schema";

interface ArrayInputProps {
  label: string;
  field: keyof Pick<
    ProductFormData,
    "features" | "colors" | "sizes" | "fabric" | "tags"
  >;
  placeholder?: string;
}

export default function ArrayInput({
  label,
  field,
  placeholder,
}: ArrayInputProps): React.JSX.Element {
  const { watch, setValue } =
    useFormContext<ProductFormData>();

  const [input, setInput] = useState("");

  const items = watch(field) ?? [];

  function addItem() {
    const value = input.trim();

    if (!value) return;

    if (items.includes(value)) {
      setInput("");
      return;
    }

    setValue(field, [...items, value], {
      shouldDirty: true,
      shouldValidate: true,
    });

    setInput("");
  }

  function removeItem(index: number) {
    setValue(
      field,
      items.filter((_, i) => i !== index),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          placeholder={
            placeholder ?? `Add ${label.toLowerCase()}`
          }
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
          className="flex-1 rounded-lg border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white outline-none focus:border-yellow-500"
        />

        <button
          type="button"
          onClick={addItem}
          className="rounded-lg bg-yellow-500 px-5 font-semibold text-black transition hover:bg-yellow-400"
        >
          Add
        </button>
      </div>

      {items.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <button
              key={`${item}-${index}`}
              type="button"
              onClick={() => removeItem(index)}
              className="rounded-full border border-yellow-500/30 bg-[#111111] px-4 py-2 text-sm text-yellow-500 transition hover:border-red-500 hover:text-red-400"
            >
              {item} ✕
            </button>
          ))}
        </div>
      )}
    </div>
  );
}