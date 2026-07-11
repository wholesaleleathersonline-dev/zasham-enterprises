import Link from "next/link";

const accessoriesCategories = [
  {
    title: "Backpacks",
    href: "/accessories/backpacks",
  },
  {
    title: "Duffle Bags",
    href: "/accessories/duffle-bags",
  },
  {
    title: "Caps",
    href: "/accessories/caps",
  },
  {
    title: "Socks",
    href: "/accessories/socks",
  },
  {
    title: "Arm Sleeves",
    href: "/accessories/arm-sleeves",
  },
  {
    title: "Leg Sleeves",
    href: "/accessories/leg-sleeves",
  },
  {
    title: "Headbands",
    href: "/accessories/headbands",
  },
  {
    title: "Gloves",
    href: "/accessories/gloves",
  },
  {
    title: "Sports Towels",
    href: "/accessories/sports-towels",
  },
];

export default function AccessoriesPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">

      {/* Hero */}

      <section className="border-b border-[#D4AF37]/20 pt-44 pb-16 lg:pt-48">

        <div className="mx-auto max-w-7xl px-6">

          <p className="uppercase tracking-[0.35em] text-[#D4AF37]">
            Zasham Enterprises
          </p>

          <h1 className="mt-6 text-5xl font-black lg:text-6xl">
            Accessories
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Explore our premium sports accessories designed for athletes,
            clubs, schools and organizations. Manufactured with high-quality
            materials, professional craftsmanship and worldwide shipping.
          </p>

        </div>

      </section>

      {/* Categories */}

      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {accessoriesCategories.map((category) => (

              <Link
                key={category.title}
                href={category.href}
                className="group rounded-3xl border border-[#D4AF37]/20 bg-[#161616] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.20)]"
              >

                <h2 className="text-2xl font-bold text-white transition group-hover:text-[#D4AF37]">
                  {category.title}
                </h2>

                <p className="mt-4 leading-7 text-gray-400">
                  Premium custom {category.title.toLowerCase()} manufactured
                  with high-quality materials for athletes, teams, clubs,
                  schools and organizations.
                </p>

                <div className="mt-8 inline-flex items-center gap-2 font-semibold text-[#D4AF37]">
                  Explore Collection →
                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}