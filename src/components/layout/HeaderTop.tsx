"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { basketballProducts } from "../../data/basketball";
import { americanFootballProducts } from "../../data/americanfootball";

import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

export default function HeaderTop() {


  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const allProducts = [
  ...basketballProducts,
  ...americanFootballProducts,
];
const [search, setSearch] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState("");
const [showResults, setShowResults] = useState(false);



const handleSearch = (value: string) => {
  setSearch(value);

  if (value.trim().length < 3) {
    setShowResults(false);
  }
};


useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search.trim());
  }, 300);

  return () => clearTimeout(timer);
}, [search]);


/*
useEffect(() => {
  if (debouncedSearch.length < 3) return;

  router.push(
    `/products?search=${encodeURIComponent(debouncedSearch)}`
  );
}, [debouncedSearch, router]);
*/






  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

const filteredProducts = useMemo(() => {
  if (debouncedSearch.length < 3) {
    return [];
  }

  const keyword = debouncedSearch.toLowerCase();

  return allProducts
    .filter((product) => {
      return (
        product.name.toLowerCase().includes(keyword) ||
        product.sport.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(keyword)
        )
      );
    })
    .slice(0, 5);
}, [debouncedSearch]);

useEffect(() => {
  setShowResults(filteredProducts.length > 0);
}, [filteredProducts]);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setShowResults(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);


const highlightMatch = (text: string, keyword: string) => {
  if (!keyword) return text;

  const index = text.toLowerCase().indexOf(keyword.toLowerCase());

  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}

      <span className="rounded bg-[#D4AF37] px-1 text-black">
        {text.slice(index, index + keyword.length)}
      </span>

      {text.slice(index + keyword.length)}
    </>
  );
};

  return (


    <>
      {/* ================= DESKTOP HEADER ================= */}
      <div className="hidden lg:grid grid-cols-3 items-center py-5">

        {/* LEFT */}
<Link
  href="/"
  className="group block w-fit"
>
  <img
    src="/Pictures/sitelogo.png"
    alt="Zasham Enterprises"
    className="h-auto w-[230px] transition-all duration-300 group-hover:scale-[1.02] sm:w-[260px] lg:w-[340px]"
  />
</Link>

        {/* CENTER */}
        <div className="flex justify-center">
          <Link href="/">
            <img
              src="/logo/ze-logo.png"
              alt="Zasham Enterprises"
              className="w-28 transition duration-300 hover:scale-105"
            />
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-end gap-4">

          <div
  ref={searchRef}
  className="relative"
>

<input
  type="text"
  value={search}
  onChange={(e) => handleSearch(e.target.value)}
  onFocus={() => {
    if (filteredProducts.length > 0) {
      setShowResults(true);
    }
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter" && search.trim().length >= 3) {
      router.push(
        `/products?search=${encodeURIComponent(search.trim())}`
      );
    }
  }}
  placeholder="Search Products..."
  className="w-64 rounded-full border border-[#D4AF37]/30 bg-[#111111] py-2 pl-11 pr-5 text-sm text-white outline-none transition duration-300 placeholder:text-gray-500 focus:border-[#D4AF37]"
/>

