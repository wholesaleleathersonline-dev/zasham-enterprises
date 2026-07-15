"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "../../types/product";
import { getProductRoute } from "../../lib/routes/productRoutes";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps): React.JSX.Element {
  const [imageError, setImageError] = useState(false);

const route = getProductRoute(product.sport);
  const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

 const categoryRoute = slugify(product.category);

const productHref =
  product.sport === "Team Apparel"
    ? `/team-apparel/apparel/${product.slug}`
    : product.sport === "Team Accessories"
      ? `/team-accessories/accessories/${product.slug}`
      : `/${route.section}/${route.folder}/${product.slug}`;
  return (

    



    
    <Link
     href={productHref} 
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-[#111111] transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]"
    >
      {/* Image */}
      <div className="flex h-[320px] items-center justify-center overflow-hidden p-5">
        <img
          src={
            imageError || !product.image
              ? "/Pictures/pch.jpg"
              : product.image
          }
          alt={product.name}
          onError={() => setImageError(true)}
          className="max-h-full max-w-full object-contain transition duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex min-h-[220px] flex-1 flex-col p-6">
        <h3 className="line-clamp-2 text-lg font-bold text-white">
          {product.name}
        </h3>

        <p className="mt-3 text-[#D4AF37]">
          {product.price}
        </p>

        <p className="mt-1 text-sm text-gray-400">
          MOQ {product.moq} Sets
        </p>

        <div className="mt-auto pt-6">
          <button
            type="button"
            className="w-full rounded-xl bg-[#D4AF37] py-3 text-sm font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:bg-[#e5c158] hover:shadow-lg"
          >
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}