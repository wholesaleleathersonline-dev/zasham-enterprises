"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import RevenueView from "./RevenueView";

interface RevenuePrintProps {
  revenue: any;
}

export default function RevenuePrint({
  revenue,
}: RevenuePrintProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Revenue-${revenue.invoice_number}`,
  });

  return (
    <div className="flex flex-col items-center print:block">

      {/* Print Button - Hide in Print */}
      <div className="mb-5 flex w-[210mm] justify-end print:hidden">
        <button
          onClick={handlePrint}
          className="rounded-xl border border-[#E5A812] bg-[#E5A812] px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105"
        >
          🖨 Print Report
        </button>
      </div>

      {/* Screen Wrapper */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_0_70px_rgba(255,215,0,0.08)] backdrop-blur-xl print:rounded-none print:border-0 print:bg-transparent print:p-0 print:shadow-none print:backdrop-blur-none">

        <div ref={printRef}>
          <RevenueView revenue={revenue} />
        </div>

      </div>

    </div>
  );
}