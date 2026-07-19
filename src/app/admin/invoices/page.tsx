"use client";

import { useInvoices } from "../../../hooks/useInvoices";
import InvoiceTable from "../../../components/admin/invoice/InvoiceTable";
import InvoiceFilters from "../../../components/admin/invoice/InvoiceFilters";
import Link from "next/link";

export default function InvoicesPage() {
const {
  invoices,
  loading,
  search,
  setSearch,
  removeInvoice,
} = useInvoices();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Invoices</h1>
          <p className="text-sm text-gray-400">
            Manage all customer invoices.
          </p>
        </div>

       <Link
  href="/admin/invoices/create"
  className="rounded-lg bg-yellow-500 px-4 py-2 font-medium text-black transition hover:bg-yellow-400"
>
  + New Invoice
</Link>
      </div>

      <InvoiceFilters
  search={search}
  onSearchChange={setSearch}
/>

      {/* Table */}
      <InvoiceTable
        invoices={invoices}
        loading={loading}
        onDelete={removeInvoice}
      />
    </div>
  );
}