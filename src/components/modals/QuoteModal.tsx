"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";

import QuoteForm from "../forms/QuoteForm";
import SuccessModal from "./../ui/FormStatusModal";

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function QuoteModal({
    isOpen,
    onClose,
}: QuoteModalProps) {
    const [mounted, setMounted] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = "hidden";

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    if (!mounted) return null;

    const handleSuccess = () => {
        onClose();
        setTimeout(() => {
            setSuccessOpen(true);
        }, 250);
    };

    return createPortal(
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.95,
                                y: 20,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            className="relative w-full max-w-4xl rounded-3xl border border-[#D4AF37]/30 bg-white/10 backdrop-blur-2xl shadow-[0_0_40px_rgba(212,175,55,0.15)]"
                        >
                            <button
                                onClick={onClose}
                                className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/30 text-[#D4AF37] transition hover:rotate-90 hover:bg-[#D4AF37] hover:text-black"
                            >
                                <FaTimes />
                            </button>

                            <div className="border-b border-[#D4AF37]/20 px-8 py-6">
                                <h2 className="text-3xl font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
                                    Request a Free Quote
                                </h2>

                                <p className="mt-2 text-sm text-gray-300">
                                    Fill out the form below and our team will
                                    get back to you within 24 hours.
                                </p>
                            </div>

                            <div className="max-h-[75vh] overflow-y-auto p-8">
                                <QuoteForm
                                    onSuccess={handleSuccess}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            

            <SuccessModal
                isOpen={successOpen}
                title="Quote Sent Successfully!"
                message="Thank you! Your quote request has been received successfully. Our sales team will contact you within 24 hours."
                onClose={() => setSuccessOpen(false)}
            />
        </>,
        document.body
    );
}