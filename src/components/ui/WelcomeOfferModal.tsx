"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGift, FaTimes } from "react-icons/fa";
import FormStatusModal from "./FormStatusModal";

export default function WelcomeOfferModal() {
  const [isOpen, setIsOpen] = useState(false);

  const [email, setEmail] = useState("");

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusTitle, setStatusTitle] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {

const popupShown = localStorage.getItem(
  "welcome-popup"
);

  if (!popupShown) {
    setIsOpen(true);
  }





    document.body.style.overflow = isOpen ? "hidden" : "";

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  const handleClose = () => {
localStorage.setItem(
  "welcome-popup",
  "shown"
);

  setIsOpen(false);
};

  const handleSubmit = async () => {
    if (!email.trim()) {
      setStatusTitle("Email Required");
      setStatusMessage("Please enter your email address.");
      setStatusModalOpen(true);
      return;
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatusTitle("Congratulations!");
      setStatusMessage(
        "Your gift request has been received successfully. Our team will contact you soon."
      );

      setStatusModalOpen(true);
localStorage.setItem(
  "welcome-popup",
  "shown"
);
      setEmail("");
    } catch (error) {
      console.error(error);

      setStatusTitle("Submission Failed");
      setStatusMessage("Something went wrong. Please try again.");
      setStatusModalOpen(true);
    }
  };

 return (
  <>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 p-5"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            transition={{
              duration: 0.35,
            }}
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              w-full
              max-w-xl
              overflow-hidden
              rounded-[36px]
              border
              border-[#D4AF37]/30
              bg-white/10
              backdrop-blur-2xl
              shadow-[0_0_80px_rgba(212,175,55,.20)]
            "
          >
            <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

            <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

            <button 
              onClick={handleClose}
              className="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-white/10 text-gray-300 transition-all duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <FaTimes />
            </button>

            <div className="relative p-8 md:p-12">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 shadow-[0_0_40px_rgba(212,175,55,.30)]">
                <FaGift className="text-5xl text-[#D4AF37]" />
              </div>

              <h2 className="mt-8 text-center text-4xl font-extrabold text-white md:text-5xl">
                Order Your Uniforms Today
              </h2>

              <p className="mx-auto mt-6 max-w-lg text-center text-lg leading-8 text-gray-300">
                Enter your email address below and unlock exclusive team
                pricing, exciting free gifts and premium offers on your first
                custom order.
              </p>

              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  mt-10
                  w-full
                  rounded-2xl
                  border
                  border-[#D4AF37]/20
                  bg-black/40
                  px-6
                  py-5
                  text-white
                  placeholder:text-gray-500
                  outline-none
                  transition-all
                  duration-300
                  focus:border-[#D4AF37]
                  focus:ring-2
                  focus:ring-[#D4AF37]/20
                "
              />

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="
                    rounded-2xl
                    bg-[#D4AF37]
                    px-8
                    py-4
                    font-bold
                    text-black
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    hover:bg-[#e7bf4c]
                    hover:shadow-[0_0_40px_rgba(212,175,55,.45)]
                  "
                >
                  🎁 Claim My Gift
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="
                    rounded-2xl
                    border
                    border-[#D4AF37]/20
                    bg-white/5
                    px-8
                    py-4
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:border-[#D4AF37]
                    hover:bg-white/10
                  "
                >
                  Maybe Later
                </button>
              </div>

              <p className="mt-8 text-center text-sm text-gray-500">
                No spam. Exclusive manufacturing offers only.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    <FormStatusModal
      isOpen={statusModalOpen}
      title={statusTitle}
      message={statusMessage}
      onClose={() => {
        setStatusModalOpen(false);
        setIsOpen(false);
      }}
    />
  </>
);
}