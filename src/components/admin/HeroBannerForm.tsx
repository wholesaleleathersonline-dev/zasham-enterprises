"use client";

import { useEffect, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";

import {
  getHeroBanner,
  updateHeroBanner,
} from "../../services/admin/heroBanner.service";

import {
  uploadHeroBanner,
} from "../../services/admin/storage.service";

interface HeroBanner {
  id: string;
  image: string;
}

export default function HeroBannerForm(): React.JSX.Element {
  const [banner, setBanner] = useState<HeroBanner | null>(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadBanner();
  }, []);

  async function loadBanner() {
    try {
      const data = await getHeroBanner();

      if (data) {
        setBanner(data);
        setPreview(data.image);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(file: File) {
    try {
      setUploading(true);

      setPreview(URL.createObjectURL(file));

      const image = await uploadHeroBanner(file);

      setPreview(image);

      if (banner) {
       setBanner({
  ...banner,
  image,
});
      }
    } finally {
      setUploading(false);
    }
  }

  async function saveBanner() {
    if (!banner) return;

    try {
      setSaving(true);

      await updateHeroBanner(
        banner.id,
        banner.image
      );

      alert("Hero banner updated successfully.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-yellow-500/20 bg-[#1A1A1A] p-6">

      <h1 className="text-2xl font-bold text-white">
        Hero Banner
      </h1>

      <p className="mt-2 text-gray-400">
        Upload homepage hero banner.
      </p>

      <label
        htmlFor="hero-banner"
        className="mt-8 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-yellow-500/20 bg-[#111111] px-6 py-10 hover:border-yellow-500 transition"
      >

        {uploading ? (
          <>
            <Loader2 className="mb-4 animate-spin text-yellow-500" />

            <p className="text-white">
              Uploading...
            </p>
          </>
        ) : preview ? (
          <>
            <img
              src={preview}
              className="mb-5 max-h-80 rounded-xl object-cover"
              alt="Hero Banner"
            />

            <p className="text-white">
              Change Banner
            </p>
          </>
        ) : (
          <>
            <ImagePlus
              size={40}
              className="mb-4 text-yellow-500"
            />

            <p className="text-white">
              Upload Banner
            </p>
          </>
        )}

        <input
          id="hero-banner"
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            void handleUpload(file);
          }}
        />

      </label>

      <button
        onClick={saveBanner}
        disabled={saving}
        className="mt-8 rounded-xl bg-yellow-500 px-8 py-3 font-semibold text-black hover:bg-yellow-400 transition disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>

    </section>
  );
}