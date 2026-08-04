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
    <div className="flex flex-col items-center">

      {/* Print Button */}
      <div className="mb-5 flex w-[210mm] justify-end">

        <button
          onClick={handlePrint}
          className="rounded-xl border border-yellow-500 bg-yellow-500 px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-yellow-400"
        >
          🖨 Print Report
        </button>

      </div>

      {/* Revenue Report */}
      <div
        className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_0_70px_rgba(255,215,0,0.08)] backdrop-blur-xl"
      >
        <div ref={printRef}>
          <RevenueView revenue={revenue} />
        </div>
      </div>

    </div>
  );
}