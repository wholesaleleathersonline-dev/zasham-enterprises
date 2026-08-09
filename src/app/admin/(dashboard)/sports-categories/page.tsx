"use client";

import { useEffect, useState } from "react";
import {
  getSportsCategories,
} from "../../../../services/admin/sportsCategories.service";
import { uploadSportImage } from "../../../../services/admin/sportsCategories.service";

export default function SportsCategoriesPage() {
  const [sports, setSports] = useState<any[]>([]);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

async function handleUpload(id: string, file: File) {
  try {
    setUploadingId(id);

    await uploadSportImage(id, file);

const data = await getSportsCategories();

console.log("SPORT CATEGORIES AFTER UPLOAD:", data);

setSports(data);
  } finally {
    setUploadingId(null);
  }
}

  useEffect(() => {
    async function loadSports() {
      const data = await getSportsCategories();
      setSports(data);
    }

    void loadSports();
  }, []);

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold text-white">
        Sports Categories
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sports.map((sport) => (
          <div
            key={sport.id}
            className="rounded-2xl border border-yellow-500/20 bg-[#1A1A1A] p-5"
          >
            <h2 className="mb-4 text-xl font-semibold text-white">
              {sport.name}
            </h2>

            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#111]">
              {sport.image ? (
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

      <label className="mt-5 flex w-full cursor-pointer items-center justify-center rounded-xl bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-400">
  {uploadingId === sport.id ? (
    <>
      <svg
        className="mr-2 h-5 w-5 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          opacity="0.25"
        />
        <path
          d="M22 12a10 10 0 00-10-10"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>

      Uploading...
    </>
  ) : (
    "Upload Image"
  )}

  <input
    type="file"
    hidden
    accept="image/*"
    disabled={uploadingId === sport.id}
    onChange={async (e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      await handleUpload(sport.id, file);
    }}
  />
</label>
          </div>
        ))}
      </div>
    </div>
  );
}