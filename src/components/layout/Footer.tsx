"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

import {
  quickLinks,
  teamUniformLinks,
  teamApparelLinks,
  accessoriesLinks,
} from "./FooterData";
import FormStatusModal from "../ui/FormStatusModal";

export default function Footer() {

const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [modalOpen, setModalOpen] = useState(false);
const [modalTitle, setModalTitle] = useState("");
const [modalMessage, setModalMessage] = useState("");


const handleFooterNewsletter = async () => {
  console.log("Email value:", `"${email}"`);
  if (!email.trim()) {
   setModalTitle("Email Required");
setModalMessage("Please enter your email address.");
setModalOpen(true);
return;
    
  }

  setLoading(true);

  try {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();

    if (res.ok) {
     setModalTitle("Request Sent Successfully");
setModalMessage(
  data.message || "Thank you! Our team will contact you shortly."
);
setModalOpen(true);
      setEmail("");
    } else {
     setModalTitle("Request Failed");
setModalMessage(
  data.error || "Something went wrong. Please try again."
);
setModalOpen(true);
    }
  } catch (error) {
  console.error(error);

  setModalTitle("Server Error");
  setModalMessage("Something went wrong. Please try again.");
  setModalOpen(true);
} finally {
    setLoading(false);
  }
};




  return (
    <footer className="relative overflow-hidden bg-[#070707] border-t border-[#D4AF37]/10">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#D4AF37]/5 blur-[220px]"></div>

      {/* ================= CTA ================= */}

      <div className="mx-auto max-w-7xl px-6 pt-24">

        <div className="relative overflow-hidden rounded-[40px] border border-[#D4AF37]/20 bg-gradient-to-br from-[#111111] via-[#181818] to-[#0B0B0B] p-16">

          <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-[#D4AF37]/10 blur-[120px]"></div>

          <div className="relative z-10">

            <p className="text-center uppercase tracking-[0.45em] text-[#D4AF37]">

              LET'S WORK TOGETHER

            </p>

            <h2 className="mt-6 text-center text-6xl font-black leading-tight text-white">

              Ready To Start

              <span className="block text-[#D4AF37]">

                Your Project?

              </span>

            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-center text-xl leading-9 text-gray-400">

              Get your free mockup, quotation and production consultation
              within 24 hours.

            </p>

            {/* Email */}

            <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-5 md:flex-row">

             <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter Your Email Address..."
  className="h-16 flex-1 rounded-full border border-[#D4AF37]/30 bg-black/50 px-8 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-[#D4AF37] focus:shadow-[0_0_25px_rgba(212,175,55,0.35)]"
/>

             <button
  onClick={handleFooterNewsletter}
  disabled={loading}
  className="group flex h-16 items-center justify-center gap-3 rounded-full bg-[#D4AF37] px-10 font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
>

              {loading ? "SENDING..." : "GET FREE MOCKUP"}

                <FaArrowRight className="transition group-hover:translate-x-1" />

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Footer Content */}

      <div className="mx-auto mt-24 max-w-7xl px-6 pb-10">

      <div className="grid gap-10 lg:grid-cols-[2.2fr_1fr_1.3fr_1.3fr_1.3fr_1.5fr]">
        
                  {/* Company */}

         {/* Company */}

{/* Company */}

<div className="max-w-[360px]">

  <img
    src="/logo/ze-logo.png"
    alt="Zasham Enterprises"
    className="h-20 w-auto"
  />

  <h3 className="mt-6 text-2xl font-bold text-white">
    Zasham Enterprises
  </h3>

  <p className="mt-8 w-[360px] leading-8 text-gray-400">
    Premium Custom Sportswear Manufacturer with
    factory-direct pricing and worldwide shipping.
    We Offer Fully Custom Uniforms with fast turnaround and Fast turnaround
    is our identity
  </p>

  <div className="mt-10 flex gap-4">

    <a
      href="https://www.facebook.com/zashamsportswear"
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#111111] text-[#D4AF37] transition-all duration-300 hover:scale-110 hover:bg-[#D4AF37] hover:text-black"
    >
      <FaFacebookF />
    </a>

    <a
      href="https://www.instagram.com/zashamenteprises"
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#111111] text-[#D4AF37] transition-all duration-300 hover:scale-110 hover:bg-[#D4AF37] hover:text-black"
    >
      <FaInstagram />
    </a>

    <a
      href="https://wa.me/92349613559"
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#111111] text-[#D4AF37] transition-all duration-300 hover:scale-110 hover:bg-[#D4AF37] hover:text-black"
    >
      <FaWhatsapp />
    </a>

  </div>

</div>

          {/* Quick Links */}

          <div>

            <h3 className="whitespace-nowrap text-2xl font-bold text-white">

              Quick Links

            </h3>
<div className="mt-8 flex flex-col gap-5">

  {quickLinks.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className="text-gray-400 transition hover:text-[#D4AF37]"
    >
      {link.name}
    </Link>
  ))}

