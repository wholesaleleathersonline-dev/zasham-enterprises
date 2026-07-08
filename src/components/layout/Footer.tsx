"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#070707] border-t border-[#D4AF37]/10">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#D4AF37]/5 blur-[220px]"></div>

      {/* ================= CTA ================= */}

      <div className="mx-auto max-w-7xl px-6 pt-24">

        <div className="relative overflow-hidden rounded-[40px] border border-[#D4AF37]/20 bg-gradient-to-br from-[#111111] via-[#181818] to-[#0B0B0B] p-16">

          <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-[#D4AF37]/10 blur-[120px]"></div>

          <div className="relative z-10">

            <p className="text-center uppercase tracking-[0.45em] text-[#D4AF37]">

              LET'S WORK TOGETHER

            </p>

            <h2 className="mt-6 text-center text-6xl font-black leading-tight text-white">

              Ready To Start

              <span className="block text-[#D4AF37]">

                Your Project?

              </span>

            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-center text-xl leading-9 text-gray-400">

              Get your free mockup, quotation and production consultation
              within 24 hours.

            </p>

            {/* Email */}

            <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-5 md:flex-row">

              <input
                type="email"
                placeholder="Enter Your Email Address..."
                className="h-16 flex-1 rounded-full border border-[#D4AF37]/30 bg-black/50 px-8 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-[#D4AF37] focus:shadow-[0_0_25px_rgba(212,175,55,0.35)]"
              />

              <button className="group flex h-16 items-center justify-center gap-3 rounded-full bg-[#D4AF37] px-10 font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.45)]">

                GET FREE MOCKUP

                <FaArrowRight className="transition group-hover:translate-x-1" />

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Footer Content */}

      <div className="mx-auto mt-24 max-w-7xl px-6 pb-10">

       <div className="grid gap-16 lg:grid-cols-4">
                  {/* Company */}

          <div>

            <img
              src="/logo/ze-logo.png"
              alt="Zasham Enterprises"
              className="h-20 w-auto"
            />

            <p className="mt-8 leading-8 text-gray-400">

              Zasham Enterprises is a premium custom sportswear manufacturer
              specializing in high-quality team uniforms, apparel and
              accessories for clubs, schools and organizations worldwide.

            </p>

            <div className="mt-10 flex gap-4">

              <a
                href="https://www.facebook.com/profsportsgear"
                target="_blank"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#111111] text-[#D4AF37] transition-all duration-300 hover:scale-110 hover:bg-[#D4AF37] hover:text-black"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/prosports.gear"
                target="_blank"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#111111] text-[#D4AF37] transition-all duration-300 hover:scale-110 hover:bg-[#D4AF37] hover:text-black"
              >
                <FaInstagram />
              </a>

              <a
                href="https://wa.me/923492355983"
                target="_blank"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#111111] text-[#D4AF37] transition-all duration-300 hover:scale-110 hover:bg-[#D4AF37] hover:text-black"
              >
                <FaWhatsapp />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-2xl font-bold text-white">

              Quick Links

            </h3>

            <div className="mt-8 flex flex-col gap-5">

              <Link href="/" className="text-gray-400 transition hover:text-[#D4AF37]">
                Home
              </Link>

              <Link href="/about" className="text-gray-400 transition hover:text-[#D4AF37]">
                About Us
              </Link>

              <Link href="/factory" className="text-gray-400 transition hover:text-[#D4AF37]">
                Factory
              </Link>

              <Link href="/contact" className="text-gray-400 transition hover:text-[#D4AF37]">
                Contact
              </Link>

              <Link href="/quote" className="text-gray-400 transition hover:text-[#D4AF37]">
                Get Quote
              </Link>

            </div>

          </div>

          {/* Categories */}

          <div>

            <h3 className="text-2xl font-bold text-white">

              Categories

            </h3>

            <div className="mt-8 flex flex-col gap-5">

              <Link href="/basketball" className="text-gray-400 transition hover:text-[#D4AF37]">
                Basketball Uniforms
              </Link>

              <Link href="/american-football" className="text-gray-400 transition hover:text-[#D4AF37]">
                American Football
              </Link>

              <Link href="/baseball" className="text-gray-400 transition hover:text-[#D4AF37]">
                Baseball
              </Link>

              <Link href="/soccer" className="text-gray-400 transition hover:text-[#D4AF37]">
                Soccer
              </Link>

              <Link href="/accessories" className="text-gray-400 transition hover:text-[#D4AF37]">
                Accessories
              </Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-2xl font-bold text-white">

              Contact Us

            </h3>

            <div className="mt-8 space-y-6">

              <div className="flex items-start gap-4">

                <FaPhoneAlt className="mt-1 text-[#D4AF37]" />

                <span className="text-gray-400">
                  +92 349 6135559
                </span>

              </div>

              <div className="flex items-start gap-4">

                <FaEnvelope className="mt-1 text-[#D4AF37]" />

                <span className="text-gray-400">
                  wholesaleleathersonline@gmail.com
                </span>

              </div>

              <div className="flex items-start gap-4">

                <FaMapMarkerAlt className="mt-1 text-[#D4AF37]" />

                <span className="text-gray-400">
                  Sialkot, Punjab, Pakistan
                </span>

              </div>

            </div>

          </div>

        </div>
                {/* Bottom */}

        <div className="mt-20 border-t border-[#D4AF37]/10 pt-8">

          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row">

            <p className="text-gray-500">

              © {new Date().getFullYear()} Zasham Enterprises.
              All Rights Reserved.

            </p>

            <div className="flex items-center gap-8">

              <Link
                href="/privacy-policy"
                className="text-gray-500 transition hover:text-[#D4AF37]"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-conditions"
                className="text-gray-500 transition hover:text-[#D4AF37]"
              >
                Terms & Conditions
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}