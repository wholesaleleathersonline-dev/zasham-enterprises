"use client";

import { useState } from "react";


interface QuoteFormProps {
    onSuccess: () => void;
}

export default function QuoteForm({ onSuccess }: QuoteFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        category: "",
        product: "",
        quantity: "",
        option: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    

    const uniformProducts = [
        "Basketball",
        "American Football",
        "Flag Football",
        "Baseball",
        "Soccer",
        "Volleyball",
        "Rugby",
        "Cricket",
        "Ice Hockey",
    ];

    const apparelProducts = [
        "Tracksuits",
        "Training Shirts",
        "Compression Wear",
        "Polo Shirts",
    ];

    const accessoriesProducts = [
        "Backpacks",
        "Duffle Bags",
        "Arm Sleeves",
        "Socks",
        "Gloves",
    ];

    const products =
        formData.category === "Team Uniforms"
            ? uniformProducts
            : formData.category === "Team Apparel"
            ? apparelProducts
            : formData.category === "Accessories"
            ? accessoriesProducts
            : [];

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        if (name === "category") {
            setFormData((prev) => ({
                ...prev,
                category: value,
                product: "",
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        // API next step me connect hogi

       try {
    const response = await fetch("/api/inquiry/quote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            inquiryType: "quote",
            customerName: formData.name,
            email: formData.email,
            category: formData.category,
            selectedProduct: formData.product,
            quantity: formData.quantity,
            option: formData.option,
            message: formData.message,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
    }

setFormData({
    name: "",
    email: "",
    category: "",
    product: "",
    quantity: "",
    option: "",
    message: "",
});

onSuccess();

} catch (error) {
    console.error(error);
  
}   

        
    };

    return (
        <>
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-[#D4AF37]">
                        Customer Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="w-full rounded-xl border border-[#D4AF37]/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#D4AF37]"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-[#D4AF37]">
                        Email Address
                    </label>

                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@email.com"
                        className="w-full rounded-xl border border-[#D4AF37]/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#D4AF37]"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-[#D4AF37]">
                        Category
                    </label>

                    <select
                        required
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-[#D4AF37]/20 bg-black px-4 py-3 text-white outline-none"
                    >
                        <option value="">Select Category</option>
                        <option>Team Uniforms</option>
                        <option>Team Apparel</option>
                        <option>Accessories</option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-[#D4AF37]">
                        Product
                    </label>

                    <select
                        required
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        disabled={!formData.category}
                        className="w-full rounded-xl border border-[#D4AF37]/20 bg-black px-4 py-3 text-white outline-none disabled:opacity-50"
                    >
                        <option value="">Select Product</option>

                        {products.map((product) => (
                            <option key={product}>{product}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-[#D4AF37]">
                        Quantity
                    </label>

                    <input
                        type="number"
                        min={1}
                        required
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="100"
                        className="w-full rounded-xl border border-[#D4AF37]/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#D4AF37]"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-[#D4AF37]">
                        Product Option
                    </label>

                    <select
                        required
                        name="option"
                        value={formData.option}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-[#D4AF37]/20 bg-black px-4 py-3 text-white outline-none"
                    >
                        <option value="">Select Option</option>
                        <option>Full Set (Jersey + Shorts)</option>
                        <option>Jersey Only</option>
                        <option>Shorts Only</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-[#D4AF37]">
                    Message
                </label>

                <textarea
                    rows={5}
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="w-full rounded-xl border border-[#D4AF37]/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#D4AF37]"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#D4AF37] py-4 font-bold uppercase tracking-[0.18em] text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? "Sending..." : "Get Free Quote"}
            </button>
        </form>

</>
        
    );
}