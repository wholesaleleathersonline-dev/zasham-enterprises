import { InvoiceListItem } from "../../../types/invoice";
import InvoiceStatusBadge from "./InvoiceStatusBadge";
import Link from "next/link";
import { updateInvoiceStatus } from "../../../services/invoice.service";


interface InvoiceTableProps {
  invoices: InvoiceListItem[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export default function InvoiceTable({

  invoices,
  loading,
  onDelete,
}: InvoiceTableProps) {

  const handleStatusChange = async (
  id: string,
  status: InvoiceListItem["status"]
) => {
  try {
    await updateInvoiceStatus(id, status);
    window.location.reload();
  } catch (error) {
    console.error(error);
    alert("Failed to update invoice status.");
  }
};
  if (loading) {
    return (
      <div className="rounded-xl border border-yellow-500/20 bg-[#1A1A1A] p-6 text-center text-white">
        Loading invoices...
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="rounded-xl border border-yellow-500/20 bg-[#1A1A1A] p-6 text-center text-white">
        No invoices found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-yellow-500/20 bg-[#1A1A1A]">
      <table className="min-w-full">
        <thead className="border-b border-yellow-500/20 bg-[#161616]">
          <tr>
            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400 ">Invoice</th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">Customer</th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">Company</th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">Date</th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">Total</th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-yellow-400">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="border-b border-zinc-800 hover:bg-zinc-800/40"
            >
              <td className="px-4 py-3 text-white" >{invoice.invoice_number}</td>

              <td className="px-4 py-3 text-white">{invoice.customer_name}</td>

              <td className="px-4 py-3 text-white">{invoice.company}</td>

              <td className="px-4 py-3 text-white">{invoice.invoice_date}</td>

              <td className="px-4 py-3 text-white">
                ${invoice.total.toFixed(2)}
              </td>

             <td className="px-4 py-3">
  <select
    value={invoice.status}
    onChange={(e) =>
      handleStatusChange(
        invoice.id,
        e.target.value as InvoiceListItem["status"]
      )
    }
    className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-yellow-500 focus:outline-none"
  >
    <option value="Draft">Draft</option>
    <option value="Sent">Sent</option>
    <option value="Paid">Paid</option>
    <option value="Unpaid">Unpaid</option>
  </select>
</td>

              <td className="px-4 py-3">
  <div className="flex justify-end gap-2">
    <Link
      href={`/admin/invoices/${invoice.id}`}
      className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-500"
    >
      View
    </Link>

    <Link
  href={`/admin/invoices/edit/${invoice.id}`}
  className="rounded-lg bg-yellow-500 px-3 py-1 text-sm font-semibold text-black hover:bg-yellow-400"
>
  Edit
</Link>


    <button
      onClick={() => onDelete(invoice.id)}
      className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-500"
    >
      Delete
    </button>
  </div>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}