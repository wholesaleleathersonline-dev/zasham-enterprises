"use client";

import { useEffect, useState } from "react";
import { getUsdRate } from "../../../services/revenue.service";
import {saveRevenue} from "../../../services/revenue.service"
import FormStatusModal from "../../ui/FormStatusModal";

interface CalculateRevenueModalProps {
  open: boolean;
  onClose: () => void;
  invoice: any;
}

export default function CalculateRevenueModal({
  open,
  onClose,
  invoice,
}: CalculateRevenueModalProps) {
  const [fabricCost, setFabricCost] = useState(0);
  const [sublimationCost, setSublimationCost] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);

  const [totalCost, setTotalCost] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const [usdRate, setUsdRate] = useState(285);
const [invoicePkr, setInvoicePkr] = useState(0);
const [revenuePkr, setRevenuePkr] = useState(0);
const [revenueUsd, setRevenueUsd] = useState(0);
const [showSuccess, setShowSuccess] = useState(false);




useEffect(() => {
  async function loadRate() {
    try {
      const rate = await getUsdRate();

      setUsdRate(rate);

      if (invoice) {
        setInvoicePkr(Number(invoice.total) * rate);
      }
    } catch (err) {
      console.error(err);
    }
  }

  loadRate();
}, [invoice]);

  useEffect(() => {
    const total =
      fabricCost +
      sublimationCost +
      shippingCost;

    setTotalCost(total);

    if (invoice) {
      const invoiceAmountPkr =
  Number(invoice.total) * usdRate;

const total =
  fabricCost +
  sublimationCost +
  shippingCost;

const revenuePkrValue =
  invoiceAmountPkr - total;

const revenueUsdValue =
  revenuePkrValue / usdRate;

setTotalCost(total);
setRevenuePkr(revenuePkrValue);
setRevenueUsd(revenueUsdValue);
    }
  }, [
    fabricCost,
    sublimationCost,
    shippingCost,
    invoice,
  ]);

const handleSave = async () => {
  try {
    console.log("Revenue USD:", revenueUsd);
console.log("Total Cost:", totalCost);
console.log("Invoice Total USD:", invoice.total);
await saveRevenue(invoice.id, {
  fabric_cost: fabricCost,
  sublimation_cost: sublimationCost,
  shipping_cost: shippingCost,
  total_cost: totalCost,
  revenue: revenueUsd,
});

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1800);

  } catch (error) {
    console.error(error);
    alert("Failed to save revenue.");
  }
};

  if (!open || !invoice) return null;

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
  <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Calculate Revenue
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            ✕
          </button>
        </div>

       <div className="mb-6 rounded-xl bg-zinc-800 p-4 sm:p-5">

  <p className="text-sm text-zinc-400">
    Invoice Amount (USD)
  </p>

  <p className="text-xl sm:text-2xl font-bold text-green-400">
    ${Number(invoice.total).toLocaleString()}
  </p>

  <p className="mt-3 text-sm text-zinc-400">
    Invoice Amount (PKR)
  </p>

  <p className="text-lg sm:text-xl font-bold text-yellow-400">
    Rs {invoicePkr.toLocaleString()}
  </p>

</div>

        <div className="space-y-4">

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Fabric Cost
            </label>

            <input
              type="number"
              value={fabricCost}
              onChange={(e) =>
                setFabricCost(Number(e.target.value))
              }
              className="h-12 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Sublimation Cost
            </label>

            <input
              type="number"
              value={sublimationCost}
              onChange={(e) =>
                setSublimationCost(Number(e.target.value))
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Shipping Cost
            </label>

            <input
              type="number"
              value={shippingCost}
              onChange={(e) =>
                setShippingCost(Number(e.target.value))
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white"
            />
          </div>

        </div>

        <div className="mt-6 rounded-xl bg-zinc-800 p-4">

  <div className="flex justify-between">
    <span>Total Cost (PKR)</span>

    <span className="font-bold">
      Rs {totalCost.toLocaleString()}
    </span>
  </div>

  <div className="mt-3 flex justify-between">
    <span>Revenue (PKR)</span>

    <span className="font-bold text-green-400">
      Rs {revenuePkr.toLocaleString()}
    </span>
  </div>

  <div className="mt-3 flex justify-between">
    <span>Revenue (USD)</span>

    <span className="font-bold text-yellow-400">
      ${revenueUsd.toFixed(2)}
    </span>
  </div>

</div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

          <button
            className=" h-12 flex-1 rounded-lg bg-zinc-700 py-3 text-white"
            onClick={onClose}
          >
            Cancel
          </button>

         <button
  onClick={handleSave}
  className=" h-12 flex-1 rounded-lg bg-yellow-500 py-3 font-semibold text-black"
>
  Save Revenue
</button>

        </div>

      </div>
{showSuccess && (
<FormStatusModal
  isOpen={showSuccess}
  title="Revenue Saved"
  message="Revenue has been calculated and saved successfully."
  onClose={() => setShowSuccess(false)}
/>
)}
    </div>
  );
}