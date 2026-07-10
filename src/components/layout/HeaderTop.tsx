"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

export default function HeaderTop() {


  const router = useRouter();
const [search, setSearch] = useState("");

const handleSearch = (value: string) => {
  setSearch(value);

  router.push(
    `/products?search=${encodeURIComponent(value)}`
  );
};








  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <>
      {/* ================= DESKTOP HEADER ================= */}
      <div className="hidden lg:grid grid-cols-3 items-center py-5">

        {/* LEFT */}
        <div className="flex flex-col">
          <h1 className="android-font text-[34px] leading-none uppercase text-[#D4AF37]">
            ZASHAM
          </h1>

          <h1 className="android-font text-[34px] leading-none uppercase text-[#D4AF37]">
            ENTERPRISES
          </h1>

          <span className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#D4AF37]/70">
            Custom Sportswear Manufacturer
          </span>
        </div>

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

          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" />

            <input
              type="text"
              placeholder="Search Products..."
              className="w-64 rounded-full border border-[#D4AF37]/30 bg-[#111111] py-2 pl-11 pr-5 text-sm text-white outline-none transition duration-300 placeholder:text-gray-500 focus:border-[#D4AF37]"
            />
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
          <div className="flex flex-col">
            <h2 className="android-font text-[22px] leading-none uppercase text-[#D4AF37]">
              ZASHAM
            </h2>

            <h2 className="android-font text-[22px] leading-none uppercase text-[#D4AF37]">
              ENTERPRISES
            </h2>
          </div>

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
        <div
          className={`overflow-hidden transition-all duration-300 ${
            mobileSearchOpen
              ? "mt-4 max-h-20 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="relative">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" />

            <input
              type="text"
              placeholder="Search Products..."
              className="w-full rounded-full border border-[#D4AF37]/30 bg-[#111111] py-3 pl-11 pr-5 text-sm text-white outline-none transition duration-300 placeholder:text-gray-500 focus:border-[#D4AF37]"
            />

          </div>
        </div>

      </div>

    </>
  );
}