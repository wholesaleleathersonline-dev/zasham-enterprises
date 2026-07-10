"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.97,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slideLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -80,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slideRight: Variants = {
  hidden: {
    opacity: 0,
    x: 80,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function FounderStory() {
  return (
    <section className="relative overflow-hidden bg-black py-24 lg:py-32">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,#C8A44D12,transparent_45%)]" />

        <div className="absolute left-[-180px] top-[-120px] h-[550px] w-[550px] rounded-full bg-[#C8A44D]/5 blur-[170px]" />

        <div className="absolute right-[-180px] bottom-[-120px] h-[550px] w-[550px] rounded-full bg-[#C8A44D]/5 blur-[170px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Story */}

          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >

            <span className="inline-flex rounded-full border border-[#C8A44D]/30 bg-[#C8A44D]/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#C8A44D]">

              Founder Story

            </span>

            <h2 className="mt-8 text-4xl font-bold leading-tight text-white md:text-5xl">

              Built With Passion,

              <span className="block text-[#C8A44D]">

                Faith & Dedication

              </span>

            </h2>

            <div className="mt-10 space-y-7 text-gray-300 leading-8">

              <p>
                My name is{" "}
                <span className="font-semibold text-white">
                  Hamid Shahbaz
                </span>
                , and the story of Zasham Enterprises began with a dream,
                countless sleepless nights, and an unwavering determination to
                build something meaningful from the ground up.
              </p>

              <p>
                While continuing my studies as a{" "}
                <span className="font-semibold text-[#C8A44D]">
                  Software Engineer
                </span>
                , I spent my evenings and late nights learning digital
                marketing, communicating with international customers, and
                developing my own brand. Every challenge became an opportunity
                to learn, improve, and move one step closer to my vision.
              </p>

              <p>
                Although I have a strong background in software engineering—and
                this entire website has been designed and developed by
                me—my true passion has always been international business and
                exports. That passion inspired me to choose the sportswear
                manufacturing industry, where creativity, quality, and teamwork
                come together.
              </p>

              <p>
                In the beginning, every order mattered. Receiving orders of just
                10 to 20 custom uniforms helped me gain experience, build
                customer trust, and continuously improve our products and
                services. Those early orders laid the foundation for everything
                we are building today.
              </p>

              <p>
                Today, by the grace of{" "}
                <span className="font-semibold text-[#C8A44D]">
                  Allah (Alhamdulillah)
                </span>
                , Zasham Enterprises continues to grow while remaining committed
                to honesty, premium quality, and long-term relationships with
                customers around the world.
              </p>

            </div>

            {/* Signature */}

            <div className="mt-12 rounded-3xl border border-[#C8A44D]/20 bg-white/5 p-8 backdrop-blur-xl">

              <div className="h-1 w-16 rounded-full bg-[#C8A44D]" />

              <h3 className="mt-6 text-2xl font-bold text-white">
                Hamid Shahbaz
              </h3>

              <p className="mt-2 text-[#C8A44D] font-medium">
                Founder & Software Engineer
              </p>

              <p className="mt-5 leading-7 text-gray-400">
                "Success isn't built overnight. It is built through consistency,
                learning, faith, and the courage to keep moving forward every
                single day."
              </p>

            </div>

          </motion.div>

          {/* Founder Image */}

          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="relative"
          >


            {/* Gold Background Glow */}
            <div className="absolute -inset-8 rounded-[40px] bg-[#C8A44D]/10 blur-3xl" />

            {/* Image Card */}
            <div className="group relative overflow-hidden rounded-[32px] border border-[#C8A44D]/20 bg-[#0A0A0A] transition-all duration-700 hover:-translate-y-2 hover:border-[#C8A44D]/60 hover:shadow-[0_0_70px_rgba(200,164,77,.20)]">

              <Image
                src="/Pictures/fi.jpg"
                alt="Hamid Shahbaz - Founder of Zasham Enterprises"
                width={700}
                height={900}
                priority
                className="h-[420px] w-full object-contain transition-all duration-700 group-hover:scale-105 lg:h-[760px]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Founder Info */}
              <div className="absolute inset-x-0 bottom-0 p-8">

                <div className="rounded-2xl border border-[#C8A44D]/20 bg-black/40 p-6 backdrop-blur-xl">

                  <span className="text-sm uppercase tracking-[0.3em] text-[#C8A44D]">
                    Founder
                  </span>

                  <h3 className="mt-3 text-3xl font-bold text-white">
                    Hamid Shahbaz
                  </h3>

                  <p className="mt-2 text-gray-300">
                    Software Engineer • Entrepreneur • Export Business Enthusiast
                  </p>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#C8A44D]/40 to-transparent" />

    </section>
  );
}

          


            
            