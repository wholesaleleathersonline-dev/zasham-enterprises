"use client";

import { useFormContext } from "react-hook-form";
import type { ProductFormData } from "../../../lib/validations/product.schema";

export default function ProductSeo(): React.JSX.Element {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  return (
    <div className="rounded-xl border border-yellow-500/20 bg-[#1A1A1A] p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        SEO Settings
      </h2>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            SEO Title
          </label>

          <input
            type="text"
            placeholder="Premium Basketball Uniform | Zasham Enterprises"
            {...register("seoTitle")}
            className="w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
          />

          {errors.seoTitle && (
            <p className="mt-2 text-sm text-red-500">
              {errors.seoTitle.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            SEO Description
          </label>

          <textarea
            rows={4}
            placeholder="Write a search engine friendly description..."
            {...register("seoDescription")}
            className="w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
          />

          {errors.seoDescription && (
            <p className="mt-2 text-sm text-red-500">
              {errors.seoDescription.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}