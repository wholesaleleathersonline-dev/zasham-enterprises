"use client";
import SuccessModal from "./ui/FormStatusModal";
import { motion, Variants } from "framer-motion";
import {
  FaEnvelope,
  FaGlobeAmericas,
  FaPhoneAlt,
} from "react-icons/fa";
import { useState } from "react";


const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.98,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const contactCards = [
  {
    icon: FaPhoneAlt,
    title: "Call Us",
    value: "+92 349 6135559",
  },
  {
    icon: FaEnvelope,
    title: "Email Us",
    value: "wholesaleleathersonline@gmail.com",
  },
  {
    icon: FaGlobeAmericas,
    title: "Worldwide Shipping",
    value: "Manufacturing in Pakistan",
    subValue: "Shipping Worldwide",
  },
];

const uniformCategories = [
  "Basketball Uniform",
  "American Football Uniform",
  "Flag Football Uniform",
  "Baseball Uniform",
  "Soccer Uniform",
  "Volleyball Uniform",
  "Rugby Uniform",
  "Cricket Uniform",
  "Ice Hockey Uniform",
  "Custom Sportswear",
];

export default function ContactForm() {

    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

const [modalTitle, setModalTitle] = useState("");

const [modalMessage, setModalMessage] = useState("");

const [formData, setFormData] = useState({
  customerName: "",
  organization: "",
  contactNumber: "",
  email: "",
  uniformCategory: "",
  quantity: "",
  country: "",
  message: "",
});

const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (
    !formData.customerName.trim() ||
    !formData.contactNumber.trim() ||
    !formData.email.trim() ||
    !formData.uniformCategory.trim() ||
    !formData.quantity.trim() ||
    !formData.country.trim() ||
    !formData.message.trim()
  ) {
    setModalTitle("Required Fields");

    setModalMessage("Please fill in all required fields.");

    setModalOpen(true);

    return;
  }

  setLoading(true);

  try {
    const response = await fetch("/api/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inquiryType: "contact",
        ...formData,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Something went wrong.");
    }

    setModalTitle("Inquiry Sent Successfully");

    setModalMessage(
      "Thank you for contacting Zasham Enterprises. Our team will get back to you shortly."
    );

    setModalOpen(true);

    setFormData({
      customerName: "",
      organization: "",
      contactNumber: "",
      email: "",
      uniformCategory: "",
      quantity: "",
      country: "",
      message: "",
    });
  } catch (error) {
    console.error(error);

    setModalTitle("Submission Failed");

    setModalMessage(
      "Something went wrong while sending your inquiry. Please try again."
    );

    setModalOpen(true);
  } finally {
    setLoading(false);
  }
};





  return (
    <section  id="contact-form" className="relative overflow-hidden bg-black py-24 lg:py-32">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#C8A44D12,transparent_45%)]" />

        <div className="absolute left-[-180px] top-[-100px] h-[500px] w-[500px] rounded-full bg-[#C8A44D]/5 blur-[170px]" />

        <div className="absolute right-[-180px] bottom-[-100px] h-[500px] w-[500px] rounded-full bg-[#C8A44D]/5 blur-[170px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Heading */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >

          <span className="inline-flex rounded-full border border-[#C8A44D]/30 bg-[#C8A44D]/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#C8A44D]">

            Contact Us

          </span>

          <h2 className="mt-8 text-4xl font-bold text-white md:text-5xl lg:text-6xl">

            Let's Build Your

            <span className="block text-[#C8A44D]">

              Next Team Uniform

            </span>

          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">

            Tell us about your team, your design ideas, and the quantity you
            need. We'll get back to you with the best manufacturing solution.

          </p>

        </motion.div>

        {/* Main Grid */}

        <div className="grid gap-10 lg:grid-cols-5">

          {/* Left Side */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 lg:col-span-2"
          >


            {/* Contact Cards */}

            {contactCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group rounded-3xl border border-[#C8A44D]/20 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#C8A44D]/60 hover:shadow-[0_0_60px_rgba(200,164,77,.18)]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C8A44D]/30 bg-[#C8A44D]/10 text-[#C8A44D] transition-transform duration-500 group-hover:scale-110">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-white">
                    {card.title}
                  </h3>

                  <p className="mt-4 break-all text-gray-300">
                    {card.value}
                  </p>

                  {"subValue" in card && (
                    <p className="mt-2 text-gray-500">
                      {card.subValue}
                    </p>
                  )}
                </motion.div>
              );
            })}

          </motion.div>

          {/* Inquiry Form */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >

            <form
  onSubmit={handleSubmit}
  className="rounded-[32px] border border-[#C8A44D]/20 bg-white/5 p-8 backdrop-blur-2xl lg:p-10"
>
  <div className="grid gap-6 md:grid-cols-2">

    <input
      type="text"
      name="customerName"
      value={formData.customerName}
      onChange={handleChange}
      placeholder="Customer Name *"
      className="rounded-2xl border border-[#C8A44D]/20 bg-[#0A0A0A] px-5 py-4 text-white placeholder:text-gray-400 caret-[#C8A44D] outline-none transition-all duration-300 focus:border-[#C8A44D] focus:ring-2 focus:ring-[#C8A44D]/20"
    />

    <input
      type="text"
      name="organization"
      value={formData.organization}
      onChange={handleChange}
      placeholder="Company Name"
      className="rounded-2xl border border-[#C8A44D]/20 bg-[#0A0A0A] px-5 py-4 text-white placeholder:text-gray-400 caret-[#C8A44D] outline-none transition-all duration-300 focus:border-[#C8A44D] focus:ring-2 focus:ring-[#C8A44D]/20"
    />

    <input
      type="tel"
      name="contactNumber"
      value={formData.contactNumber}
      onChange={handleChange}
      placeholder="Contact Number *"
      className="rounded-2xl border border-[#C8A44D]/20 bg-[#0A0A0A] px-5 py-4 text-white placeholder:text-gray-400 caret-[#C8A44D] outline-none transition-all duration-300 focus:border-[#C8A44D] focus:ring-2 focus:ring-[#C8A44D]/20"
    />

    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Email Address *"
      className="rounded-2xl border border-[#C8A44D]/20 bg-[#0A0A0A] px-5 py-4 text-white placeholder:text-gray-400 caret-[#C8A44D] outline-none transition-all duration-300 focus:border-[#C8A44D] focus:ring-2 focus:ring-[#C8A44D]/20"
    />

    <select
      name="uniformCategory"
      value={formData.uniformCategory}
      onChange={handleChange}
      className="rounded-2xl border border-[#C8A44D]/20 bg-[#0A0A0A] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-[#C8A44D] focus:ring-2 focus:ring-[#C8A44D]/20"
    >
      <option value="" className="bg-[#0A0A0A] text-gray-400">
        Select Uniform Category
      </option>

      {uniformCategories.map((category) => (
        <option
          key={category}
          value={category}
          className="bg-[#0A0A0A] text-white"
        >
          {category}
        </option>
      ))}
    </select>

    <input
      type="number"
      name="quantity"
      value={formData.quantity}
      onChange={handleChange}
      placeholder="Quantity *"
      className="rounded-2xl border border-[#C8A44D]/20 bg-[#0A0A0A] px-5 py-4 text-white placeholder:text-gray-400 caret-[#C8A44D] outline-none transition-all duration-300 focus:border-[#C8A44D] focus:ring-2 focus:ring-[#C8A44D]/20"
    />

   <select
  name="country"
  value={formData.country}
  onChange={handleChange}
  className="md:col-span-2 rounded-2xl border border-[#C8A44D]/20 bg-[#0A0A0A] px-5 py-4 text-white outline-none transition-all duration-300 focus:border-[#C8A44D] focus:ring-2 focus:ring-[#C8A44D]/20"
>
  <option value="" className="bg-[#0A0A0A] text-gray-400">
    Select Country
  </option>

  <option value="United States" className="bg-[#0A0A0A]">United States</option>
  <option value="Canada" className="bg-[#0A0A0A]">Canada</option>
  <option value="United Kingdom" className="bg-[#0A0A0A]">United Kingdom</option>
  <option value="Australia" className="bg-[#0A0A0A]">Australia</option>
  <option value="Germany" className="bg-[#0A0A0A]">Germany</option>
  <option value="France" className="bg-[#0A0A0A]">France</option>
  <option value="Italy" className="bg-[#0A0A0A]">Italy</option>
  <option value="Spain" className="bg-[#0A0A0A]">Spain</option>
  <option value="Netherlands" className="bg-[#0A0A0A]">Netherlands</option>
  <option value="Belgium" className="bg-[#0A0A0A]">Belgium</option>
  <option value="Sweden" className="bg-[#0A0A0A]">Sweden</option>
  <option value="Norway" className="bg-[#0A0A0A]">Norway</option>
  <option value="Denmark" className="bg-[#0A0A0A]">Denmark</option>
  <option value="Finland" className="bg-[#0A0A0A]">Finland</option>
  <option value="Ireland" className="bg-[#0A0A0A]">Ireland</option>
  <option value="New Zealand" className="bg-[#0A0A0A]">New Zealand</option>
  <option value="United Arab Emirates" className="bg-[#0A0A0A]">United Arab Emirates</option>
  <option value="Saudi Arabia" className="bg-[#0A0A0A]">Saudi Arabia</option>
  <option value="Qatar" className="bg-[#0A0A0A]">Qatar</option>
  <option value="Kuwait" className="bg-[#0A0A0A]">Kuwait</option>
  <option value="Pakistan" className="bg-[#0A0A0A]">Pakistan</option>
  <option value="Other" className="bg-[#0A0A0A]">Other</option>
</select>

    <textarea
      rows={7}
      name="message"
      value={formData.message}
      onChange={handleChange}
      placeholder="Write Your Message..."
      className="md:col-span-2 resize-none rounded-2xl border border-[#C8A44D]/20 bg-[#0A0A0A] px-5 py-4 text-white placeholder:text-gray-400 caret-[#C8A44D] outline-none transition-all duration-300 focus:border-[#C8A44D] focus:ring-2 focus:ring-[#C8A44D]/20"
    />

  </div>

  {/* Submit Button */}

  <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

    <p className="text-sm leading-7 text-gray-400">
      By submitting this form, our team will review your inquiry and contact
      you as soon as possible.
    </p>

    <button
      type="submit"
      disabled={loading}
      className="group inline-flex items-center justify-center rounded-2xl bg-[#C8A44D] px-10 py-4 font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-[#d8b45d] hover:shadow-[0_0_35px_rgba(200,164,77,.45)] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? "Sending..." : "Send Inquiry"}

      <svg
        className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 12h14m-7-7 7 7-7 7"
        />
      </svg>
    </button>

  </div>

</form>

<SuccessModal
  isOpen={modalOpen}
  title={modalTitle}
  message={modalMessage}
  onClose={() => setModalOpen(false)}
/>

          </motion.div>

        </div>

      </div>

      {/* Bottom Divider */}

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#C8A44D]/40 to-transparent" />

    </section>
  );
}
              



          