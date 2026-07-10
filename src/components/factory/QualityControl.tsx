"use client";

import {
  FaCheckCircle,
  FaPrint,
  FaCut,
  FaBoxOpen,
} from "react-icons/fa";

interface QualityItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const qualityItems: QualityItem[] = [
  {
    icon: <FaCheckCircle size={34} />,
    title: "Premium Fabric Inspection",
    description:
      "Every fabric roll is carefully inspected before entering production to ensure premium quality.",
  },

  {
    icon: <FaPrint size={34} />,
    title: "HD Sublimation Printing",
    description:
      "Advanced sublimation printing delivers vibrant colors with long-lasting fade resistance.",
  },

  {
    icon: <FaCut size={34} />,
    title: "Precision Stitching",
    description:
      "Each uniform is stitched by experienced professionals and checked for perfect finishing.",
  },

  {
    icon: <FaBoxOpen size={34} />,
    title: "Final Packing Inspection",
    description:
      "Every order passes a final quality inspection before secure packaging and worldwide shipping.",
  },
];

export default function QualityControl() {
  return (
    <section className="bg-black py-24">

      <div className="mx-auto max-w-7xl px-5">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
            Quality Control
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Every Uniform Passes Strict Inspection
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-gray-400">
            From premium fabric selection to final packaging,
            every production stage follows strict quality control
            standards to ensure world-class sportswear.
          </p>

        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">          {qualityItems.map((item) => (
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

      </div>

    </section>
  );
}
        