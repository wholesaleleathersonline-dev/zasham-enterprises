"use client";

import { useEffect, useState } from "react";
import { getRevenueInvoices } from "../../../services/revenue.service";
import CalculateRevenueModal from "./CalculateRevenueModal";


export default function RevenueTable() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadInvoices();
  }, []);

  async function loadInvoices() {
    
    try {
        
      const data = await getRevenueInvoices();
      setInvoices(data || []);
    } catch (error) {
      console.error("Failed to load invoices:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
      <table className="w-full">
        <thead className="border-b border-zinc-800">
          <tr className="text-left text-sm text-zinc-400">
            <th className="px-6 py-4">Customer</th>
            <th className="px-6 py-4">Invoice #</th>
            <th className="px-6 py-4">Invoice Amount</th>
            <th className="px-6 py-4">Revenue</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="border-b border-zinc-800 hover:bg-zinc-800/40"
            >
              <td className="whitespace-nowrap px-6 py-5">
                <div className="font-semibold text-white">
                  {invoice.customer_name}
                </div>
              </td>

              <td className="px-6 py-5 text-zinc-300">
                {invoice.invoice_number}
              </td>

              <td className="px-6 py-5">
                <div className="text-xs text-zinc-500">
                  Invoice Amount
                </div>

                <div className="font-bold text-green-400">
                  ${Number(invoice.total).toLocaleString()}
                </div>
              </td>

              <td className="px-6 py-5">
                <div className="text-xs text-zinc-500">
                  Revenue
                </div>

                <div className="font-bold text-yellow-400">
                  ${Number(invoice.revenue).toLocaleString()}
                </div>
              </td>

              <td className="px-6 py-5">
                <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                  {invoice.status}
                </span>
              </td>

              <td className="px-6 py-5">
                <button
  onClick={() => {
    setSelectedInvoice(invoice);
    setOpenModal(true);
  }}
 className="rounded-lg bg-yellow-500 px-2 py-2 text-xs font-semibold text-black"
>
  {invoice.revenue && Number(invoice.revenue) > 0
    ? "Edit Revenue"
    : "Calculate Cost"}
</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


<CalculateRevenueModal
  open={openModal}
  invoice={selectedInvoice}
  onClose={() => {
    setOpenModal(false);
    setSelectedInvoice(null);
    loadInvoices();
  }}
/>


    </div>
  );
}