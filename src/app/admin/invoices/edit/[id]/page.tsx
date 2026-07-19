"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import InvoiceForm from "../../../../../components/admin/invoice/InvoiceForm";
import { getInvoiceById } from "../../../../../services/invoice.service";

export default function EditInvoicePage() {
  const params = useParams();
  const id = params.id as string;

  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInvoice() {
      try {
      const data = await getInvoiceById(id);

setInvoice({
  invoiceNumber: data.invoice_number,
  customerName: data.customer_name,
  company: data.company,
  email: data.email,
  phone: data.phone,
  address: data.address,

  invoiceDate: data.invoice_date,
  dueDate: data.due_date,

  currency: data.currency,

  shipping: data.shipping,
  discount: data.discount,

  subtotal: data.subtotal,
  total: data.total,

  paymentTerms: data.payment_terms,
  notes: data.notes,
  status: data.status,

  items: (data.invoice_items ?? []).map((item: any) => ({
    productName: item.product_name,
    size: item.size,
    quantity: item.quantity,
    unitPrice: item.unit_price,
    total: item.total,
  })),
});
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadInvoice();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading...
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="p-8 text-red-500">
        Invoice not found.
      </div>
    );
  }

  return (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold">Edit Invoice</h1>
      <p className="text-sm text-gray-400">
        Update customer invoice.
      </p>
    </div>

    <InvoiceForm
      initialData={invoice}
      invoiceId={id}
      isEdit
    />
  </div>
);
}