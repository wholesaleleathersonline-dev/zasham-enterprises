"use client";
import { useEffect, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { uploadImage } from "../../../services/admin/storage.service";
import type { ProductFormData } from "../../../lib/validations/product.schema";

const MAX_GALLERY_IMAGES = 4;

export default function ProductImages(): React.JSX.Element {
  const {
    watch,
    setValue,
  } = useFormContext<ProductFormData>();

  const featuredImage = watch("image");
  const galleryImages = watch("galleryImages");

  const [featuredPreview, setFeaturedPreview] = useState(
    featuredImage || ""
  );

  const [galleryPreview, setGalleryPreview] = useState<string[]>(
    galleryImages || []
  );

  useEffect(() => {
  setFeaturedPreview(featuredImage || "");
}, [featuredImage]);

useEffect(() => {
  setGalleryPreview(galleryImages || []);
}, [galleryImages]);

  const [uploadingFeatured, setUploadingFeatured] =
    useState(false);

  const [uploadingGallery, setUploadingGallery] =
    useState(false);

  async function uploadFeatured(
    file: File
  ): Promise<void> {
    try {
      setUploadingFeatured(true);

      setFeaturedPreview(
        URL.createObjectURL(file)
      );

      const imageUrl = await uploadImage(file);

      setValue("image", imageUrl, {
        shouldValidate: true,
      });

      setFeaturedPreview(imageUrl);
    } catch (error) {
      console.error(error);

      alert("Featured image upload failed.");
    } finally {
      setUploadingFeatured(false);
    }
  }

  async function uploadGallery(
    files: File[]
  ): Promise<void> {
    if (
      galleryPreview.length + files.length >
      MAX_GALLERY_IMAGES
    ) {
      alert(
        `Maximum ${MAX_GALLERY_IMAGES} gallery images allowed.`
      );

      return;
    }

    try {
      setUploadingGallery(true);

      const uploaded: string[] = [];

      for (const file of files) {
        const imageUrl = await uploadImage(file);

        uploaded.push(imageUrl);
      }

      const updated = [
        ...galleryPreview,
        ...uploaded,
      ];

      setGalleryPreview(updated);

      setValue(
        "galleryImages",
        updated,
        {
          shouldValidate: true,
        }
      );
    } catch (error) {
      console.error(error);

      alert("Gallery upload failed.");
    } finally {
      setUploadingGallery(false);
    }
  }

  function removeGalleryImage(
    index: number
  ): void {
    const updated =
      galleryPreview.filter(
        (_, i) => i !== index
      );

    setGalleryPreview(updated);

    setValue(
      "galleryImages",
      updated,
      {
        shouldValidate: true,
      }
    );
  }

  return (
    <section className="rounded-xl border border-yellow-500/20 bg-[#1A1A1A] p-5">

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Product Images
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Upload one featured image and up to four gallery images.
        </p>
      </div>
            {/* Featured Image */}

      <div className="mb-8">
        <label className="mb-3 block text-sm font-medium text-gray-300">
          Featured Image
        </label>

        <label
          htmlFor="featured-image"
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-yellow-500/20 bg-[#111111] px-6 py-10 transition hover:border-yellow-500"
        >
          {uploadingFeatured ? (
            <>
              <Loader2
                size={36}
                className="mb-4 animate-spin text-yellow-500"
              />

              <p className="font-medium text-white">
                Uploading...
              </p>
            </>
          ) : featuredPreview ? (
            <>
              <img
                src={featuredPreview}
                alt="Featured"
                className="mb-4 h-48 w-48 rounded-lg object-cover"
              />

              <p className="font-medium text-white">
                Change Featured Image
              </p>
            </>
          ) : (
            <>
              <div className="mb-4 rounded-full bg-yellow-500/10 p-4">
                <ImagePlus
                  size={34}
                  className="text-yellow-500"
                />
              </div>

              <p className="font-medium text-white">
                Upload Featured Image
              </p>

              <p className="mt-2 text-sm text-gray-400">
                JPG, PNG or WEBP
              </p>
            </>
          )}

          <input
            id="featured-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file =
                event.target.files?.[0];

              if (!file) return;

              void uploadFeatured(file);
            }}
          />
        </label>
      </div>

      {/* Gallery Images */}

      <div className="mb-4 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">
          Gallery Images
        </label>

        <span className="text-xs text-gray-500">
          {galleryPreview.length}/{MAX_GALLERY_IMAGES}
        </span>
      </div>
            <label
        htmlFor="gallery-images"
        className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-yellow-500/20 bg-[#111111] px-6 py-6 transition hover:border-yellow-500"
      >
        {uploadingGallery ? (
          <Loader2
            size={30}
            className="animate-spin text-yellow-500"
          />
        ) : (
          <>
            <ImagePlus
              size={28}
              className="mr-2 text-yellow-500"
            />

            <span className="font-medium text-white">
              Upload Gallery Images
            </span>
          </>
        )}

        <input
          id="gallery-images"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const files = Array.from(
              event.target.files ?? []
            );

            if (!files.length) return;

            void uploadGallery(files);
          }}
        />
      </label>

      {galleryPreview.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {galleryPreview.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative overflow-hidden rounded-xl border border-yellow-500/20"
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="h-40 w-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white transition hover:bg-red-500"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}