"use client";

const countries = [
    {
        name: "USA",
        flag: "🇺🇸",
        teams: "250+ Teams",
        x: "18%",
        y: "33%",
    },
    {
        name: "Canada",
        flag: "🇨🇦",
        teams: "80+ Teams",
        x: "20%",
        y: "18%",
    },
    {
        name: "United Kingdom",
        flag: "🇬🇧",
        teams: "90+ Teams",
        x: "47%",
        y: "27%",
    },
    {
        name: "Germany",
        flag: "🇩🇪",
        teams: "40+ Teams",
        x: "50%",
        y: "30%",
    },
    {
        name: "Pakistan",
        flag: "🇵🇰",
        teams: "Factory",
        x: "62%",
        y: "39%",
        logo: true,
    },
    {
        name: "Australia",
        flag: "🇦🇺",
        teams: "60+ Teams",
        x: "86%",
        y: "72%",
    },
];

export default function GlobalReach() {
    return (
        <section className="relative overflow-hidden bg-[#0F0F0F] py-32">

            <div className="mx-auto max-w-7xl px-6">

                <h2 className="text-center text-6xl font-black tracking-[0.15em] text-[#D4AF37]">
                    OUR GLOBAL REACH
                </h2>

                <div className="mx-auto mt-6 h-1 w-36 rounded-full bg-[#D4AF37]" />

                <p className="mx-auto mt-8 max-w-3xl text-center text-xl text-gray-400">
                    Trusted By Teams Across The Globe
                </p>

                <div className="relative mt-24 h-[700px] overflow-hidden overflow-hidden rounded-[40px] border border-[#D4AF37]/20 bg-gradient-to-br from-[#101010] via-[#161616] to-[#0B0B0B]">

                    {/* Background */}

                    <img
                        src="/Pictures/worldmap.png"
                        alt="World Map"
                        className="absolute inset-0 h-full w-full object-contain opacity-30"
                    />

                    {/* Pins */}

                {/* Shipping Routes */}

<svg
  className="absolute inset-0 h-full w-full"
  viewBox="0 0 100 100"
  preserveAspectRatio="none"
>

  {/* Pakistan → USA */}
  <path
    d="M62 39 Q45 20 18 33"
    stroke="#D4AF37"
    strokeWidth="0.35"
    fill="none"
    strokeDasharray="4 2"
    opacity="0.55"
  />

  {/* Pakistan → Canada */}
  <path
    d="M62 39 Q40 10 20 18"
    stroke="#D4AF37"
    strokeWidth="0.35"
    fill="none"
    strokeDasharray="4 2"
    opacity="0.55"
  />

  {/* Pakistan → UK */}
  <path
    d="M62 39 Q56 28 47 27"
    stroke="#D4AF37"
    strokeWidth="0.35"
    fill="none"
    strokeDasharray="4 2"
    opacity="0.55"
  />

  {/* Pakistan → Germany */}
  <path
    d="M62 39 Q58 34 50 30"
    stroke="#D4AF37"
    strokeWidth="0.35"
    fill="none"
    strokeDasharray="4 2"
    opacity="0.55"
  />

  {/* Pakistan → Australia */}
  <path
    d="M62 39 Q76 48 86 72"
    stroke="#D4AF37"
    strokeWidth="0.35"
    fill="none"
    strokeDasharray="4 2"
    opacity="0.55"
  />

</svg>


                    {countries.map((country) => (





                        <div
                            key={country.name}
                            className="group absolute z-20 cursor-pointer"
                            style={{
                                left: country.x,
                                top: country.y,
                                transform: "translate(-50%, -50%)",
                            }}
                        >

                            <div className="relative flex flex-col items-center">

                                {/* Glow */}
                                <div className="absolute h-12 w-12 rounded-full bg-[#D4AF37]/20 blur-xl"></div>

                                {/* Pulse */}
                                <div className="absolute h-8 w-8 animate-ping rounded-full bg-[#D4AF37]/30"></div>

                                {/* Pin */}
                              {country.logo ? (
  <img
    src="/logo/ze-logo.png"
    alt="ZE"
    className="relative z-10 h-12 w-12 rounded-full border border-[#D4AF37] bg-black p-1 shadow-[0_0_30px_rgba(212,175,55,0.8)]"
  />
) : (
  <div className="relative z-10 h-5 w-5 rounded-full border-2 border-white bg-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,1)] transition-all duration-300 group-hover:scale-125"></div>
)}

                                {/* Country Name */}
                                <div className="pointer-events-none absolute left-1/2 top-8 w-44 -translate-x-1/2 rounded-2xl border border-[#D4AF37]/30 bg-[#111111]/95 px-4 py-3 text-center opacity-0 shadow-[0_0_25px_rgba(212,175,55,0.35)] backdrop-blur-md transition-all duration-300 group-hover:top-10 group-hover:opacity-100">
                                    <p className="text-sm font-semibold text-[#D4AF37]">
                                        {country.flag} {country.name}
                                    </p>
                                    <p className="text-xs text-gray-300">
                                        {country.teams}
                                    </p>
                                </div>

                            </div>

                           

                        </div>

                    ))}




                </div>

            </div>

        </section>
    );
}