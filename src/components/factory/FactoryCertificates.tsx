"use client";

import {
  FaAward,
  FaLeaf,
  FaShieldAlt,
  FaHandshake,
  FaGlobeAmericas,
  FaBoxOpen,
} from "react-icons/fa";

interface CertificationItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const certifications: CertificationItem[] = [
  {
    icon: <FaAward size={34} />,
    title: "Premium Quality",
    description:
      "Manufactured using high-performance sports fabrics with exceptional durability and comfort.",
  },

  {
    icon: <FaShieldAlt size={34} />,
    title: "Precision Manufacturing",
    description:
      "Every uniform is professionally stitched and inspected before leaving our factory.",
  },

  {
    icon: <FaLeaf size={34} />,
    title: "Eco-Friendly Production",
    description:
      "Responsible manufacturing practices with premium sublimation technology.",
  },

  {
    icon: <FaBoxOpen size={34} />,
    title: "Secure Packaging",
    description:
      "Every order is professionally packed for safe international transportation.",
  },

  {
    icon: <FaGlobeAmericas size={34} />,
    title: "Worldwide Export",
    description:
      "Supplying premium custom sportswear to schools, clubs and organizations worldwide.",
  },

  {
    icon: <FaHandshake size={34} />,
    title: "Manufacturer Direct",
    description:
      "Factory-direct pricing with complete customization and dedicated customer support.",
  },
];

export default function FactoryCertifications() {
  return (
    <section className="bg-black py-24">

      <div className="mx-auto max-w-7xl px-5">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
            Manufacturing Standards
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Built On Quality & Trust
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-gray-400">
            Every custom uniform is manufactured with premium materials,
            advanced production techniques and strict quality standards
            to ensure international-level performance.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                      {certifications.map((item) => (
            <div
              key={item.title}
              className="group rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.18)]"
            >
              <div className="flex justify-center text-[#D4AF37] transition duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              <h3 className="mt-6 text-center text-2xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-4 text-center text-sm leading-7 text-gray-400">
                {item.description}
              </p>

              <div className="mx-auto mt-6 h-[2px] w-16 bg-[#D4AF37] transition-all duration-500 group-hover:w-24" />
            </div>
          ))}

        </div>

        {/* Bottom Trust Banner */}

        <div className="mt-20 rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-10 text-center">

          <h3 className="text-3xl font-bold text-white">
            Trusted Manufacturing Partner
          </h3>

          <p className="mx-auto mt-6 max-w-4xl leading-8 text-gray-400">
            Zasham Enterprises is committed to delivering premium-quality
            custom sportswear with advanced manufacturing, strict quality
            inspection, reliable worldwide shipping and dedicated customer
            support. Every order is produced with precision to meet the
            expectations of schools, clubs and professional teams across
            the globe.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">

            <span className="rounded-full border border-[#D4AF37]/20 px-5 py-2 text-sm font-medium text-[#D4AF37]">
              Premium Quality
            </span>

            <span className="rounded-full border border-[#D4AF37]/20 px-5 py-2 text-sm font-medium text-[#D4AF37]">
              Factory Direct
            </span>

            <span className="rounded-full border border-[#D4AF37]/20 px-5 py-2 text-sm font-medium text-[#D4AF37]">
              Worldwide Shipping
            </span>

            <span className="rounded-full border border-[#D4AF37]/20 px-5 py-2 text-sm font-medium text-[#D4AF37]">
              MOQ 10 Sets
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}