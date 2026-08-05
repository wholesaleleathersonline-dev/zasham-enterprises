import Link from "next/link";
import Image from "next/image";
import { getSportsCategories } from "../../services/admin/sportsCategories.service";

export default async function SportsCategories() {
  const sports = await getSportsCategories();

  return (
    <section className="bg-[#0F0F0F] py-24 px-6">
      <div className="mx-auto max-w-7xl">

        <h2 className="text-center text-5xl font-bold text-[#D4AF37]">
          Explore Sports
        </h2>

        <p className="mt-4 mb-16 text-center text-gray-400">
          Custom Uniforms & Apparel For Every Sport
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sports.map((sport) => (
            <Link
              key={sport.id}
              href={`/team-uniforms/${sport.slug}`}
              className="group cursor-hover relative block overflow-hidden rounded-3xl"
            >
              <Image
src={sport.image ?? "/Pictures/Basketball.png"}
                alt={sport.name}
                width={500}
                height={420}
                className="h-[420px] w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
              />

              <div className="absolute inset-0 bg-black/55 transition-all duration-500 group-hover:bg-black/25"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-3xl font-bold text-white">
                  {sport.name}
                </h3>

                <span className="mt-3 text-[#D4AF37] opacity-0 transition duration-500 group-hover:opacity-100">
                  Explore Collection →
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}