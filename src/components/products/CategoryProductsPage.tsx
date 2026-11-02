
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Breadcrumb from "../common/Breadcrumb";
import ProductCard from "./ProductCard";
import CustomCursor from "../customcursor";

import { getProductsBySport } from "../../services/website/product.service";
import type { Product } from "../../types/product";

interface CategoryProductsPageProps {
  sport: string;
  title: string;
  breadcrumbHref: string;
  categoryTitles: Record<string, string>;
  description?: string;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function CategoryProductsPage({
  sport,
  title,
  breadcrumbHref,
  categoryTitles,
  description,
}: CategoryProductsPageProps) {
  const pathname = usePathname();

  const categorySlug =
    pathname.split("/").filter(Boolean).pop() ?? "";

  const categoryName =
    categoryTitles[categorySlug] ?? categorySlug;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const allProducts = await getProductsBySport(sport);

        const filteredProducts = allProducts.filter(
          (product) =>
           slugify(product.category) === slugify(categorySlug)
        );

        if (!cancelled) {
          setProducts(filteredProducts);
        }
      } catch (err) {
        console.error("Category products error:", err);

        if (!cancelled) {
          setError("Unable to load products. Please try again later.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      cancelled = true;
    };
  }, [sport, categoryName]);

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <CustomCursor />

      {/* Hero */}
      <section className="border-b border-[#D4AF37]/20 pt-44 pb-16 lg:pt-48">
        <div className="mx-auto max-w-7xl px-6">

          <div className="pt-6 lg:pt-8">
            <Breadcrumb
              items={[
                {
                  label: "Home",
                  href: "/",
                },
                {
                  label: title,
                  href: breadcrumbHref,
                },
                {
                  label: categoryName,
                },
              ]}
            />
          </div>

          <p className="mt-10 uppercase tracking-[0.35em] text-[#D4AF37]">
            {title}
          </p>

          <h1 className="mt-6 text-5xl font-black lg:text-6xl">
            {categoryName}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            {description ??
              `Premium custom ${categoryName.toLowerCase()} manufactured by Zasham Enterprises using high-quality materials, professional craftsmanship and unlimited customization for teams worldwide.`}
          </p>

        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">

          {loading ? (
            <div className="py-20 text-center">
              <p className="text-lg text-[#D4AF37]">
                Loading {categoryName}...
              </p>
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <p className="text-lg text-red-400">
                {error}
              </p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#161616] p-16 text-center">

              <h2 className="text-4xl font-bold text-white">
                Products Coming Soon
              </h2>

              <p className="mx-auto mt-6 max-w-2xl leading-8 text-gray-400">
                We are preparing our premium collection of custom{" "}
                {categoryName.toLowerCase()}. Soon you will be able to
                explore all available styles, colors and customization options.
              </p>

            </div>
          )}

        </div>
      </section>
    </main>
  );
}
