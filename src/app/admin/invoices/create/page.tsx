"use client";

import InvoiceForm from "../../../../components/admin/invoice/InvoiceForm";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function CreateInvoicePage() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
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
      Create Invoice
    </h1>

    <p className="mt-1 text-sm text-zinc-400">
      Create, preview and export professional invoices.
    </p>
  </div>
</div>


      <InvoiceForm />
    </div>
  );
}