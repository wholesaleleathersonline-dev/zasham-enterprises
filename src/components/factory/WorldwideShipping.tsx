"use client";

import {
  FaShippingFast,
  FaGlobeAmericas,
  FaPlaneDeparture,
  FaFileInvoiceDollar,
} from "react-icons/fa";

interface ShippingItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const shippingItems: ShippingItem[] = [
  {
    icon: <FaShippingFast size={34} />,
    title: "Fast Production",
    description:
      "Average production time of just 10 working days after design approval.",
  },

  {
    icon: <FaPlaneDeparture size={34} />,
    title: "Worldwide Delivery",
    description:
      "Reliable door-to-door shipping with trusted international courier partners.",
  },

  {
    icon: <FaFileInvoiceDollar size={34} />,
    title: "Export Documentation",
    description:
      "Complete customs documentation and export support for international orders.",
  },

  {
    icon: <FaGlobeAmericas size={34} />,
    title: "50+ Countries Served",
    description:
      "Supplying premium custom sportswear to schools, clubs and organizations worldwide.",
  },
];

export default function WorldwideShipping() {
  return (
    <section className="bg-black py-24">

      <div className="mx-auto max-w-7xl px-5">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
            Worldwide Shipping
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Delivering Premium Sportswear Across The Globe
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-gray-400">
            From Pakistan to more than 50 countries, we provide
            secure worldwide shipping, professional export
            documentation and fast production for every order.
          </p>

        </div>

        {/* Courier Logos */}

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-6">

          <span className="text-xl font-bold text-[#D4AF37]">
            DHL
          </span>

          <span className="text-xl font-bold text-[#D4AF37]">
            FedEx
          </span>

          <span className="text-xl font-bold text-[#D4AF37]">
            UPS
          </span>

          <span className="text-xl font-bold text-[#D4AF37]">
            TNT
          </span>

        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
                      {shippingItems.map((item) => (
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

        {/* Bottom Info */}

        <div className="mt-16 rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-8 text-center">

          <h3 className="text-3xl font-bold text-white">
            Trusted International Shipping
          </h3>

          <p className="mx-auto mt-5 max-w-4xl text-gray-400 leading-8">
            We proudly deliver custom sportswear worldwide with secure packaging,
            reliable courier services and complete export documentation.
            Whether you're ordering for a school, sports club or professional team,
            your uniforms are manufactured with precision and shipped safely to your destination.
          </p>

        </div>

      </div>

    </section>
  );
}