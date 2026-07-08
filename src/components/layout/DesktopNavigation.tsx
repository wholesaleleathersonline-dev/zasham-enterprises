"use client";

import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { menuItems } from "./HeaderData";
import MegaMenu from "./MegaMenu";

interface DesktopNavigationProps {
    activeMenu: string | null;
    setActiveMenu: (menu: string | null) => void;
}

export default function DesktopNavigation({
    activeMenu,
    setActiveMenu,
}: DesktopNavigationProps) {
    return (
        <nav className="hidden border-t border-[#D4AF37]/10 lg:block">

            <div className="flex items-center justify-center gap-10 py-5">

                {menuItems.map((item) => (

                    <div
                        key={item.title}
                        className="relative pb-5"
                        onMouseEnter={() => setActiveMenu(item.title)}
                        onMouseLeave={() => setActiveMenu(null)}
                    >

                        {item.href ? (

                            <Link
                                href={item.href}
                                className="group relative flex items-center gap-2 uppercase text-sm font-medium tracking-[0.18em] text-white transition duration-300 hover:text-[#D4AF37]"
                            >

                                {item.title}

                                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>

                            </Link>

                        ) : (


                            <button
                                className="group relative flex items-center gap-2 uppercase text-sm font-medium tracking-[0.18em] text-white transition duration-300 hover:text-[#D4AF37]"
                            >

                                {item.title}

                                <FaChevronDown
                                    size={10}
                                    className={`transition duration-300 ${activeMenu === item.title ? "rotate-180" : ""
                                        }`}

                                />

                                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>

                            </button>

                        )}


                        {item.children && (
                            <MegaMenu
                                item={item}
                                visible={activeMenu === item.title}
                            />
                        )}


                    </div>

                ))}

                <Link
                    href="/contact"
                    className="ml-6 rounded-full bg-[#D4AF37] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-black transition duration-300 hover:scale-105"
                >
                    Get a Free Quote
                </Link>

            </div>

        </nav>
    );
}