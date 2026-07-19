"use client";

import CustomerForm from "../../../../components/admin/customer/CustomerForm";

export default function CreateCustomerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Create Customer
        </h1>

        <p className="text-zinc-400">
          Add a new customer to your database.
        </p>
      </div>

      <CustomerForm />
    </div>
  );
}