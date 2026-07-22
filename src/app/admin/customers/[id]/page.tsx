"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { getCustomerById } from "../../../../services/customer.service";
import { getInvoicesByCustomer } from "../../../../services/invoice.service";
import { InvoiceListItem } from "../../../../types/invoice";
import { Customer } from "../../../../types/customer";  


export default function CustomerDetailsPage() {
  const { id } = useParams<{ id: string }>();
 const [invoices, setInvoices] = useState<InvoiceListItem[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const totalRevenue = invoices.reduce(
  (sum, invoice) => sum + Number(invoice.total),
  0
);
 

 useEffect(() => {
  async function loadCustomer() {
    try {
      const [customerData, customerInvoices] = await Promise.all([
        getCustomerById(id),
        getInvoicesByCustomer(id),
      ]);

      setCustomer(customerData);
      setInvoices(customerInvoices);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (id) {
    loadCustomer();
  }
}, [id]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
        Loading customer...
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-red-400">
        Customer not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {customer.customerName}
          </h1>

          <p className="text-zinc-400">
            Customer Details
          </p>
        </div>

       <div className="flex gap-3">
  <Link
    href={`/admin/invoices/create?customer=${customer.id}`}
    className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-500"
  >
    Create Invoice
  </Link>

  <Link
    href={`/admin/customers/${customer.id}/edit`}
    className="rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black hover:bg-yellow-400"
  >
    Edit Customer
  </Link>
</div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
    <p className="text-sm text-zinc-400">Total Invoices</p>

    <h2 className="mt-2 text-3xl font-bold text-white">
      {customer.totalInvoices ?? 0}
    </h2>
  </div>

  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
  <p className="text-sm text-zinc-400">
    Total Revenue
  </p>

  <h2 className="mt-2 text-3xl font-bold text-white">
    ${totalRevenue.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}
  </h2>
</div>

  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
    <p className="text-sm text-zinc-400">Status</p>

    <span
      className={`mt-3 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
        customer.status === "Active"
          ? "bg-green-500/15 text-green-400"
          : "bg-red-500/15 text-red-400"
      }`}
    >
      {customer.status}
    </span>
  </div>
</div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Basic Information
          </h2>

          <div className="space-y-3 text-zinc-300">
            <p><strong>Name:</strong> {customer.customerName}</p>
            <p><strong>Company:</strong> {customer.company}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Status:</strong> {customer.status}</p>
            <p><strong>Currency:</strong> {customer.currency}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Address
          </h2>

          <div className="space-y-3 text-zinc-300">
            <p>{customer.address}</p>
            <p>{customer.city}</p>
            <p>{customer.state}</p>
            <p>{customer.zip}</p>
            <p>{customer.country}</p>
          </div>
        </div>
      </div>


<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
  <div className="mb-5 flex items-center justify-between">
    <h2 className="text-xl font-semibold text-white">
      Recent Invoices
    </h2>

    <Link
      href="/admin/invoices"
      className="text-sm font-medium text-yellow-400 hover:text-yellow-300"
    >
      View All
    </Link>
  </div>

  {invoices.length === 0 ? (
    <p className="text-zinc-400">
      No invoices found for this customer.
    </p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-zinc-800 text-left text-zinc-400">
            <th className="py-3">Invoice</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="border-b border-zinc-800"
            >
              <td className="py-4 font-medium text-white">
                {invoice.invoice_number}
              </td>

              <td className="text-zinc-300">
                {invoice.invoice_date}
              </td>

              <td className="text-zinc-300">
                ${invoice.total}
              </td>

              <td>
                <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">
                  {invoice.status}
                </span>
              </td>
              <td className="text-right">
  <Link
    href={`/admin/invoices/${invoice.id}`}
    className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition hover:border-yellow-500 hover:text-yellow-400"
  >
    View
  </Link>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>























    </div>
  );
}