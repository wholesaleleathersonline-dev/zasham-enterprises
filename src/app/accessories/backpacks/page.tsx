import Breadcrumb from "../../../components/common/Breadcrumb";

export default function BackpacksPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">

      {/* Hero + Breadcrumb */}
      <section className="border-b border-[#D4AF37]/20 pt-44 pb-16 lg:pt-48">

        <div className="mx-auto max-w-7xl px-6">

          <div className="pt-6 lg:pt-8">
            <Breadcrumb
              items={[
                {
                  label: "Home",
                  href: "/",
                },
                {
                  label: "Accessories",
                  href: "/accessories",
                },
                {
                  label: "Backpacks",
                },
              ]}
            />
          </div>

          <p className="mt-10 uppercase tracking-[0.35em] text-[#D4AF37]">
            Accessories
          </p>

          <h1 className="mt-6 text-5xl font-black lg:text-6xl">
            Custom Backpacks
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Premium custom sports backpacks manufactured by Zasham
            Enterprises using durable materials, premium stitching and
            unlimited customization for schools, clubs, academies and
            professional teams.
          </p>

        </div>

      </section>

      {/* Coming Soon */}

      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#161616] p-16 text-center transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.20)]">

            <h2 className="text-4xl font-bold text-white">
              Products Coming Soon
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-gray-400">
              We are preparing our premium collection of custom sports
              backpacks. Soon you will be able to explore all available
              styles, colors and customization options.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}