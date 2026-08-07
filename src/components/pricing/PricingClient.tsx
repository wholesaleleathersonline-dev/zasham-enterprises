"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { generatePriceListPdf } from "../../lib/pdf/generatePriceListPdf";
import type { PriceListItem } from "../../services/admin/price-list.service";

interface PricingClientProps {
  items: PriceListItem[];
  children: ReactNode;
}

export default function PricingClient({
  items,
  children,
}: PricingClientProps) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    try {
      setLoading(true);
      await generatePriceListPdf(items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mx-auto mt-16 mb-8 flex max-w-7xl justify-end px-6">
        <button
          onClick={handleDownload}
          disabled={loading}
          className="rounded-xl bg-[#C8A44D] px-6 py-3 font-semibold text-black transition hover:bg-[#d8b45d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Generating PDF..."
            : "Download Price List PDF"}
        </button>
      </div>

      {children}
    </>
  );
}