{debouncedSearch.length >= 3 && (
  <div className="absolute left-0 top-full z-50 mt-3 w-full overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-[#111111]/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
 
   {filteredProducts.length > 0 ? (
  <>
    {filteredProducts.map((product) => (
      <Link
        key={`${product.sportRoute}-${product.id}`}
        href={`/team-uniforms/${product.sportRoute}/${product.slug}`}
        onClick={() => setShowResults(false)}
        className="group flex items-center gap-4 border-b border-[#D4AF37]/10 p-4 transition-all duration-300 hover:bg-[#D4AF37]/10"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-16 w-16 rounded-xl border border-[#D4AF37]/20 object-cover transition duration-300 group-hover:scale-105"
        />

        <div className="flex-1">
          <h4 className="line-clamp-1 font-semibold text-white transition group-hover:text-[#D4AF37]">
            {highlightMatch(product.name, debouncedSearch)}
          </h4>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-gray-400">
              {product.sport}
            </span>

            <span className="rounded-full bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#D4AF37]">
              {product.price}
            </span>
          </div>

          <p className="mt-2 text-xs text-gray-500">
            MOQ {product.moq} Sets
          </p>
        </div>
      </Link>
    ))}

    <div className="border-t border-[#D4AF37]/10 px-4 py-3">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-400">
        {filteredProducts.length} Product
        {filteredProducts.length > 1 ? "s" : ""} Found
      </p>
    </div>

    <Link
      href={`/products?search=${encodeURIComponent(search)}`}
      onClick={() => setShowResults(false)}
      className="block bg-[#D4AF37]/10 p-4 text-center text-sm font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37]/20"
    >
      View All Results →
    </Link>
  </>
) : (
  <div className="px-6 py-10 text-center">
    <FaSearch className="mx-auto mb-3 text-3xl text-[#D4AF37]/50" />

    <h4 className="text-lg font-semibold text-white">
      No Products Found
    </h4>

    <p className="mt-2 text-sm text-gray-400">
      Try searching:
    </p>

    <div className="mt-4 flex flex-wrap justify-center gap-2">
      <span className="rounded-full border border-[#D4AF37]/20 px-3 py-1 text-xs text-[#D4AF37]">
        Basketball
      </span>

      <span className="rounded-full border border-[#D4AF37]/20 px-3 py-1 text-xs text-[#D4AF37]">
        Football
      </span>

      <span className="rounded-full border border-[#D4AF37]/20 px-3 py-1 text-xs text-[#D4AF37]">
        Uniform
      </span>

      <span className="rounded-full border border-[#D4AF37]/20 px-3 py-1 text-xs text-[#D4AF37]">
        Jersey
      </span>
    </div>
  </div>
)}


<div className="border-t border-[#D4AF37]/10 px-4 py-3">
  <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-400">
    {filteredProducts.length} Product
    {filteredProducts.length > 1 ? "s" : ""} Found
  </p>
</div>


    <Link
      href={`/products?search=${encodeURIComponent(search)}`}
      onClick={() => setShowResults(false)}
      className="block bg-[#D4AF37]/10 p-4 text-center text-sm font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37]/20"
    >
      View All Results →
    </Link>
  </div>
)}






          </div>

          <a
            href="https://wa.me/923496135559"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition hover:text-[#D4AF37]"
          >
            <FaWhatsapp size={22} />
          </a>

          <a
            href="https://instagram.com/zashamenterprises"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition hover:text-[#D4AF37]"
          >
            <FaInstagram size={22} />
          </a>

          <a
            href="https://facebook.com/zashamsportswear"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition hover:text-[#D4AF37]"
          >
            <FaFacebookF size={20} />
          </a>

        </div>
      </div>
            {/* ================= MOBILE HEADER ================= */}
      <div className="lg:hidden border-t border-[#D4AF37]/10 py-4">

        {/* Top Row */}
        <div className="flex items-center justify-between gap-3">

          {/* Brand */}
          <Link href="/">
  <img
    src="/logo/ze-logo.png"
    alt="Zasham Enterprises"
    className="h-12 w-auto transition duration-300"
  />
</Link>

          {/* Search + Social */}
          <div className="flex items-center gap-4">

            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              aria-label="Search"
              className="text-white transition hover:text-[#D4AF37]"
            >
              {mobileSearchOpen ? (
                <FaTimes size={18} />
              ) : (
                <FaSearch size={18} />
              )}
            </button>

            <a
              href="https://wa.me/923496135559"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition hover:text-[#D4AF37]"
            >
              <FaWhatsapp size={20} />
            </a>

            <a
              href="https://instagram.com/zashamenterprises"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition hover:text-[#D4AF37]"
            >
              <FaInstagram size={20} />
            </a>

            <a
              href="https://facebook.com/zashamsportswear"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition hover:text-[#D4AF37]"
            >
              <FaFacebookF size={18} />
            </a>

          </div>

        </div>

        {/* Animated Mobile Search */}
        <div className={`transition-all duration-300 ${
    mobileSearchOpen
      ? "mt-4 max-h-[500px] opacity-100"
      : "max-h-0 overflow-hidden opacity-0"
  }`}
 >
          <div className="relative">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" />

<input
  type="text"
  value={search}
  onChange={(e) => handleSearch(e.target.value)}
  onFocus={() => {
    if (filteredProducts.length > 0) {
      setShowResults(true);
    }
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter" && search.trim().length >= 3) {
      router.push(
        `/products?search=${encodeURIComponent(search.trim())}`
      );
      setShowResults(false);
      setMobileSearchOpen(false);
    }
  }}
  placeholder="Search Products..."
  className="w-full rounded-full border border-[#D4AF37]/30 bg-[#111111] py-3 pl-11 pr-5 text-sm text-white outline-none transition duration-300 placeholder:text-gray-500 focus:border-[#D4AF37]"
/>

{debouncedSearch.length >= 3 && (
  <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-[#D4AF37]/20 bg-[#111111]/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">

    {filteredProducts.length > 0 ? (
      <>
        {filteredProducts.map((product) => (
          <Link
            key={`${product.sportRoute}-${product.id}`}
            href={`/team-uniforms/${product.sportRoute}/${product.slug}`}
            onClick={() => {
              setShowResults(false);
              setMobileSearchOpen(false);
            }}
            className="group flex items-center gap-3 border-b border-[#D4AF37]/10 p-3 transition-all duration-300 hover:bg-[#D4AF37]/10"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-14 w-14 rounded-xl border border-[#D4AF37]/20 object-cover"
            />

            <div className="min-w-0 flex-1">

              <h4 className="line-clamp-1 font-semibold text-white group-hover:text-[#D4AF37]">
                {highlightMatch(product.name, debouncedSearch)}
              </h4>

              <div className="mt-2 flex items-center justify-between">

                <span className="text-xs uppercase tracking-wide text-gray-400">
                  {product.sport}
                </span>

                <span className="rounded-full bg-[#D4AF37]/10 px-2 py-1 text-xs font-semibold text-[#D4AF37]">
                  {product.price}
                </span>

              </div>

              <p className="mt-1 text-xs text-gray-500">
                MOQ {product.moq} Sets
              </p>

            </div>
          </Link>
        ))}

        <div className="border-t border-[#D4AF37]/10 px-4 py-3">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-400">
            {filteredProducts.length} Product
            {filteredProducts.length > 1 ? "s" : ""} Found
          </p>
        </div>

        <Link
          href={`/products?search=${encodeURIComponent(search)}`}
          onClick={() => {
            setShowResults(false);
            setMobileSearchOpen(false);
            (document.activeElement as HTMLElement)?.blur();
          }}
          className="block bg-[#D4AF37]/10 p-4 text-center text-sm font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37]/20"
        >
          View All Results →
        </Link>
      </>
    ) : (
      <div className="px-6 py-10 text-center">

        <FaSearch className="mx-auto mb-3 text-3xl text-[#D4AF37]/50" />

        <h4 className="text-lg font-semibold text-white">
          No Products Found
        </h4>

        <p className="mt-2 text-sm text-gray-400">
          Try searching:
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-2">

          <span className="rounded-full border border-[#D4AF37]/20 px-3 py-1 text-xs text-[#D4AF37]">
            Basketball
          </span>

          <span className="rounded-full border border-[#D4AF37]/20 px-3 py-1 text-xs text-[#D4AF37]">
            Football
          </span>

          <span className="rounded-full border border-[#D4AF37]/20 px-3 py-1 text-xs text-[#D4AF37]">
            Uniform
          </span>

          <span className="rounded-full border border-[#D4AF37]/20 px-3 py-1 text-xs text-[#D4AF37]">
            Jersey
          </span>

        </div>

      </div>
    )}

  </div>
)}

          </div>
        </div>

      </div>

    </>
  );
}