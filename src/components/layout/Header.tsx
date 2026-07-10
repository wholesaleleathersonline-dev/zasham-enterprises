"use client";

import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import HeaderTop from "./HeaderTop";
import DesktopNavigation from "./DesktopNavigation";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-[#D4AF37]/20 shadow-xl"
          : "bg-black/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-[1900px] px-5">

        <HeaderTop />

        {/* Mobile Hamburger */}
        <div className="flex justify-end pb-3 lg:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            className="rounded-md border border-[#D4AF37]/20 p-2 text-white transition-all duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        <DesktopNavigation
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />

        <MobileMenu
          open={mobileOpen}
          setOpen={setMobileOpen}
        />

      </div>
    </header>
  );
}