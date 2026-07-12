"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import type { ProductFormData } from "../../../lib/validations/product.schema";


export default function ProductBasicInfo(): React.JSX.Element {
 const {
  register,
  watch,
  setValue,
  formState: { errors },
} = useFormContext<ProductFormData>();

const productName = watch("name");

useEffect(() => {
  const slug = productName
    ?.toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  setValue("slug", slug ?? "");
}, [productName, setValue]);

  return (
    <div className="rounded-xl border border-yellow-500/20 bg-[#1A1A1A] p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        Basic Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Product Name */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Product Name *
          </label>

          <input
            type="text"
            placeholder="Premium Basketball Uniform"
            {...register("name")}
            className="w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
          />

          {errors.name && (
            <p className="mt-2 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Slug */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Product Slug
          </label>

          <input
            type="text"
            placeholder="premium-basketball-uniform"
            {...register("slug")}
            className="w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
          />

          {errors.slug && (
            <p className="mt-2 text-sm text-red-500">
              {errors.slug.message}
            </p>
          )}
        </div>

        {/* Category */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Category
          </label>

          <input
            type="text"
            placeholder="Basketball"
            {...register("category")}
            className="w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
          />

          {errors.category && (
            <p className="mt-2 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Price */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Price (USD)
          </label>

          <input
            type="number"
            step="0.01"
            placeholder="25"
            {...register("price", {
              valueAsNumber: true,
            })}
            className="w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
          />

          {errors.price && (
            <p className="mt-2 text-sm text-red-500">
              {errors.price.message}
            </p>
          )}
        </div>

        {/* MOQ */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            MOQ
          </label>

          <input
            type="number"
            placeholder="10"
            {...register("moq", {
              valueAsNumber: true,
            })}
            className="w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
          />

          {errors.moq && (
            <p className="mt-2 text-sm text-red-500">
              {errors.moq.message}
            </p>
          )}
        </div>

        {/* Status */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Status
          </label>

         <select
  {...register("sport")}
  className="w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
>
  <option value="">Select Sport</option>
  <option value="Basketball">Basketball</option>
  <option value="American Football">American Football</option>
  <option value="Baseball">Baseball</option>
  <option value="Soccer">Soccer</option>
  <option value="Volleyball">Volleyball</option>
  <option value="Rugby">Rugby</option>
  <option value="Cricket">Cricket</option>
</select>

{errors.sport && (
  <p className="mt-2 text-sm text-red-500">
    {errors.sport.message}
  </p>
)}
        </div>

      </div>
    </div>
  );
}