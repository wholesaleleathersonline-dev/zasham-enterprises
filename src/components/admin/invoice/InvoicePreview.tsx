"use client";
import Image from "next/image";
interface InvoiceItem {
  productName: string;
  size: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoicePreviewProps {
  invoice: {
    invoiceNumber: string;
    customerName: string;
    company: string;
    email: string;
    phone: string;
    address: string;

    invoiceDate: string;
    dueDate: string;

    currency: string;

    subtotal: number;
    shipping: number;
    discount: number;
    total: number;

    paymentTerms: string;
    notes: string;

    items: InvoiceItem[];
  };
}

export default function InvoicePreview({
  invoice,
}: InvoicePreviewProps) {

      return (
    <div
      id="invoice-preview"
      className="mx-auto bg-white text-black shadow-2xl print:shadow-none"
style={{
  width: "190mm",
  padding: "8mm",
}}
    >
      {/* Header */}
<div className="flex items-start justify-between border-b-2 border-yellow-500 pb-4">

  <div>
<Image
  src="/logo/logo2.png"
  alt="Zasham Enterprises"
  width={180}
  height={65}
  priority
/>

    <p className="mt-2 text-gray-600">
      Custom Sportswear Manufacturer
    </p>

    <p className="text-gray-600">
      Sialkot, Pakistan
    </p>

    <p className="text-gray-600">
      wholesaleleathersonline@gmail.com
    </p>

    <p className="text-gray-600">
      www.zashamenterprises.com
    </p>
  </div>

  <div className="text-right">

    <h2 className="text-3xl font-bold text-yellow-600">
      INVOICE
    </h2>

    <div className="mt-5 space-y-1">

      <p>
        <strong>No:</strong> {invoice.invoiceNumber}
      </p>

      <p>
        <strong>Date:</strong> {invoice.invoiceDate}
      </p>

      <p>
        <strong>Due:</strong> {invoice.dueDate}
      </p>

    </div>

  </div>

</div>

{/* Customer */}    

<div className="mt-6">

  <h3 className="mb-2 text-lg font-bold text-yellow-600">
    Bill To
  </h3>

  <p className="font-semibold text-lg">
    {invoice.customerName}
  </p>

  <p>{invoice.company}</p>

  <p>{invoice.email}</p>

  <p>{invoice.phone}</p>

  <p>{invoice.address}</p>

</div>

      {/* Products */}

      <div className="mt-6">

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-yellow-500 text-black">

              <th className="border border-gray-300 p-2 text-left">
                Product
              </th>

              <th className="border border-gray-300 p-2 text-center">
                Size
              </th>

              <th className="border border-gray-300 p-2 text-center">
                Qty
              </th>

              <th className="border border-gray-300 p-2 text-right">
                Unit Price
              </th>

              <th className="border border-gray-300 p-2 text-right">
                Total
              </th>

            </tr>

          </thead>

          <tbody>

            {invoice.items.map((item, index) => (

              <tr key={index}>

                <td className="border border-gray-300 p-2">
                  {item.productName}
                </td>

                <td className="border border-gray-300 p-2 text-center">
                  {item.size}
                </td>

                <td className="border border-gray-300 p-2 text-center">
                  {item.quantity}
                </td>

                <td className="border border-gray-300 p-2 text-right">
                  {invoice.currency} {item.unitPrice.toFixed(2)}
                </td>

                <td className="border border-gray-300 p-2 text-right font-semibold">
                  {invoice.currency} {item.total.toFixed(2)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Totals */}

      <div className="mt-6 flex justify-end">

        <div text-2xl>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>
              {invoice.currency} {invoice.subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>
              {invoice.currency} {invoice.shipping.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Discount</span>
            <span>
              - {invoice.currency} {invoice.discount.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-6 border-t-2 border-yellow-500 pt-3 text-xl font-bold">

            <span>Grand Total </span>
              <p> </p>
            <span>
              {invoice.currency} {invoice.total.toFixed(2)}
            </span>

          </div>

        </div>

      </div>

      {/* Payment Terms */}

      <div className="mt-6">

        <h3 className="font-bold text-yellow-600">
          Payment Terms
        </h3>

        <p className="mt-2">
          {invoice.paymentTerms || "-"}
        </p>

      </div>

      {/* Notes */}

      <div className="mt-6">

        <h3 className="font-bold text-yellow-600">
          Notes
        </h3>

        <p className="mt-2">
          {invoice.notes || "-"}
        </p>

      </div>

      {/* Footer */}

      <div className="mt-16 border-t pt-6 text-center text-gray-500">

        Thank you for choosing <strong>ZASHAM ENTERPRISES</strong>

      </div>






    </div>





  );
}