import Link from "next/link";

const sports = [
  {
    title: "Basketball",
    href: "/team-uniforms/basketball",
  },
  {
    title: "American Football",
    href: "/team-uniforms/american-football",
  },
  {
    title: "Flag Football",
    href: "/team-uniforms/flag-football",
  },
  {
    title: "Baseball",
    href: "/team-uniforms/baseball",
  },
  {
    title: "Soccer",
    href: "/team-uniforms/soccer",
  },
  {
    title: "Volleyball",
    href: "/team-uniforms/volleyball",
  },
  {
    title: "Rugby",
    href: "/team-uniforms/rugby",
  },
  {
    title: "Cricket",
    href: "/team-uniforms/cricket",
  },
  {
    title: "Ice Hockey",
    href: "/team-uniforms/ice-hockey",
  },
];

export default function TeamUniformsPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">

      {/* Hero */}
      <section className="border-b border-[#D4AF37]/20 pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6">

          <p className="uppercase tracking-[0.35em] text-[#D4AF37]">
            Zasham Enterprises
          </p>

          <h1 className="mt-6 text-5xl font-black lg:text-6xl">
            Team Uniforms
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Explore our premium custom team uniforms manufactured with
            professional sublimation printing, premium performance fabrics and
            worldwide shipping.
          </p>

        </div>
      </section>

      {/* Categories */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {sports.map((sport) => (
              <Link
                key={sport.title}
                href={sport.href}
                className="group rounded-3xl border border-[#D4AF37]/20 bg-[#161616] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.20)]"
              >
                <h2 className="text-2xl font-bold text-white transition group-hover:text-[#D4AF37]">
                  {sport.title}
                </h2>

                <p className="mt-4 leading-7 text-gray-400">
                  Premium custom {sport.title.toLowerCase()} uniforms for
                  schools, clubs, academies and professional teams.
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