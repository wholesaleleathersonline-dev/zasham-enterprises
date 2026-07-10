"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {  Variants } from "framer-motion";

interface TimelineItem {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Precision Stitching",
    description:
      "Every uniform is carefully stitched by skilled professionals using advanced industrial sewing machines. Every seam is inspected to ensure durability, comfort, and long-lasting performance for athletes at every level.",
    image: "/Pictures/img1.png",
    alt: "Uniform stitching",
  },
  {
    id: 2,
    title: "Premium Sublimation Printing",
    description:
      "Using advanced sublimation technology, every color and design becomes a permanent part of the fabric, producing vibrant graphics that never crack, peel, or fade.",
    image: "/Pictures/img2.png",
    alt: "Sublimation printing",
  },
  {
    id: 3,
    title: "Worldwide Shipping",
    description:
      "Every completed order is quality-checked, securely packed, and prepared for international delivery through trusted logistics partners. Express and standard shipping options ensure timely delivery worldwide.",
    image: "/Pictures/img4.png",
    alt: "Worldwide shipping",
  },
  {
    id: 4,
    title: "Professional Presentation",
    description:
      "Before reaching our customers, every collection is professionally photographed to showcase the craftsmanship, attention to detail, and premium finish that define the Zasham Enterprises brand.",
    image: "/Pictures/img3.jpg",
    alt: "Professional photoshoot",
  },
];

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.96,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const slideLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -80,
    scale: 0.95,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const slideRight: Variants = {
  hidden: {
    opacity: 0,
    x: 80,
    scale: 0.95,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function AboutTimeline() {
  return (
    <section className="relative overflow-hidden bg-black py-24 lg:py-32">

      {/* Premium Background */}
      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#C8A44D15,transparent_45%)]" />

        <div className="absolute left-[-180px] top-[-120px] h-[550px] w-[550px] rounded-full bg-[#C8A44D]/5 blur-[170px]" />

        <div className="absolute right-[-180px] bottom-[-120px] h-[550px] w-[550px] rounded-full bg-[#C8A44D]/5 blur-[170px]" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        {/* Section Heading */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-28 max-w-5xl text-center"
        >

          <span className="inline-flex rounded-full border border-[#C8A44D]/30 bg-[#C8A44D]/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#C8A44D] backdrop-blur-md">

            OUR JOURNEY

          </span>

          <h2 className="mt-8 text-4xl font-extrabold leading-tight text-white md:text-5xl xl:text-6xl">

            From Manufacturing

            <span className="mt-2 block text-[#C8A44D]">

              To Worldwide Delivery

            </span>

          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-gray-400 md:text-lg">

            Every custom uniform follows a carefully managed journey—from
            precision manufacturing and vibrant sublimation printing to secure
            worldwide shipping and professional presentation. Every step reflects
            our commitment to quality, craftsmanship, reliability, and customer
            satisfaction.

          </p>

        </motion.div>

        {/* Timeline */}

        <div className="relative">

          {/* Animated Vertical Line */}

          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="absolute left-1/2 top-0 hidden h-full w-[3px] origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-[#C8A44D] via-[#FFD56A] to-[#C8A44D] shadow-[0_0_25px_rgba(200,164,77,0.6)] lg:block"
          />

          {/* Timeline Items */}

          <div className="space-y-40">

            {timelineData.map((item, index) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      key={item.id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="relative"
    >
      {/* Premium Timeline Dot */}

      <div className="absolute left-1/2 top-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 lg:block">

        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#C8A44D] bg-black shadow-[0_0_30px_rgba(200,164,77,.45)]">

          <span className="absolute h-8 w-8 animate-ping rounded-full bg-[#C8A44D]/20" />

          <span className="absolute h-12 w-12 rounded-full border border-[#C8A44D]/20" />

          <span className="relative h-3 w-3 rounded-full bg-[#C8A44D]" />

        </div>

      </div>

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">

        {/* LEFT */}

        <motion.div
          variants={isEven ? slideLeft : slideRight}
          className={`${isEven ? "" : "lg:order-2"} h-full`}
        >
          {isEven ? (

            <div className="group relative h-full overflow-hidden rounded-3xl border border-[#C8A44D]/20 bg-[#0A0A0A] transition-all duration-500 hover:-translate-y-2 hover:border-[#C8A44D]/60 hover:shadow-[0_0_60px_rgba(200,164,77,.18)]">

              <Image
                src={item.image}
                alt={item.alt}
                width={900}
                height={700}
                className="h-[260px] w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-[0.4deg] sm:h-[340px] lg:h-[430px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent transition-all duration-500 group-hover:from-black/40" />

            </div>

          ) : (

            <div className="flex h-full flex-col justify-center rounded-3xl border border-[#C8A44D]/20 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#C8A44D]/60 hover:bg-white/[0.07] hover:shadow-[0_0_60px_rgba(200,164,77,.18)] lg:p-10">

              <span className="text-6xl font-black leading-none text-[#C8A44D]/15">
                0{item.id}
              </span>

              <h3 className="mt-4 text-3xl font-bold text-white">
                {item.title}
              </h3>

              <div className="mt-5 h-1 w-16 rounded-full bg-[#C8A44D]" />

              <p className="mt-6 text-[16px] leading-8 text-gray-300">
                {item.description}
              </p>

            </div>

          )}
        </motion.div>

        {/* RIGHT */}

        <motion.div
          variants={isEven ? slideRight : slideLeft}
          className={`${isEven ? "" : "lg:order-1"} h-full`}
        >
          {isEven ? (

            <div className="flex h-full flex-col justify-center rounded-3xl border border-[#C8A44D]/20 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#C8A44D]/60 hover:bg-white/[0.07] hover:shadow-[0_0_60px_rgba(200,164,77,.18)] lg:p-10">

              <span className="text-6xl font-black leading-none text-[#C8A44D]/15">
                0{item.id}
              </span>

              <h3 className="mt-4 text-3xl font-bold text-white">
                {item.title}
              </h3>

              <div className="mt-5 h-1 w-16 rounded-full bg-[#C8A44D]" />

              <p className="mt-6 text-[16px] leading-8 text-gray-300">
                {item.description}
              </p>

            </div>

          ) : (

            <div className="group relative h-full overflow-hidden rounded-3xl border border-[#C8A44D]/20 bg-[#0A0A0A] transition-all duration-500 hover:-translate-y-2 hover:border-[#C8A44D]/60 hover:shadow-[0_0_60px_rgba(200,164,77,.18)]">

              <Image
                src={item.image}
                alt={item.alt}
                width={900}
                height={700}
                className="h-[260px] w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:-rotate-[0.4deg] sm:h-[340px] lg:h-[430px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent transition-all duration-500 group-hover:from-black/40" />

            </div>

          )}
        </motion.div>

      </div>
    </motion.div>
  );
})}

          </div>

          {/* Premium Timeline Ending */}

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative z-20 mt-32 flex justify-center bg-black py-12"
          >
            <div className="flex flex-col items-center text-center">

              {/* Premium Gold Pulse */}

              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#C8A44D]/40 bg-[#C8A44D]/10 backdrop-blur-xl">

                <span className="absolute h-20 w-20 animate-ping rounded-full bg-[#C8A44D]/10" />

                <span className="absolute h-14 w-14 rounded-full border border-[#C8A44D]/30" />

                <span className="relative h-5 w-5 rounded-full bg-[#C8A44D] shadow-[0_0_25px_rgba(200,164,77,.8)]" />

              </div>

              {/* Gold Line */}

              <div className="mt-6 h-20 w-px bg-gradient-to-b from-[#C8A44D] via-[#FFD56A] to-transparent" />

              {/* Decorative Line */}

              <div className="mt-10 h-px w-40 bg-gradient-to-r from-transparent via-[#C8A44D] to-transparent" />

              {/* Text */}

              <h3 className="mt-8 text-3xl font-bold text-white">
                Crafted with
                <span className="text-[#C8A44D]"> Passion</span>
              </h3>

              <p className="mt-3 text-lg text-gray-400">
                Delivered with Excellence
              </p>

              <p className="mt-6 max-w-2xl leading-8 text-gray-500">
                Every uniform we manufacture reflects our dedication to
                precision, quality craftsmanship, and long-term partnerships
                with teams around the world.
              </p>

              <div className="mt-10 h-px w-56 bg-gradient-to-r from-transparent via-[#C8A44D] to-transparent" />

            </div>
          </motion.div>

        </div>

      </div>

      {/* Premium Bottom Glow */}

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#C8A44D]/50 to-transparent" />

      <div className="absolute bottom-0 left-1/2 h-32 w-[420px] -translate-x-1/2 rounded-full bg-[#C8A44D]/10 blur-[120px]" />

    </section>
  );
}
