"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#C8A44D15,transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />
      </div>

      {/* Gold Glow */}
      <div className="absolute left-1/2 top-0 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-[#C8A44D]/10 blur-[140px]" />

      {/* Hero Content */}
      <div className="relative mx-auto flex min-h-[calc(100vh-96px)] max-w-7xl items-center px-6 pt-44 pb-20 md:px-10 lg:min-h-[calc(100vh-110px)] lg:pt-52 lg:pb-24">
        <div className="mx-auto max-w-4xl text-center">

          {/* Label */}
          <span className="inline-flex rounded-full border border-[#C8A44D]/40 bg-[#C8A44D]/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#C8A44D]">
            The Journey of Zasham Enterprises
          </span>

          {/* Heading */}
          <h1 className="mt-8 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-7xl">
            From Passion
            <span className="block text-[#C8A44D]">
              to Performance
            </span>
          </h1>

          {/* Intro */}
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
            Every successful business begins with a dream. Ours began with
            determination, countless late nights, and a vision to build a
            premium sportswear manufacturing brand trusted by teams across the
            world.
          </p>

          {/* Buttons */}
          <div className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row">

            <Link
              href="/team-uniforms"
              className="group inline-flex items-center justify-center rounded-full bg-[#C8A44D] px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(200,164,77,0.35)]"
            >
              Explore Products
              <FaArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-[#C8A44D]/40 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-[#C8A44D] hover:bg-[#C8A44D]/10"
            >
              Contact Us
            </Link>

          </div>

        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#C8A44D]/40 to-transparent" />
    </section>
  );
}