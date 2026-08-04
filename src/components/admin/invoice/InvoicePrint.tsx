"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import InvoicePreview from "./InvoicePreview";

interface InvoicePrintProps {
  invoice: any;
}

export default function InvoicePrint({
  invoice,
}: InvoicePrintProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: invoice.invoiceNumber || "Invoice",
  });

  return (
    <>
      <div className="mb-4 flex justify-end print:hidden">
        <button
          onClick={handlePrint}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
        >
          Print / Save PDF
        </button>
      </div>

      <div
        ref={printRef}
        className="flex justify-center"
      >
        <InvoicePreview invoice={invoice} />
      </div>
    </>
  );
}