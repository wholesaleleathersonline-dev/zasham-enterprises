"use client";

import { useEffect, useState } from "react";

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