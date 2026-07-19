"use client";

import Link from "next/link";
import { useCustomers } from "../../../hooks/useCustomers";
import CustomerTable from "../../../components/admin/customer/CustomerTable";

export default function CustomersPage() {
  const {
    customers,
    loading,
    removeCustomer,
  } = useCustomers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Customers
          </h1>

          <p className="text-zinc-400">
            Manage all your customers.
          </p>
        </div>

        <Link
          href="/admin/customers/create"
          className="rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black hover:bg-yellow-400"
        >
          + New Customer
        </Link>
      </div>

      <CustomerTable
        customers={customers}
        loading={loading}
        onDelete={removeCustomer}
      />
    </div>
  );
}