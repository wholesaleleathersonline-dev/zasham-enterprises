"use client";

import { motion, Variants } from "framer-motion";
import {
  FaAward,
  FaHandshake,
  FaLightbulb,
  FaGlobeAmericas,
} from "react-icons/fa";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const values = [
  {
    icon: FaAward,
    title: "Quality First",
    description:
      "Every uniform is manufactured with premium fabrics, precision stitching, and strict quality inspection to ensure outstanding performance and durability.",
  },
  {
    icon: FaHandshake,
    title: "Customer Commitment",
    description:
      "Our goal is not just to complete an order but to build long-term partnerships based on trust, transparency, and reliable communication.",
  },
  {
    icon: FaLightbulb,
    title: "Innovation",
    description:
      "From modern sublimation printing to creative custom designs, we continuously improve every detail to deliver premium sportswear.",
  },
  {
    icon: FaGlobeAmericas,
    title: "Global Vision",
    description:
      "Proudly manufacturing in Pakistan while serving schools, clubs, organizations, and teams across the world with confidence.",
  },
];

export default function CompanyValues() {
  return (
    <section className="relative overflow-hidden bg-black py-24 lg:py-32">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C8A44D12,transparent_50%)]" />

        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-[#C8A44D]/5 blur-[140px]" />

        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-[#C8A44D]/5 blur-[140px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >

          <span className="inline-flex rounded-full border border-[#C8A44D]/30 bg-[#C8A44D]/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#C8A44D]">

            OUR VALUES

          </span>

          <h2 className="mt-8 text-4xl font-bold text-white md:text-5xl">

            The Values Behind

            <span className="block text-[#C8A44D]">

              Every Uniform

            </span>

          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">

            At Zasham Enterprises, every project is guided by principles that
            shape our work, strengthen customer relationships, and inspire us
            to deliver premium-quality sportswear to teams worldwide.

          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-[#C8A44D]/20 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-[#C8A44D]/60 hover:bg-white/[0.07] hover:shadow-[0_0_60px_rgba(200,164,77,.18)]"
              >

                {/* Hover Glow */}

                <div className="absolute inset-0 bg-[#C8A44D]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon */}

                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C8A44D]/30 bg-[#C8A44D]/10 text-[#C8A44D] transition-transform duration-500 group-hover:scale-110">

                  <Icon size={28} />

                </div>

                <h3 className="relative mt-8 text-2xl font-bold text-white">

                  {value.title}

                </h3>

                <div className="relative mt-4 h-1 w-14 rounded-full bg-[#C8A44D]" />

                <p className="relative mt-6 leading-8 text-gray-300">

                  {value.description}

                </p>

              </motion.div>
            );
          })}

        </div>

      </div>

      {/* Bottom Divider */}

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#C8A44D]/40 to-transparent" />

    </section>
  );
}