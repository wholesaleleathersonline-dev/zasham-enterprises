"use client";

import { useState } from "react";
import { Customer } from "../../../types/customer";
import {
  createCustomer,
  updateCustomer,
} from "../../../services/customer.service";

interface CustomerFormProps {
  initialData?: Customer;
  isEdit?: boolean;
}

export default function CustomerForm({
  initialData,
  isEdit = false,
}: CustomerFormProps) {
  const [loading, setLoading] = useState(false);

  const [customer, setCustomer] = useState<Customer>(
    initialData ?? {
      customerName: "",
      company: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      taxId: "",
      currency: "USD",
      notes: "",
      status: "Active",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (isEdit && customer.id) {
        await updateCustomer(customer.id, customer);
        alert("Customer updated successfully.");
      } else {
        await createCustomer(customer);
        alert("Customer created successfully.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-yellow-400">
        {isEdit ? "Edit Customer" : "Create Customer"}
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <input
          name="customerName"
          placeholder="Customer Name"
          value={customer.customerName}
          onChange={handleChange}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
        />

        <input
          name="company"
          placeholder="Company"
          value={customer.company}
          onChange={handleChange}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleChange}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={customer.phone}
          onChange={handleChange}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
        />

        <input
          name="city"
          placeholder="City"
          value={customer.city}
          onChange={handleChange}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
        />

        <input
          name="state"
          placeholder="State"
          value={customer.state}
          onChange={handleChange}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
        />

        <input
          name="zip"
          placeholder="ZIP Code"
          value={customer.zip}
          onChange={handleChange}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
        />

        <input
          name="country"
          placeholder="Country"
          value={customer.country}
          onChange={handleChange}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
        />

        <input
          name="taxId"
          placeholder="Tax ID"
          value={customer.taxId}
          onChange={handleChange}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
        />

        <select
          name="currency"
          value={customer.currency}
          onChange={handleChange}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="PKR">PKR</option>
        </select>
      </div>

      <textarea
        rows={4}
        name="address"
        placeholder="Address"
        value={customer.address}
        onChange={handleChange}
        className="mt-5 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
      />

      <textarea
        rows={4}
        name="notes"
        placeholder="Notes"
        value={customer.notes}
        onChange={handleChange}
        className="mt-5 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
      />

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : isEdit
            ? "Update Customer"
            : "Create Customer"}
        </button>
      </div>
    </div>
  );
}