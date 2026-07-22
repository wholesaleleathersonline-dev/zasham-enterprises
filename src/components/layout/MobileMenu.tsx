"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { menuItems } from "./HeaderData";

interface MobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function MobileMenu({
  open,
  setOpen,
}: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className="lg:hidden border-t border-[#D4AF37]/20 bg-[#111111]">
      <div className="flex h-full flex-col overflow-y-auto pt-20 py-3">

        {menuItems.map((item) => (
          <div key={item.title} className="border-b border-[#D4AF37]/10">

            {item.children ? (
              <>
                <button
                  onClick={() =>
                    setExpanded(
                      expanded === item.title ? null : item.title
                    )
                  }
                  className="flex w-full items-center justify-between px-6 py-4 text-left uppercase tracking-[0.15em] text-white transition hover:text-[#D4AF37]"
                >
                  <span>{item.title}</span>

                  {expanded === item.title ? (
                    <FaChevronUp size={14} />
                  ) : (
                    <FaChevronDown size={14} />
                  )}
                </button>

                {expanded === item.title && (
                  <div className="bg-black/20">

                    {item.children.map((child) => (
                      <Link
                        key={child.title}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="block px-10 py-3 text-sm text-gray-300 transition hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                      >
                        {child.title}
                      </Link>
                    ))}

                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href || "#"}
                onClick={() => setOpen(false)}
                className="block px-6 py-4 uppercase tracking-[0.15em] text-white transition hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
              >
                {item.title}
              </Link>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}