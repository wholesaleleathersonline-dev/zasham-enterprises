"use client";

import { Customer } from "../../../types/customer";

interface CustomerTableProps {
  customers: Customer[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export default function CustomerTable({
  customers,
  loading,
  onDelete,
}: CustomerTableProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
        Loading customers...
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
        No customers found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
      <table className="min-w-full">
        <thead className="border-b border-zinc-800 bg-zinc-950">
          <tr>
            <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
              Customer
            </th>

            <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
              Company
            </th>

            <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
              Email
            </th>

            <th className="px-5 py-4 text-left text-sm font-semibold text-zinc-300">
              Phone
            </th>

            <th className="px-5 py-4 text-center text-sm font-semibold text-zinc-300">
              Status
            </th>

            <th className="px-5 py-4 text-center text-sm font-semibold text-zinc-300">
              Invoices
            </th>

            <th className="px-5 py-4 text-center text-sm font-semibold text-zinc-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
            >
              <td className="px-5 py-4 font-medium text-white">
                {customer.customerName}
              </td>

              <td className="px-5 py-4 text-zinc-300">
                {customer.company}
              </td>

              <td className="px-5 py-4 text-zinc-300">
                {customer.email}
              </td>

              <td className="px-5 py-4 text-zinc-300">
                {customer.phone}
              </td>

              <td className="px-5 py-4 text-center">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    customer.status === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {customer.status}
                </span>
              </td>

              <td className="px-5 py-4 text-center text-white">
                {customer.totalInvoices ?? 0}
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-center gap-2">
                  <button
                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
                  >
                    View
                  </button>

                  <button
                    className="rounded-lg bg-yellow-500 px-3 py-2 text-sm font-medium text-black hover:bg-yellow-400"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => customer.id && onDelete(customer.id)}
                    className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}