</div>

          </div>

          {/* Categories */}

          <div>
<h3 className="whitespace-nowrap text-2xl font-bold text-white">
  Team Uniforms
</h3>
            <div className="mt-8 flex flex-col gap-5">

  {teamUniformLinks.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className="text-gray-400 transition hover:text-[#D4AF37]"
    >
      {link.name}
    </Link>
  ))}

</div>

          </div>

         
{/* Team Apparel */}

<div>

  <h3 className="whitespace-nowrap text-2xl font-bold text-white">
    Team Apparel
  </h3>

  <div className="mt-8 flex flex-col gap-5">

    {teamApparelLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="text-gray-400 transition hover:text-[#D4AF37]"
      >
        {link.name}
      </Link>
    ))}

  </div>

</div>


{/* Accessories */}

<div>

  <h3 className="whitespace-nowrap text-2xl font-bold text-white">
    Accessories
  </h3>

  <div className="mt-8 flex flex-col gap-5">

    {accessoriesLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="text-gray-400 transition hover:text-[#D4AF37]"
      >
        {link.name}
      </Link>
    ))}

  </div>

</div>



{/* Contact */}

<div>

  <h3 className="whitespace-nowrap text-2xl font-bold text-white">
    Contact Us
  </h3>

  <div className="mt-8 space-y-6">

    <div className="flex items-start gap-4">
      <FaPhoneAlt className="mt-1 text-[#D4AF37]" />
      <span className="whitespace-nowrap text-sm text-gray-400">
        +92 349 6135559
      </span>
    </div>

    <div className="flex items-start gap-4">
      <FaEnvelope className="mt-1 text-[#D4AF37]" />
    <a
  href="mailto:wholesaleleathersonline@gmail.com"
  className="text-gray-400 transition hover:text-[#D4AF37]"
>
  wholesaleleathersonline@gmail.com
</a>
    </div>

    <div className="flex items-start gap-4">
      <FaMapMarkerAlt className="mt-1 text-[#D4AF37]" />
      <span className="text-gray-400">
        Sialkot, Punjab, Pakistan
      </span>
    </div>

  </div>

</div>



         
        </div>
                {/* Bottom */}

        <div className="mt-20 border-t border-[#D4AF37]/10 pt-8">

          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row">

            <p className="text-gray-500">

              © {new Date().getFullYear()} Zasham Enterprises.
              All Rights Reserved.

            </p>

            <div className="flex items-center gap-8">

              <Link
                href="/privacy-policy"
                className="text-gray-500 transition hover:text-[#D4AF37]"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-conditions"
                className="text-gray-500 transition hover:text-[#D4AF37]"
              >
                Terms & Conditions
              </Link>

            </div>

          </div>

        </div>

      </div>

<FormStatusModal
  isOpen={modalOpen}
  title={modalTitle}
  message={modalMessage}
  onClose={() => setModalOpen(false)}
/>



    </footer>
  );
}