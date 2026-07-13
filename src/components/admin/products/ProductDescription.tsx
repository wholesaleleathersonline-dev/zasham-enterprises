"use client";

import { useFormContext } from "react-hook-form";
import type { ProductFormData } from "../../../lib/validations/product.schema";
import ArrayInput from "../shared/ArrayInput";
import { useState } from "react";

export default function ProductDescription(): React.JSX.Element {
const {
  register,
  formState: { errors },
} = useFormContext<ProductFormData>();



  return (
    <div className="rounded-xl border border-yellow-500/20 bg-[#1A1A1A] p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        Product Description
      </h2>

      <div className="space-y-6">
        {/* Short Description */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Short Description
          </label>

          <textarea
            rows={3}
            placeholder="Short description for product cards..."
            {...register("shortDescription")}
            className="w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
          />

          {errors.shortDescription && (
            <p className="mt-2 text-sm text-red-500">
              {errors.shortDescription.message}
            </p>
          )}
        </div>

        {/* Full Description */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Full Description
          </label>

          <textarea
            rows={8}
            placeholder="Write complete product description..."
            {...register("description")}
            className="w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
          />

          {errors.description && (
            <p className="mt-2 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

{/* Features */}

<ArrayInput
  label="Features"
  field="features"
/>

<ArrayInput
  label="Colors"
  field="colors"
/>

<ArrayInput
  label="Sizes"
  field="sizes"
/>

<ArrayInput
  label="Fabric"
  field="fabric"
/>

<ArrayInput
  label="Tags"
  field="tags"
/>



      </div>
    </div>
  );
}