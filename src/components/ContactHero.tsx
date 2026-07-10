"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useCallback } from "react";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ContactHero() {

const scrollToForm = useCallback(() => {
  const section = document.getElementById("contact-form");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}, []);


  
  return (
    <section className="relative overflow-hidden bg-black pt-44 pb-24 lg:pt-52 lg:pb-32">
      {/* Background */}
      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#C8A44D18,transparent_55%)]" />

        <div className="absolute left-[-180px] top-[-120px] h-[500px] w-[500px] rounded-full bg-[#C8A44D]/5 blur-[180px]" />

        <div className="absolute right-[-180px] bottom-[-120px] h-[500px] w-[500px] rounded-full bg-[#C8A44D]/5 blur-[180px]" />

        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-5xl text-center"
        >

          {/* Badge */}

          <span className=" mt-3 inline-flex rounded-full border border-[#C8A44D]/30 bg-[#C8A44D]/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#C8A44D]">

            Contact Us

          </span>

          {/* Heading */}

          <h1 className="mt-8 text-4xl font-extrabold leading-[1.1] text-white md:text-6xl lg:text-7xl">

            Let's Build Your

            <span className="mt-2 block text-[#C8A44D]">

              Next Winning Uniform

            </span>

          </h1>

          {/* Description */}

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400 md:text-xl">

            Whether you're ordering for a school, club, academy, organization,
            or professional team, we're ready to manufacture premium custom
            sportswear tailored to your exact requirements.

          </p>

          {/* Buttons */}

          <div className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row">

          <button
  type="button"
  onClick={scrollToForm}
  className="group inline-flex items-center justify-center rounded-full bg-[#C8A44D] px-8 py-4 font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(200,164,77,.35)]"
>
  Click to Send Inquiry
  </button>

            <Link
              href="/team-uniforms"
              className="rounded-full border border-[#C8A44D]/30 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-[#C8A44D] hover:bg-[#C8A44D]/10"
            >
              Browse Products
            </Link>

          </div>

          {/* Stats */}

          <div className="mt-16 flex flex-col items-center justify-center gap-6 text-gray-300 sm:flex-row sm:gap-10">

            <div className="flex items-center gap-3">

              <FaCheckCircle className="text-[#C8A44D]" />

              <span>Worldwide Shipping</span>

            </div>

            <div className="flex items-center gap-3">

              <FaCheckCircle className="text-[#C8A44D]" />

              <span>MOQ 10 Pieces</span>

            </div>

            <div className="flex items-center gap-3">

              <FaCheckCircle className="text-[#C8A44D]" />

              <span>Premium Quality</span>

            </div>

          </div>

        </motion.div>

      </div>

      {/* Bottom Divider */}

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#C8A44D]/40 to-transparent" />

    </section>
  );
}