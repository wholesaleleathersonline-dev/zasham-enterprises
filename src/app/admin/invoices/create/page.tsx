"use client";

import InvoiceForm from "../../../../components/admin/invoice/InvoiceForm";

export default function CreateInvoicePage() {
  return (
    <div className="space-y-6">
  <div className="mx-auto mt-7 max-w-4xl rounded-xl border border-yellow-500/20 bg-zinc-900 px-5 py-2 shadow-lg">
  <div className="flex items-center justify-between gap-3">

    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500 text-lg">
        📄
      </div>

      <div>
        <h1 className="flex items-center gap-2 text-xl font-bold text-white">
          Create Invoice

          <span className="rounded-full bg-yellow-500/15 px-2 py-0.5 text-[11px] font-medium text-yellow-400">
            Draft
          </span>
        </h1>

        <p className="text-xs text-zinc-400">
          Create, preview & export invoices
        </p>
      </div>
    </div>

  </div>
</div>

      <InvoiceForm />
    </div>
  );
}