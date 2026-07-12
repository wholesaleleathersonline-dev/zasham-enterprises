"use client";

import { UploadCloud } from "lucide-react";

export default function ProductImages(): React.JSX.Element {
  return (
    <div className="rounded-xl border border-yellow-500/20 bg-[#1A1A1A] p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        Product Images
      </h2>

      <label
        htmlFor="featured-image"
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-yellow-500/20 bg-[#111111] px-6 py-14 transition hover:border-yellow-500"
      >
        <UploadCloud
          size={48}
          className="mb-4 text-yellow-500"
        />

        <h3 className="text-lg font-semibold text-white">
          Upload Featured Image
        </h3>

        <p className="mt-2 text-center text-sm text-gray-400">
          Click here or drag & drop your product image.
        </p>

        <input
          id="featured-image"
          type="file"
          accept="image/*"
          className="hidden"
        />
      </label>

      <p className="mt-4 text-sm text-gray-500">
        Supported formats: JPG, PNG, WEBP
      </p>
    </div>
  );
}