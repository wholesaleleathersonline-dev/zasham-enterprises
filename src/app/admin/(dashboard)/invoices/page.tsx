"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";

import { useInvoices } from "../../../../hooks/useInvoices";
import InvoiceTable from "../../../../components/admin/invoice/InvoiceTable";
import InvoiceFilters from "../../../../components/admin/invoice/InvoiceFilters";

export default function InvoicesPage() {
  const {
    invoices,
    loading,
    search,
    setSearch,
    removeInvoice,
  } = useInvoices();

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

        {/* Left */}
        <div>
          <Link
            href="/admin/dashboard"
            className="group mb-6 inline-flex items-center gap-2 rounded-xl border-2 border-yellow-500/40 bg-white/5 px-5 py-2.5 text-sm font-semibold text-yellow-400 backdrop-blur-md transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-500 hover:text-black hover:shadow-[0_0_30px_rgba(234,179,8,0.45)] active:scale-95"
          >
            <FaArrowLeft
              size={13}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>Back to Dashboard</span>
          </Link>

          <h1 className="text-3xl font-bold text-white">
            Invoices
          </h1>

          <p className="mt-2 text-gray-400">
            Manage all customer invoices.
          </p>
        </div>

        {/* Right */}
        <Link
          href="/admin/invoices/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-yellow-400 hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]"
        >
          <Plus size={18} />
          New Invoice
        </Link>

      </div>

      {/* Filters */}
      <InvoiceFilters
        search={search}
        onSearchChange={setSearch}
      />

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-yellow-500/20 bg-[#1A1A1A]">
        <InvoiceTable
          invoices={invoices}
          loading={loading}
          onDelete={removeInvoice}
        />
      </div>

    </div>
  );
}