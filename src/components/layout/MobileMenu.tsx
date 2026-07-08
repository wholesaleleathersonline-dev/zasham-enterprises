"use client";

interface MobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function MobileMenu({
  open,
}: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="lg:hidden border-t border-[#D4AF37]/20 bg-[#111111]">

      <div className="flex flex-col py-6">

        <a href="/" className="px-6 py-3 text-white hover:text-[#D4AF37]">
          Home
        </a>

        <a
          href="/team-uniforms/basketball"
          className="px-6 py-3 text-white hover:text-[#D4AF37]"
        >
          Basketball
        </a>

        <a
          href="/about"
          className="px-6 py-3 text-white hover:text-[#D4AF37]"
        >
          About Us
        </a>

        <a
          href="/contact"
          className="px-6 py-3 text-white hover:text-[#D4AF37]"
        >
          Contact Us
        </a>

      </div>

    </div>
  );
}