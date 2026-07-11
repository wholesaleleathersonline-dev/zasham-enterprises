"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { Outfit } from "next/font/google";
import { menuItems } from "./HeaderData";
import MegaMenu from "./MegaMenu";
import { Sora } from "next/font/google";
import QuoteModal from "../modals/QuoteModal";
import { useState } from "react";


const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

interface DesktopNavigationProps {
    activeMenu: string | null;
    setActiveMenu: (menu: string | null) => void;
}

export default function DesktopNavigation({
    activeMenu,
    setActiveMenu,
}: DesktopNavigationProps) {
    const pathname = usePathname();
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    return (
        <nav className="hidden border-t border-[#D4AF37]/10 lg:block">
            <div className="flex items-center justify-center gap-6 xl:gap-7 2xl:gap-8 py-5">
                {menuItems.map((item) => {
                    const isActive =
                        item.title === "Team Uniforms"
                            ? pathname.startsWith("/team-uniforms")
                            : item.title === "Team Apparel"
                            ? pathname.startsWith("/team-apparel")
                            : item.title === "Accessories"
                            ? pathname.startsWith("/accessories")
                            : !!item.href &&
                              (pathname === item.href ||
                                  (item.href !== "/" &&
                                      pathname.startsWith(item.href)));

                    return (
                        <div
                            key={item.title}
                            className="relative"
                            onMouseEnter={() => setActiveMenu(item.title)}
                            onMouseLeave={() => setActiveMenu(null)}
                        >
                            <Link
  href={item.href || "#"}
  className={`${sora.className} group relative flex shrink-0 items-center gap-1.5 whitespace-nowrap uppercase text-[13.5px] xl:text-[14px] font-semibold tracking-[0.04em] transition-all duration-300 ${
    isActive
      ? "text-[#D4AF37]"
      : "text-white hover:text-[#D4AF37]"
  }`}
>
  {item.title}

  {item.children && (
    <FaChevronDown
      size={10}
      className={`transition duration-300 ${
        activeMenu === item.title ? "rotate-180" : ""
      }`}
    />
  )}

  <span
    className={`absolute -bottom-2 left-0 h-[2px] bg-[#D4AF37] transition-all duration-300 ${
      isActive
        ? "w-full"
        : "w-0 group-hover:w-full"
    }`}
  />
</Link>

                            {item.children && (
                                <MegaMenu
                                    item={item}
                                    visible={activeMenu === item.title}
                                />
                            )}
                        </div>
                    );
                })}

                <button
    onClick={() => setIsQuoteModalOpen(true)}
   className={`${sora.className} ml-5 shrink-0 rounded-full bg-[#D4AF37] px-5 xl:px-6 py-3 text-xs font-semibold uppercase tracking-[0.10em] text-black transition duration-300 hover:scale-105`}
>
    Get a Free Quote
</button>
            </div>

<QuoteModal
    isOpen={isQuoteModalOpen}
    onClose={() => setIsQuoteModalOpen(false)}
/>


        </nav>
    );
}