const features = [
  "Premium Quality",
  "Low MOQ",
  "OEM Manufacturing",
  "Fast Turnaround",
  "Worldwide Shipping",
  "Free Design Mockup",
];

export default function Trusted() {
  return (
    <section className="bg-[#0F0F0F] pt-32 pb-20 px-6">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-[#D4AF37]/40 bg-[#0B0B0B] px-10 py-20 shadow-[0_0_120px_rgba(212,175,55,0.35)]">

        <h2 className="mb-4 text-center text-5xl font-bold text-[#D4AF37]">
          Why Choose Zasham Enterprises
        </h2>

        <p className="mb-16 text-center text-lg text-[#D4AF37]/80">
          Trusted by Teams, Clubs & Organizations Worldwide
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[#D4AF37]/25 bg-[#111111] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.30)]"
            >
              <h3 className="text-xl font-semibold text-[#D4AF37]">
                ✓ {item}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}