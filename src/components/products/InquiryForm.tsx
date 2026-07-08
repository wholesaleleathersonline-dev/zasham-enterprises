"use client";

import { useState } from "react";

interface InquiryFormProps {
  productName: string;
}

export default function InquiryForm({
  productName,
}: InquiryFormProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    organization: "",
    quantity: "",
    productType: "Full Set",
    contactNumber: "",
    email: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !form.customerName ||
      !form.quantity ||
      !form.contactNumber ||
      !form.email
    ) {
      alert("Please fill all required fields.");
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
          product: productName,
          ...form,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Inquiry sent successfully!");

        setForm({
          customerName: "",
          organization: "",
          quantity: "",
          productType: "Full Set",
          contactNumber: "",
          email: "",
          notes: "",
        });
      } else {
        alert("Something went wrong.");
      }
    } catch {
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="mt-12 rounded-3xl border border-[#D4AF37]/20 bg-[#161616] p-8">

      <h3 className="text-2xl font-bold">
        Request a Wholesale Quote
      </h3>

      <p className="mt-2 text-gray-400">
        Fill out the form below and we'll get back to you shortly.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >

              {/* Product */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Product
          </label>

          <input
            type="text"
            value={productName}
            readOnly
            className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#111111] px-5 py-4 text-white outline-none"
          />
        </div>

        {/* Customer Name */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Customer Name *
          </label>

          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="John Smith"
            className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#111111] px-5 py-4 text-white outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Organization */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Organization / Team Name
          </label>

          <input
            type="text"
            name="organization"
            value={form.organization}
            onChange={handleChange}
            placeholder="ABC High School"
            className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#111111] px-5 py-4 text-white outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Quantity */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Quantity *
          </label>

          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="50"
            className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#111111] px-5 py-4 text-white outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Product Type */}

        <div>
          <label className="mb-3 block text-sm font-medium text-gray-300">
            Select Product *
          </label>

          <div className="flex flex-wrap gap-6">

            {["Jersey", "Shorts", "Full Set"].map((type) => (
              <label
                key={type}
                className="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  name="productType"
                  value={type}
                  checked={form.productType === type}
                  onChange={handleChange}
                />

                {type}
              </label>
            ))}

          </div>
        </div>

        {/* Contact */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Contact Number *
          </label>

          <input
            type="tel"
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            placeholder="+1 234 567 890"
            className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#111111] px-5 py-4 text-white outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Email Address *
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@email.com"
            className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#111111] px-5 py-4 text-white outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Notes */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Additional Notes
          </label>

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={5}
            placeholder="Write your requirements..."
            className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#111111] px-5 py-4 text-white outline-none focus:border-[#D4AF37]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#D4AF37] py-4 text-lg font-bold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Sending Inquiry..." : "Submit Inquiry"}
        </button>

      </form>

    </div>
  );
}