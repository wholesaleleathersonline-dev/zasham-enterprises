"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { allProducts } from "@/data/allProducts";
import ProductCard from "@/components/products/ProductCard";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const query = searchParams.get("q")?.trim() || "";

  const filteredProducts = useMemo(() => {
    if (!query) return [];

    const keyword = query.toLowerCase();

    return allProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(keyword) ||
        product.sport.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword) || 
        product.shortDescription.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(keyword)
        )
      );
    });
  }, [query]);

  return (
    <section className="min-h-screen bg-black pt-40 pb-20">

      <div className="mx-auto max-w-7xl px-5">

        <h1 className="text-4xl font-bold text-[#D4AF37]">
          Search Results
        </h1>

        <p className="mt-4 text-gray-400">
          {query
            ? `Showing ${filteredProducts.length} result(s) for "${query}"`
            : "Start typing to search products."}
        </p>
                {query.length > 0 && filteredProducts.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-12 text-center">
            <h2 className="text-2xl font-bold text-white">
              No Products Found
            </h2>

            <p className="mt-4 text-gray-400">
              We couldn't find any products matching{" "}
              <span className="text-[#D4AF37]">"{query}"</span>.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={`${product.sportRoute}-${product.id}`}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}