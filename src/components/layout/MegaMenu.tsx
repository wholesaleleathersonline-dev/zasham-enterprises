"use client";

import Link from "next/link";
import { MenuItem } from "./HeaderData";

interface MegaMenuProps {
  item: MenuItem;
  visible: boolean;
}

export default function MegaMenu({
  item,
  visible,
}: MegaMenuProps) {
  if (!item.children || !visible) return null;

  return (
    <div className="absolute left-1/2 top-full  z-50 w-[760px] -translate-x-1/2 overflow-hidden rounded-3xl border border-[#D4AF37]/60 bg-[#111111] shadow-[0_0_25px_rgba(212,175,55,0.35),0_25px_60px_rgba(0,0,0,0.75)]">



      <div className="grid grid-cols-[320px_1fr]">

        {/* LEFT */}

        <div className="border-r border-[#D4AF37]/10 py-6">

          {item.children.map((child) => (

            <Link
              key={child.title}
              href={child.href}
              className="flex items-center justify-between px-8 py-4 text-sm text-white transition duration-300 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
            >

              {child.title}

              <span>→</span>

            </Link>

          ))}

        </div>

        {/* RIGHT */}

        <div className="flex flex-col justify-between bg-gradient-to-br from-[#181818] to-[#0E0E0E] p-10">

          <div>

            <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">
              {item.badge}
            </p>

            <h3 className="mt-5 text-3xl font-black leading-tight text-white">
              {item.heading}
            </h3>

            <p className="mt-6 leading-8 text-gray-400">
              {item.description}
            </p>

          </div>

          <div className="mt-8 space-y-3">
            {item.features?.map((feature) => (
              <div key={feature} className="text-white">
                ✓ {feature}
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className="mt-10 rounded-full bg-[#D4AF37] px-7 py-4 text-center font-bold uppercase tracking-[0.18em] text-black transition hover:scale-105"
          >
            {item.cta ?? "Get a Free Quote"}
          </Link>

        </div>

      </div>

    </div>
  );
}