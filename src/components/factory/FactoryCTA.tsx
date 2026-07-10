"use client";

import Link from "next/link";
import {
  FaCheckCircle,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

const benefits = [
  "Free Professional Mockup",
  "MOQ Only 10 Sets",
  "Premium Sports Fabric",
  "10 Days Production",
  "Worldwide Shipping",
  "Factory Direct Pricing",
];

export default function FactoryCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-28">

      {/* Glow */}

      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5">

        <div className="rounded-[40px] border border-[#D4AF37]/20 bg-[#111111]/90 p-10 backdrop-blur-xl lg:p-16">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
              Ready To Start?
            </p>

            <h2 className="mt-5 text-4xl font-bold text-white md:text-6xl">
              Let's Build Your
              <span className="block text-[#D4AF37]">
                Custom Team Uniforms
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
              Whether you're a school, sports club or professional
              organization, our factory is ready to manufacture
              premium custom uniforms with fast production and
              worldwide delivery.
            </p>

          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"></div>
                    {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-4 rounded-2xl border border-[#D4AF37]/20 bg-black/40 p-5 transition-all duration-500 hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.18)]"
            >
              <FaCheckCircle
                size={20}
                className="shrink-0 text-[#D4AF37]"
              />

              <span className="text-white">
                {benefit}
              </span>
            </div>
          ))}

          <div className="mt-16 flex flex-col items-center justify-center gap-5 sm:flex-row">

            <Link
              href="/contact"
              className="rounded-full bg-[#D4AF37] px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition duration-300 hover:scale-105"
            >
              Get Free Quote
            </Link>

            <a
              href="https://wa.me/923492355983"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full border border-[#D4AF37]/20 px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <FaWhatsapp size={18} />
              WhatsApp
            </a>

            <a
              href="mailto:hafizmateen555@gmail.com"
              className="flex items-center gap-3 rounded-full border border-[#D4AF37]/20 px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <FaEnvelope size={18} />
              Email Us
            </a>

          </div>

          <div className="mt-14 border-t border-[#D4AF37]/20 pt-8 text-center">

            <p className="text-sm uppercase tracking-[0.25em] text-[#D4AF37]">
              Premium Manufacturing • Factory Direct • Worldwide Shipping
            </p>

            <p className="mt-4 text-gray-500">
              Zasham Enterprises manufactures premium custom sportswear
              for schools, clubs and professional teams with factory-direct
              pricing and reliable worldwide delivery.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}