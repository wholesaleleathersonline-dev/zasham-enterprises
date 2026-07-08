"use client";

import {
    FaPlay,
    FaCheckCircle,
} from "react-icons/fa";

export default function FactorySection() {
    return (
        <section className="bg-[#0F0F0F] py-32">

            <div className="mx-auto max-w-7xl px-6">

                <div className="grid items-center gap-20 lg:grid-cols-2">

                    {/* LEFT */}

                    <div>

                        <p className="uppercase tracking-[0.35em] text-[#D4AF37]">
                            Manufacturing Facility
                        </p>

                        <h2 className="mt-6 text-6xl xl:text-7xl font-black leading-tight text-white">

                            Inside Our

                            <span className="block text-[#D4AF37]">

                                Factory

                            </span>

                        </h2>

                        <p className="mt-8 text-xl leading-10 text-gray-400">

                            Every uniform is manufactured in our own facility using
                            premium fabrics, imported machinery and experienced
                            craftsmen.

                        </p>

                        <div className="mt-12 space-y-6">

                            {[
                                "Premium Sublimation Printing",
                                "Precision Cutting",
                                "Professional Stitching",
                                "Quality Inspection",
                                "Worldwide Shipping",
                            ].map((item) => (

                                <div
                                    key={item}
                                    className="flex items-center gap-5"
                                >

                                    <FaCheckCircle className="text-2xl text-[#D4AF37]" />

                                    <span className="text-lg text-white">

                                        {item}

                                    </span>

                                </div>

                            ))}

                        </div>

                        <button
                            className="mt-14 rounded-full bg-[#D4AF37] px-10 py-5 font-bold text-black shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_45px_rgba(212,175,55,0.6)]"
                        >

                            GET FREE MOCKUP

                        </button>

                    </div>

                    {/* RIGHT */}

                    <div className="group relative overflow-hidden rounded-[35px] border border-[#D4AF37]/20 bg-[#111111] shadow-[0_0_50px_rgba(212,175,55,0.12)] transition-all duration-700 hover:shadow-[0_0_80px_rgba(212,175,55,0.30)]">

                        <video



                            src="/Videos/Fac Video/v2.mp4"
                            className="h-[650px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />

                        <div className="absolute left-6 top-6 rounded-full border border-[#D4AF37]/30 bg-black/70 px-5 py-2 text-sm font-semibold text-[#D4AF37] backdrop-blur-md">
                            10+ Years Manufacturing Experience
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        <div className="absolute inset-0 flex items-center justify-center">

                            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#D4AF37] text-black shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">

                                <FaPlay className="ml-2 text-4xl" />

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}