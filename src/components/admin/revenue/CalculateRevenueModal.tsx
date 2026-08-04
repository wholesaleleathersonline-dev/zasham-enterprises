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
  const [stitchingCost, setStitchingCost] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [jerseyQty, setJerseyQty] = useState(0);
const [shortQty, setShortQty] = useState(0);  

  const [totalCost, setTotalCost] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const [usdRate, setUsdRate] = useState(278);
const [invoicePkr, setInvoicePkr] = useState(0);
const [revenuePkr, setRevenuePkr] = useState(0);
const [revenueUsd, setRevenueUsd] = useState(0);
const [totalPieces, setTotalPieces] = useState(0);
const [costPerPiece, setCostPerPiece] = useState(0);
const [revenuePerPiece, setRevenuePerPiece] = useState(0);
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
  if (!invoice) return;

  setFabricCost(Number(invoice.fabric_cost ?? 0));
  setSublimationCost(Number(invoice.sublimation_cost ?? 0));
  setStitchingCost(Number(invoice.stitching_cost ?? 0));
  setShippingCost(Number(invoice.shipping_cost ?? 0));

  setJerseyQty(Number(invoice.jersey_qty ?? 0));
  setShortQty(Number(invoice.short_qty ?? 0));

  setTotalPieces(Number(invoice.total_pieces ?? 0));
  setCostPerPiece(Number(invoice.cost_per_piece ?? 0));

}, [invoice]);

useEffect(() => {
  if (!invoice) return;

  const total =
    fabricCost +
    sublimationCost +
    stitchingCost +
    shippingCost;

  const invoiceAmountPkr =
    Number(invoice.total) * usdRate;

  const revenuePkrValue =
    invoiceAmountPkr - total;

  const revenueUsdValue =
    revenuePkrValue / usdRate;

  const pieces =
    jerseyQty + shortQty;

  const costPerPieceValue =
    pieces > 0
      ? total / pieces
      : 0;

  const revenuePerPieceValue =
    pieces > 0
      ? revenueUsdValue / pieces
      : 0;

  setTotalCost(total);

  setRevenuePkr(revenuePkrValue);
  setRevenueUsd(revenueUsdValue);

  setTotalPieces(pieces);

  setCostPerPiece(costPerPieceValue);

  setRevenuePerPiece(revenuePerPieceValue);

}, [
  fabricCost,
  sublimationCost,
  stitchingCost,
  shippingCost,
  jerseyQty,
  shortQty,
  usdRate,
  invoice,
]);




const handleSave = async () => {
  try {
    const pieces = jerseyQty + shortQty;

    const total =
      fabricCost +
      sublimationCost +
      stitchingCost +
      shippingCost;

    const costPerPieceValue =
      pieces > 0 ? total / pieces : 0;

    console.log("Revenue USD:", revenueUsd);
    console.log("Total Cost:", total);
    console.log("Cost Per Piece:", costPerPieceValue);

    await saveRevenue(invoice.id, {
      fabric_cost: fabricCost,
      sublimation_cost: sublimationCost,
      stitching_cost: stitchingCost,
      shipping_cost: shippingCost,

      jersey_qty: jerseyQty,
      short_qty: shortQty,
      total_pieces: pieces,
      cost_per_piece: costPerPieceValue,

      total_cost: total,
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
    Stitching Cost
  </label>

  <input
    type="number"
    value={stitchingCost}
    onChange={(e) =>
      setStitchingCost(Number(e.target.value))
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

          <div>
  <label className="mb-2 block text-sm text-zinc-300">
    Jersey Quantity
  </label>

  <input
    type="number"
    value={jerseyQty}
    onChange={(e) => setJerseyQty(Number(e.target.value))}
    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white"
  />
</div>

<div>
  <label className="mb-2 block text-sm text-zinc-300">
    Short Quantity
  </label>

  <input
    type="number"
    value={shortQty}
    onChange={(e) => setShortQty(Number(e.target.value))}
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


  <div className="mt-3 flex justify-between">
  <span>Total Pieces</span>

  <span className="font-bold">
    {totalPieces}
  </span>
</div>

<div className="mt-3 flex justify-between">
  <span>Cost / Piece</span>

  <span className="font-bold text-blue-600">
    Rs {costPerPiece.toFixed(2)}
  </span>
</div>

  <div className="mt-3 flex justify-between">
  <span>Total Pieces</span>

  <span className="font-bold text-blue-400">
    {totalPieces}
  </span>
</div>

<div className="mt-3 flex justify-between">
  <span>Cost / Piece</span>

  <span className="font-bold text-orange-400">
    Rs {costPerPiece.toFixed(2)}
  </span>
</div>

<div className="mt-3 flex justify-between">
  <span>Revenue / Piece</span>

  <span className="font-bold text-green-400">
    ${revenuePerPiece.toFixed(2)}
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