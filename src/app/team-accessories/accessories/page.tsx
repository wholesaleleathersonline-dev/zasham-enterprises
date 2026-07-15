"use client";

import ProductCard from "../../../components/products/ProductCard";
import { getProductsBySport } from "../../../services/website/product.service";
import type { Product } from "../../../types/product";
import CustomCursor from "../../../components/customcursor";
import Breadcrumb from "../../../components/common/Breadcrumb";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useMemo } from "react";
import { useParams } from "next/navigation";

export default function SportPage() {

const { category } = useParams<{
  category: string;
}>();


const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const categoryTitles: Record<string, string> = {
  "backpacks": "Backpacks",
  "duffle-bags": "Duffle Bags",
  "caps": "Caps",
  "socks": "Socks",
  "arm-sleeves": "Arm Sleeves",
  "leg-sleeves": "Leg Sleeves",
  "headbands": "Headbands",
  "gloves": "Gloves",
  "sports-towels": "Sports Towels",
};

const categoryName =

  categoryTitles[category] ?? category;
    const displayCategory = categoryName ?? "Accessories";



  const productsPerPage = 9;

  const productsRef = useRef<HTMLElement>(null);  

  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const [selectedFilter, setSelectedFilter] = useState<
  "All" | "Youth" | "Adult" | "Reversible"
>("All");

const filteredProducts = useMemo(() => {
  const value = search.toLowerCase().trim();

let products = allProducts;

  // Search
  if (value) {
    products = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(value) ||
        product.shortDescription.toLowerCase().includes(value) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(value)
        ) ||
        product.colors.some((color) =>
          color.toLowerCase().includes(value)
        )
      );
    });
  }

  // Filters
  if (selectedFilter === "Youth") {
    products = products.filter(
      (product) => product.ageGroup === "Youth"
    );
  }

  if (selectedFilter === "Adult") {
    products = products.filter(
      (product) => product.ageGroup === "Adult"
    );
  }

  if (selectedFilter === "Reversible") {
    products = products.filter(
      (product) => product.uniformType === "Reversible"
    );
  }

  return products;
}, [allProducts, search, selectedFilter]);


const totalPages = Math.max(
  1,
  Math.ceil(filteredProducts.length / productsPerPage)
);


const currentProducts = filteredProducts.slice(
  (currentPage - 1) * productsPerPage,
  currentPage * productsPerPage
);
 
useEffect(() => {
  async function loadProducts() {
    try {
    const products =
 await getProductsBySport("Team Accessories");

const filtered = products.filter(
  (product) =>
    slugify(product.category) === category
);

setAllProducts(filtered);
      setSelectedFilter("All");
setCurrentPage(1);
    } catch (error) {
      console.error(error);
    }
  }

  void loadProducts();
}, [category]);
 

  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [currentPage]);










  return (


    <main className="min-h-screen bg-[#0F0F0F] text-white">

      {/* Hero */}
      <CustomCursor />



      <section className="border-b border-[#D4AF37]/20 pt-32 pb-10">
        <div className="mx-auto max-w-7xl px-6">

         <p className="uppercase tracking-[0.35em] text-[#D4AF37]">
  Team Accessories
</p>

         <h1 className="mt-20 text-6xl font-black">
  {categoryName}
</h1>

          <p className="mt-6 max-w-3xl text-lg text-gray-400">
     {`Premium custom ${displayCategory.toLowerCase()} manufactured with professional sublimation printing, premium performance fabrics and worldwide shipping.`}
          </p>

        </div>
      </section>




      <Breadcrumb
        items={[
          {
            label: "Home",
            href: "/",
          },
         {
  label: "Team Accessories",
  href: "/team-accessories",
},
{
  label: categoryName,
},
        ]}
      />





      {/* Search & Filter */}

      {/* Search & Filter */}

      <div className=" px-8 lg:px-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      </div>








      {/* Search & Filter */}

      <section className="pt-6 pb-10">
        <div className="mx-auto max-w-7xl px-6">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <input
  type="text"
  value={search}
  onChange={(e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  }}
placeholder={`Search ${categoryName}...`}
  className="w-full rounded-2xl border border-[#D4AF37]/20 bg-[#161616] px-6 py-4 text-white outline-none focus:border-[#D4AF37] lg:max-w-md"
/>

            <div className="flex flex-wrap gap-3">

              <button
  onClick={() => {
    setSelectedFilter("All");
    setCurrentPage(1);
  }}
  className={`rounded-full px-6 py-3 font-semibold transition ${
    selectedFilter === "All"
      ? "bg-[#D4AF37] text-black"
      : "border border-[#D4AF37]/30 text-white hover:border-[#D4AF37]"
  }`}
>
  All
</button>

             <button
  onClick={() => {
    setSelectedFilter("Youth");
    setCurrentPage(1);
  }}
  className={`rounded-full px-6 py-3 transition ${
    selectedFilter === "Youth"
      ? "bg-[#D4AF37] text-black"
      : "border border-[#D4AF37]/30 text-white hover:border-[#D4AF37]"
  }`}
>
  Youth
</button>

             <button
  onClick={() => {
    setSelectedFilter("Adult");
    setCurrentPage(1);
  }}
  className={`rounded-full px-6 py-3 transition ${
    selectedFilter === "Adult"
      ? "bg-[#D4AF37] text-black"
      : "border border-[#D4AF37]/30 text-white hover:border-[#D4AF37]"
  }`}
>
  Adult
</button>

             <button
  onClick={() => {
    setSelectedFilter("Reversible");
    setCurrentPage(1);
  }}
  className={`rounded-full px-6 py-3 transition ${
    selectedFilter === "Reversible"
      ? "bg-[#D4AF37] text-black"
      : "border border-[#D4AF37]/30 text-white hover:border-[#D4AF37]"
  }`}
>
  Reversible
</button>

            </div>

          </div>

        </div>
      </section>

      {/* Products */}

      <section
        ref={productsRef}
        className="py-20"
      >

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        </div>

      </section>





      <div className="mt-14 flex items-center justify-center gap-3">

        <button
         onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="flex h-12 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#161616] px-6 font-semibold text-white transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Previous
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
           onClick={() => setCurrentPage(index + 1)}
            className={`flex h-12 w-12 items-center justify-center rounded-xl border font-bold transition-all duration-300 ${currentPage === index + 1
                ? "border-[#D4AF37] bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                : "border-[#D4AF37]/20 bg-[#161616] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
              }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => {
            setCurrentPage((p) => Math.min(totalPages, p + 1));
          }
        }

           
          disabled={currentPage === totalPages}
          className="flex h-12 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#161616] px-6 font-semibold text-white transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next →
        </button>

      </div>





    </main>
  );
}