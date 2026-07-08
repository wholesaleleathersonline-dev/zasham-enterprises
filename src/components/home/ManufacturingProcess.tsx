"use client";

import { useState } from "react";

import {
  FaPencilRuler,
  FaPrint,
  FaCut,
  FaTshirt,
  FaCheckCircle,
  FaShippingFast,
} from "react-icons/fa";

const steps = [
  {
    title: "Design & Mockup",
    icon: <FaPencilRuler />,
    image: "/Pictures/Working1.png",
    description:
      "Professional custom mockups prepared according to your exact requirements.",
  },
  {
    title: "Sublimation Printing",
    icon: <FaPrint />,
    image: "/Pictures/Working2.png",
    description:
      "High-definition sublimation printing using premium imported inks.",
  },
  {
    title: "Precision Cutting",
    icon: <FaCut />,
    image: "/Pictures/Working3.png",
    description:
      "Laser precision cutting ensuring perfect fitting uniforms.",
  },
  {
    title: "Professional Stitching",
    icon: <FaTshirt />,
    image: "/Pictures/Working4.png",
    description:
      "Experienced stitching team delivering export quality garments.",
  },
  {
    title: "Quality Inspection",
    icon: <FaCheckCircle />,
    image: "/Pictures/Working5.png",
    description:
      "Every garment passes multiple quality inspections before packing.",
  },
  {
    title: "Worldwide Shipping",
    icon: <FaShippingFast />,
    image: "/Pictures/Working6.png",
    description:
      "Worldwide express shipping with trusted logistics partners.",
  },
];

export default function ManufacturingProcess() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#0F0F0F] py-28">

      <div className="mx-auto max-w-[1600px] px-6">

        <h2 className="text-center text-5xl font-bold text-[#D4AF37]">
          Manufacturing Process
        </h2>

        <p className="mt-4 text-center text-gray-400">
          From Design To Worldwide Delivery
        </p>

        {/* Timeline */}

       <div className="relative mt-24 mb-16">

          {/* Background Line */}

        <>
  {/* Background Line */}
  <div className="absolute left-0 top-10 h-[4px] w-full bg-[#D4AF37]/20"></div>

  {/* Active Gold Line */}
  <div
    className="absolute left-0 top-10 h-[4px] bg-[#D4AF37] transition-all duration-700"
    style={{
      width: `${(active / (steps.length - 1)) * 100}%`,
    }}
  ></div>
</>

          <div className="relative grid grid-cols-6 gap-6">

            {steps.map((step, index) => (

              <button
                key={step.title}
                onMouseEnter={() => setActive(index)}
                className="group flex w-full flex-col items-center"
              >

                <div
                  className={`z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 font-bold transition-all duration-500 ${
                    active === index
                     ? "scale-125 rotate-6 border-[#D4AF37] bg-[#D4AF37] text-black shadow-[0_0_35px_rgba(212,175,55,0.9)]"
                      : "shadow-[0_0_55px_rgba(212,175,55,0.95)]"
                  }`}
                >
                 <span className="text-[30px]">
  {step.icon}
</span>
                </div>

                <span
                  className={`mt-5 text-sm font-semibold transition ${
                    active === index
                      ? "text-[#D4AF37]"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>

              </button>

            ))}

          </div>

        </div>

        {/* Preview */}

        {/* Preview Section */}

<div className="mt-24 grid items-center gap-12 lg:grid-cols-2">

  {/* Left Image */}

  <div className="group relative overflow-hidden rounded-[35px] border border-[#D4AF37]/20 bg-[#111111] shadow-[0_0_50px_rgba(212,175,55,0.15)]">

    <img
      src={steps[active].image}
      alt={steps[active].title}
      className="h-[650px] w-full object-cover transition-all duration-700 group-hover:scale-105"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

  </div>

  {/* Right Content */}

  <div>

    <p className="mb-4 uppercase tracking-[0.35em] text-[#D4AF37]">
      Step 0{active + 1}
    </p>

    <h3 className="text-5xl font-bold leading-tight text-white">
      {steps[active].title}
    </h3>

    <p className="mt-8 text-xl leading-10 text-gray-400">
      {steps[active].description}
    </p>

    <div className="mt-10 h-[2px] w-40 bg-[#D4AF37]"></div>

  </div>

</div>

        {/* Text */}

        <div className="mt-12 text-center">

          <h3 className="text-4xl font-bold text-[#D4AF37]">
            {steps[active].title}
          </h3>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            {steps[active].description}
          </p>

        </div>

      </div>

    </section>
  );
}