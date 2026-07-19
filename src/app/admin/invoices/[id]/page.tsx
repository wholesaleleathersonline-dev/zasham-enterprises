"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import InvoicePreview from "../../../../components/admin/invoice/InvoicePreview";
import { getInvoiceById } from "../../../../services/invoice.service";
import { Invoice } from "../../../../types/invoice";
import Link from "next/link";

export default function InvoiceDetailPage() {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  const handleSendEmail = async () => {
  if (!invoice) return;

  try {
    const response = await fetch("/api/invoices/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     body: JSON.stringify({
  invoiceNumber: invoice.invoiceNumber,
  customerName: invoice.customerName,
  company: invoice.company,
  invoiceDate: invoice.invoiceDate,
  dueDate: invoice.dueDate,
  currency: invoice.currency,
  email: invoice.email,
  total: invoice.total,
}),
    });

    const result = await response.json();

   if (!response.ok || !result.success) {
  alert(result.message || "Failed to send email.");
  return;
}

alert("Invoice email sent successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to send invoice email.");
  }
};

  useEffect(() => {
    async function loadInvoice() {
      try {
        const data = await getInvoiceById(params.id as string);
console.log("Invoice from DB:", data);
        setInvoice({
          id: data.id,
          invoiceNumber: data.invoice_number,
          customerName: data.customer_name,
          company: data.company,
          email: data.email,
          phone: data.phone,
          address: data.address,

          currency: data.currency,

          invoiceDate: data.invoice_date,
          dueDate: data.due_date,

          subtotal: data.subtotal,
          shipping: data.shipping,
          discount: data.discount,
          total: data.total,

          paymentTerms: data.payment_terms,
          notes: data.notes,

          status: data.status,

          items:
            data.invoice_items?.map((item: any) => ({
              id: item.id,
              productName: item.product_name,
              size: item.size,
              quantity: item.quantity,
              unitPrice: item.unit_price,
              total: item.total,
            })) ?? [],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadInvoice();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading invoice...
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="p-8 text-white">
        Invoice not found.
      </div>
    );
  }

 return (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Invoice {invoice.invoiceNumber}
        </h1>
        <p className="text-sm text-zinc-400">
          Customer: {invoice.customerName}
        </p>
      </div>

      <div className="flex gap-3">
       <button
  onClick={handleSendEmail}
  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
>
  Send Email
</button>

        <Link
          href={`/admin/invoices/edit/${invoice.id}`}
          className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-400"
        >
          Edit
        </Link>
      </div>
    </div>

    <div className="overflow-auto rounded-2xl bg-zinc-900 p-6">
      <InvoicePreview invoice={invoice} />
    </div>
  </div>
);
}