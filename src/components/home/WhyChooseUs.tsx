"use client";

import CountUp from "react-countup";

import {
  FaUsers,
  FaGlobe,
  FaClock,
  FaBoxes,
  FaIndustry,
  FaHeadset,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers size={34} />,
    number: "750+",
    title: "Teams Served",
  },
  {
    icon: <FaGlobe size={34} />,
    number: "35+",
    title: "Countries",
  },
  {
    icon: <FaClock size={34} />,
    number: "10 Days",
    title: "Turnaround",
  },
  {
    icon: <FaBoxes size={34} />,
    number: "10 PCS",
    title: "Minimum Order",
  },
  {
    icon: <FaIndustry size={34} />,
    number: "OEM",
    title: "Manufacturing",
  },
  {
    icon: <FaHeadset size={34} />,
    number: "24/7",
    title: "Support",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#0F0F0F] py-28">

      <div className="mx-auto max-w-[1600px] px-6">

        <h2 className="text-center text-5xl font-bold text-[#D4AF37]">
          Why Choose Zasham Enterprises
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-center text-lg text-gray-400">
          Trusted by sports teams, clubs, schools and organizations
          worldwide for premium custom sportswear manufacturing.
        </p>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {stats.map((item) => (

            <div
              key={item.title}
             className="group relative overflow-hidden rounded-[30px] border border-[#D4AF37]/20 bg-[#111111] p-10 transition-all duration-500 hover:-translate-y-4 hover:border-[#D4AF37] hover:shadow-[0_0_70px_rgba(212,175,55,0.35)]"
            >
                <div className="absolute left-0 top-0 h-1 w-0 bg-[#D4AF37] transition-all duration-500 group-hover:w-full"></div>

              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#D4AF37] text-black transition duration-500 group-hover:scale-110">

                {item.icon}

              </div>

              <h3 className="text-5xl font-extrabold text-[#D4AF37]">

               {item.number === "750+" ? (
  <>
    <CountUp end={750} duration={2.5} />+
  </>
) : item.number === "35+" ? (
  <>
    <CountUp end={35} duration={2.5} />+
  </>
) : item.number === "10 Days" ? (
  "10 Days"
) : item.number === "10 PCS" ? (
  "10 PCS"
) : item.number === "OEM" ? (
  "OEM"
) : (
  "24/7"
)}

              </h3>

              <p className="mt-5 text-xl font-semibold text-white">

                {item.title}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}