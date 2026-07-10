"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { createPortal } from "react-dom";



interface SuccessModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function SuccessModal({
  isOpen,
  title,
  message,
  onClose,

 
}: SuccessModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

if (typeof window === "undefined") return null;

return createPortal(

  

    <AnimatePresence>
     
      {isOpen && (
        <motion.div
       className="fixed left-0 top-0 z-[10000] flex h-screen w-screen items-center justify-center bg-black/60 p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            transition={{
              duration: 0.35,
            }}
            className="
              relative
              w-full
              max-w-md
              overflow-hidden
              rounded-3xl
              border
              border-[#C8A44D]/40
              bg-white/10
             mx-5 w-full max-w-md p-8
              shadow-[0_0_60px_rgba(200,164,77,.25)]
              backdrop-blur-2xl
            "
          >
            <button
              onClick={onClose}
              className="
                absolute
                right-5
                top-5
                rounded-full
                border
                border-[#C8A44D]/20
                bg-white/5
                p-2
                text-gray-300
                transition
                hover:border-[#C8A44D]
                hover:text-[#C8A44D]
              "
            >
              <FaTimes />
            </button>

            <div className="flex justify-center">
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C8A44D]/40
                  bg-[#C8A44D]/10
                "
              >
                <FaCheckCircle
                  className="text-[#C8A44D]"
                  size={42}
                />
              </div>
            </div>

            <h3 className="mt-8 text-center text-3xl font-bold text-white">
              {title}
            </h3>

            <p className="mt-4 text-center leading-7 text-gray-300">
              {message}
            </p>

            <button
              onClick={onClose}
              className="
                mt-8
                w-full
                rounded-2xl
                bg-[#C8A44D]
                py-4
                font-semibold
                text-black
                transition-all
                duration-300
                hover:bg-[#d8b45d]
                hover:shadow-[0_0_30px_rgba(200,164,77,.4)]
              "
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
 ,
document.body
);
}