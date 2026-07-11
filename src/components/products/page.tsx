"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { basketballProducts } from "../../data/basketball";
import { americanFootballProducts } from "../../data/americanfootball";
import ProductCard from "../../components/products/ProductCard";



const allProducts = [
  ...basketballProducts,
  ...americanFootballProducts,
];

export default function ProductsPage() {
  const searchParams = useSearchParams();

  const search =
    searchParams.get("search")?.toLowerCase().trim() || "";

  const filteredProducts = useMemo(() => {
    if (!search) return allProducts;

    return allProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(search) ||
        product.sport.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(search)
        )
      );
    });
  }, [search]);

  return (
    <main className="min-h-screen bg-black pt-56 pb-20">
      <div className="mx-auto max-w-7xl px-5">

        <div className="mb-14 text-center">

          <h1 className="text-4xl font-bold text-[#D4AF37]">
            Search Results
          </h1>

          <p className="mt-4 text-gray-400">
            {search
              ? `Showing results for "${search}"`
              : "Browse All Products"}
          </p>

        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#111111] py-20 text-center">

            <h2 className="text-2xl font-bold text-white">
              No Products Found
            </h2>

            <p className="mt-3 text-gray-400">
              Please try another keyword.
            </p>

          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={`${product.sportRoute}-${product.id}-${product.slug}`}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}