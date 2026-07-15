"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/animations";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/Videos/Hero-video/video-1.mp4" type="video/mp4" />
      </video>

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>
<div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-b from-transparent via-[#050505]/70 to-[#0F0F0F]"></div>
      {/* Content */}
    <motion.div
  className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
  variants={staggerContainer}
  initial="hidden"
  animate="show"
>
<motion.h1
  variants={fadeUp}
  className="text-5xl md:text-7xl font-extrabold leading-tight"
>
  Custom Sportswear <br />
  Manufacturer
</motion.h1>

        <motion.p
  variants={fadeUp}
  className="mt-6 max-w-3xl text-lg md:text-xl text-gray-200 leading-8"
>
  Premium Team Uniforms, Team Apparel & Accessories
  <br />
  Manufactured in Pakistan • Trusted Worldwide
</motion.p>
<motion.div
  variants={fadeUp}
  className="mt-10 flex flex-wrap justify-center gap-5"
>
  <button className="cursor-black rounded-full bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:scale-105">
    Get Free Mockup
  </button>

  <button className="cursor-black rounded-full border border-[#D4AF37] px-8 py-4 text-white transition hover:bg-[#D4AF37] hover:text-black">
    Request a Quote
  </button>
</motion.div>

      </motion.div>

    </section>
  );
}