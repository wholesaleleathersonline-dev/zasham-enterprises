"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import type { ProductFormData } from "../../../lib/validations/product.schema";

const sports = [
  "Basketball",
  "American Football",
  "7v7 Football",
  "Flag Football",
  "Baseball",
  "Soccer",
  "Volleyball",
  "Rugby",
  "Cricket",
  "Ice Hockey",
];

const sportCategories: Record<
  string,
  string[]
> = {
  Basketball: [
    "Basketball Uniform",
    "Basketball Jersey",
    "Basketball Shorts",
    "Reversible Basketball Uniform",
    "Shooting Shirt",
    "Warm-Up Suit",
  ],

  "American Football": [
    "American Football Uniform",
    "Football Jersey",
    "Football Pants",
    "Compression Shirt",
    "Compression Pants",
    "Sleeveless Hoodie",
  ],

  "7v7 Football": [
    "7v7 Uniform",
    "7v7 Jersey",
    "7v7 Shorts",
    "Compression Shirt",
    "Compression Shorts",
    "Sleeveless Hoodie",
  ],

  "Flag Football": [
    "Flag Football Uniform",
    "Flag Football Jersey",
    "Flag Football Shorts",
  ],

  Baseball: [
    "Baseball Jersey",
    "Baseball Pants",
    "Baseball Hoodie",
  ],

  Soccer: [
    "Soccer Uniform",
    "Soccer Jersey",
    "Soccer Shorts",
    "Goalkeeper Kit",
  ],

  Volleyball: [
    "Volleyball Uniform",
    "Volleyball Jersey",
    "Volleyball Shorts",
  ],

  Rugby: [
    "Rugby Jersey",
    "Rugby Shorts",
    "Rugby Training Kit",
  ],

  Cricket: [
    "Cricket Uniform",
    "Cricket Shirt",
    "Cricket Trouser",
  ],

  "Ice Hockey": [
    "Hockey Jersey",
    "Hockey Socks",
    "Training Jersey",
  ],
};

const ageGroups = [
 "Youth",
  "Adult",
];

const uniformTypes = [
  "Standard",
  "Reversible",
];

export default function ProductBasicInfo(): React.JSX.Element {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  const productName = watch("name");
  const selectedSport = watch("sport");

const availableCategories =
  sportCategories[selectedSport] ?? [];

  useEffect(() => {
    const slug = productName
      ?.toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setValue("slug", slug ?? "");
  }, [productName, setValue]);

  useEffect(() => {
  setValue("category", "");
}, [selectedSport, setValue]);

  return (
    <section className="rounded-xl border border-yellow-500/20 bg-[#1A1A1A] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Product Information
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Basic product information.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">

        {/* Product Name */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">
            Product Name *
          </label>

          <input
            {...register("name")}
            placeholder="Premium Basketball Uniform"
            className="h-10 w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-3 text-sm text-white outline-none transition focus:border-yellow-500"
          />

          {errors.name && (
            <p className="mt-1 text-xs text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Slug */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">
            Slug
          </label>

          <input
            {...register("slug")}
            placeholder="premium-basketball-uniform"
            className="h-10 w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-3 text-sm text-white outline-none transition focus:border-yellow-500"
          />

          {errors.slug && (
            <p className="mt-1 text-xs text-red-500">
              {errors.slug.message}
            </p>
          )}
        </div>

        {/* Sport */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">
            Sport
          </label>

          <select
            {...register("sport")}
            className="h-10 w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-3 text-sm text-white outline-none focus:border-yellow-500"
          >
            <option value="">Select Sport</option>

            {sports.map((sport) => (
              <option
                key={sport}
                value={sport}
              >
                {sport}
              </option>
            ))}
          </select>

          {errors.sport && (
            <p className="mt-1 text-xs text-red-500">
              {errors.sport.message}
            </p>
          )}
        </div>

        {/* Category */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">
            Category
          </label>

          <select
            {...register("category")}
            className="h-10 w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-3 text-sm text-white outline-none focus:border-yellow-500"
          >
            <option value="">Select Category</option>

            {availableCategories.map((category) => (
  <option
    key={category}
    value={category}
  >
    {category}
  </option>
))}
          </select>

          {errors.category && (
            <p className="mt-1 text-xs text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>
                {/* Age Group */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">
            Age Group
          </label>

          <select
            {...register("ageGroup")}
            className="h-10 w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-3 text-sm text-white outline-none focus:border-yellow-500"
          >
            <option value="">Select Age Group</option>

            {ageGroups.map((group) => (
              <option
                key={group}
                value={group}
              >
                {group}
              </option>
            ))}
          </select>

          {errors.ageGroup && (
            <p className="mt-1 text-xs text-red-500">
              {errors.ageGroup.message}
            </p>
          )}
        </div>

        {/* Uniform Type */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">
            Uniform Type
          </label>

          <select
            {...register("uniformType")}
            className="h-10 w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-3 text-sm text-white outline-none focus:border-yellow-500"
          >
            <option value="">Select Uniform Type</option>

            {uniformTypes.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>

          {errors.uniformType && (
            <p className="mt-1 text-xs text-red-500">
              {errors.uniformType.message}
            </p>
          )}
        </div>

        {/* Price */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">
            Price (USD)
          </label>

          <input
            type="number"
            step="0.01"
            {...register("price", {
              valueAsNumber: true,
            })}
            placeholder="25"
            className="h-10 w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-3 text-sm text-white outline-none transition focus:border-yellow-500"
          />

          {errors.price && (
            <p className="mt-1 text-xs text-red-500">
              {errors.price.message}
            </p>
          )}
        </div>

        {/* MOQ */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">
            MOQ
          </label>

          <input
            type="number"
            {...register("moq", {
              valueAsNumber: true,
            })}
            placeholder="10"
            className="h-10 w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-3 text-sm text-white outline-none transition focus:border-yellow-500"
          />

          {errors.moq && (
            <p className="mt-1 text-xs text-red-500">
              {errors.moq.message}
            </p>
          )}
        </div>

        {/* Status */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-300">
            Status
          </label>

          <select
            {...register("status")}
            className="h-10 w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-3 text-sm text-white outline-none focus:border-yellow-500"
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>

          {errors.status && (
            <p className="mt-1 text-xs text-red-500">
              {errors.status.message}
            </p>
          )}
        </div>

        {/* Featured */}

        <div className="flex items-center justify-between rounded-lg border border-yellow-500/20 bg-[#111111] px-4 py-2.5">
          <div>
            <p className="text-sm font-medium text-white">
              Featured Product
            </p>

            <p className="text-xs text-gray-400">
              Show this product in featured sections.
            </p>
          </div>

          <input
            type="checkbox"
            {...register("isFeatured")}
            className="h-5 w-5 cursor-pointer accent-yellow-500"
          />
        </div>

      </div>
    </section>
  );
}