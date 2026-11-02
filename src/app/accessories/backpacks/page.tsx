
"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "../../../components/common/Breadcrumb";
import ProductCard from "../../../components/products/ProductCard";
import CustomCursor from "../../../components/customcursor";
import { getProductsBySport } from "../../../services/website/product.service";
import type { Product } from "../../../types/product";

export default function BackpacksPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const allProducts = await getProductsBySport(
          "Team Accessories"
        );

        const backpacks = allProducts.filter(
          (product) =>
            product.category.trim().toLowerCase() === "backpacks"
        );

        setProducts(backpacks);
      } catch (err) {
        console.error("Backpacks loading error:", err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    void loadProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <CustomCursor />

      {/* Hero + Breadcrumb */}
      <section className="border-b border-[#D4AF37]/20 pt-44 pb-16 lg:pt-48">
        <div className="mx-auto max-w-7xl px-6">

          <div className="pt-6 lg:pt-8">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Accessories", href: "/accessories" },
                { label: "Backpacks" },
              ]}
            />
          </div>

          <p className="mt-10 uppercase tracking-[0.35em] text-[#D4AF37]">
            Accessories
          </p>

          <h1 className="mt-6 text-5xl font-black lg:text-6xl">
            Custom Backpacks
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Premium custom sports backpacks manufactured by Zasham
            Enterprises using durable materials, premium stitching and
            unlimited customization for schools, clubs, academies and
            professional teams.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">

          {loading ? (
            <div className="py-20 text-center">
              <p className="text-lg text-[#D4AF37]">
                Loading Backpacks...
              </p>
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <p className="text-lg text-red-400">{error}</p>
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
                We are preparing our premium collection of custom sports
                backpacks. Soon you will be able to explore all available
                styles, colors and customization options.
              </p>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
