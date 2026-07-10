"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaIndustry,
  FaUsers,
  FaGlobeAmericas,
  FaTshirt,
} from "react-icons/fa";

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  title: string;
  description: string;
}

const stats: Stat[] = [
  {
    icon: <FaIndustry size={34} />,
    value: 10,
    suffix: "+",
    title: "Years Experience",
    description: "Manufacturing premium custom sportswear.",
  },
  {
    icon: <FaUsers size={34} />,
    value: 150,
    suffix: "+",
    title: "Skilled Workers",
    description: "Professional production & stitching team.",
  },
  {
    icon: <FaTshirt size={34} />,
    value: 500,
    suffix: "K+",
    title: "Uniforms Produced",
    description: "Successfully manufactured worldwide.",
  },
  {
    icon: <FaGlobeAmericas size={34} />,
    value: 50,
    suffix: "+",
    title: "Countries Served",
    description: "Exporting globally with fast delivery.",
  },
];

export default function FactoryStats() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [visible, setVisible] = useState(false);

  const [counts, setCounts] = useState(
    stats.map(() => 0)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    stats.forEach((stat, index) => {
      let start = 0;

      const duration = 1800;

      const increment = stat.value / (duration / 20);

      const timer = setInterval(() => {
        start += increment;

        if (start >= stat.value) {
          start = stat.value;
          clearInterval(timer);
        }

        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = Math.floor(start);
          return updated;
        });
      }, 20);
    });
  }, [visible]);

  return (
    <section
  ref={sectionRef}
  className="bg-black pt-52 pb-24 lg:pt-60"
>
      <div className="mx-auto max-w-7xl px-5">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
            Factory Statistics
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Our Manufacturing Capacity
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-gray-400">
            Every uniform is manufactured with precision,
            premium materials and strict quality control to
            deliver world-class sportswear.
          </p>

        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

                  {stats.map((stat, index) => (
            <div
              key={stat.title}
              className="group rounded-3xl border border-[#D4AF37]/20 bg-[#111111] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.18)]"
            >
              <div className="flex justify-center text-[#D4AF37] transition duration-300 group-hover:scale-110">
                {stat.icon}
              </div>

              <h3 className="mt-6 text-center text-5xl font-bold text-white">
                {counts[index]}
                <span className="text-[#D4AF37]">
                  {stat.suffix}
                </span>
              </h3>

              <h4 className="mt-4 text-center text-xl font-semibold text-white">
                {stat.title}
              </h4>

              <p className="mt-3 text-center text-sm leading-7 text-gray-400">
                {stat.description}
              </p>

              <div className="mx-auto mt-6 h-[2px] w-16 bg-[#D4AF37] transition-all duration-500 group-hover:w-24" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}