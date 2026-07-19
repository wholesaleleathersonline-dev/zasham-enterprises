
"use client";
import { createInvoice } from "../../../services/invoice.service";


import { useState } from "react";

interface InvoiceItem {
  productName: string;
  size: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceState {
  invoiceNumber: string;

  customerName: string;
  company: string;
  email: string;
  phone: string;
  address: string;

  invoiceDate: string;
  dueDate: string;

  currency: string;

  shipping: number;
  discount: number;

  subtotal: number;
  total: number;

  paymentTerms: string;
  notes: string;

  items: InvoiceItem[];
}

export default function InvoiceForm() {
const [loading, setLoading] = useState(false);
      const [invoice, setInvoice] = useState<InvoiceState>({
        
    invoiceNumber: "",

    customerName: "",
    company: "",
    email: "",
    phone: "",
    address: "",

    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",

    currency: "USD",

    shipping: 0,
    discount: 0,

    subtotal: 0,
    total: 0,

    paymentTerms: "",
    notes: "",

    items: [
      {
        productName: "",
        size: "",
        quantity: 1,
        unitPrice: 0,
        total: 0,
      },
    ],
  });

  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
)=> {
    const { name, value } = e.target;

    setInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));




  };

 const handleNumberChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value } = e.target;

  setInvoice((prev) => ({
    ...prev,
    [name]: Number(value),
    total:
      name === "shipping"
        ? prev.subtotal + Number(value) - prev.discount
        : name === "discount"
        ? prev.subtotal + prev.shipping - Number(value)
        : prev.total,
  }));
};

const addProduct = () => {
  setInvoice((prev) => ({
    ...prev,
    items: [
      ...prev.items,
      {
        productName: "",
        size: "",
        quantity: 1,
        unitPrice: 0,
        total: 0,
      },
    ],
  }));
};

const removeProduct = (index: number) => {
  setInvoice((prev) => ({
    ...prev,
    items: prev.items.filter((_, i) => i !== index),
  }));
};

const handleProductChange = (
  index: number,
  field: keyof InvoiceItem,
  value: string | number
) => {
  const updatedItems = [...invoice.items];

  updatedItems[index] = {
    ...updatedItems[index],
    [field]: value,
  };

  if (field === "quantity" || field === "unitPrice") {
    updatedItems[index].total =
      Number(updatedItems[index].quantity) *
      Number(updatedItems[index].unitPrice);
  }

  const subtotal = updatedItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  setInvoice((prev) => ({
    ...prev,
    items: updatedItems,
    subtotal,
    total: subtotal + prev.shipping - prev.discount,
  }));
};


const handleSaveInvoice = async () => {
  try {
    setLoading(true);

    const payload = {
  ...invoice,
  invoiceNumber:
    invoice.invoiceNumber ||
    `INV-${Date.now()}`,
  status: "Draft",
};

   await createInvoice(payload as any);

    alert("Invoice Saved Successfully ✅");

  } catch (err) {
    console.error(err);
    alert("Failed to save invoice.");
  } finally {
    setLoading(false);
  }
};





return (
  <div className="mx-auto max-w-7xl p-4 md:p-6 xl:p-8">

    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

      {/* LEFT SECTION */}
      <div className="space-y-6 xl:col-span-2">
<div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6">

  <h2 className="mb-6 text-2xl font-bold text-yellow-400">
    Customer Information
  </h2>

  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

    <input
      name="customerName"
      placeholder="Customer Name"
      value={invoice.customerName}
      onChange={handleChange}
      className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white focus:border-yellow-500 outline-none"
    />

    <input
      name="company"
      placeholder="Company"
      value={invoice.company}
      onChange={handleChange}
      className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white focus:border-yellow-500 outline-none"
    />

    <input
      name="email"
      placeholder="Email"
      value={invoice.email}
      onChange={handleChange}
      className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white focus:border-yellow-500 outline-none"
    />

    <input
      name="phone"
      placeholder="Phone"
      value={invoice.phone}
      onChange={handleChange}
      className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white focus:border-yellow-500 outline-none"
    />

  </div>

  <textarea
    rows={4}
    name="address"
    placeholder="Customer Address"
    value={invoice.address}
    onChange={handleChange}
    className="mt-5 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white focus:border-yellow-500 outline-none"
  />

</div>


<div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6">

  <h2 className="mb-6 text-2xl font-bold text-yellow-400">
    Invoice Details
  </h2>

  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

    <div>
      <label className="mb-2 block text-sm text-zinc-400">
        Invoice Number
      </label>

      <input
        type="text"
        name="invoiceNumber"
        value={invoice.invoiceNumber}
        onChange={handleChange}
        placeholder="INV-000001"
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm text-zinc-400">
        Invoice Date
      </label>

      <input
        type="date"
        name="invoiceDate"
        value={invoice.invoiceDate}
        onChange={handleChange}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm text-zinc-400">
        Due Date
      </label>

      <input
        type="date"
        name="dueDate"
        value={invoice.dueDate}
        onChange={handleChange}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm text-zinc-400">
        Currency
      </label>

      <select
        name="currency"
        value={invoice.currency}
        onChange={handleChange}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="PKR">PKR</option>
      </select>
    </div>
    
    <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6">

  <div className="mb-6 flex items-center justify-between">

    <h2 className="text-2xl font-bold text-yellow-400">
      Products
    </h2>

    <button
      type="button"
      onClick={addProduct}
      className="rounded-xl bg-yellow-500 px-4 py-2 font-semibold text-black hover:bg-yellow-400"
    >
      + Add Product
    </button>

  </div>

  {invoice.items.map((item, index) => (

    <div
      key={index}
      className="mb-6 rounded-xl border border-zinc-800 bg-zinc-950 p-5"
    >

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">

        <input
          type="text"
          placeholder="Product Name"
          value={item.productName}
          onChange={(e)=>
            handleProductChange(
              index,
              "productName",
              e.target.value
            )
          }
          className="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
        />

        <input
          type="text"
          placeholder="Size"
          value={item.size}
          onChange={(e)=>
            handleProductChange(
              index,
              "size",
              e.target.value
            )
          }
          className="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
        />

        <input
          type="number"
          placeholder="Qty"
          value={item.quantity}
          onChange={(e)=>
            handleProductChange(
              index,
              "quantity",
              Number(e.target.value)
            )
          }
          className="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
        />

        <input
          type="number"
          placeholder="Unit Price"
          value={item.unitPrice}
          onChange={(e)=>
            handleProductChange(
              index,
              "unitPrice",
              Number(e.target.value)
            )
          }
          className="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
        />

        <div className="flex items-center justify-between rounded-xl border border-zinc-700 bg-black px-4 py-3">

          <span className="font-bold text-yellow-400">
            ${item.total.toFixed(2)}
          </span>

          {invoice.items.length > 1 && (

            <button
              type="button"
              onClick={() => removeProduct(index)}
              className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-500"
            >
              Remove
            </button>

          )}

        </div>

      </div>

    </div>

  ))}

</div>

  </div>

</div>
      </div>

      {/* RIGHT SECTION */}
      <div className="space-y-6">
<div className="sticky top-24 rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6 shadow-lg">

  <h2 className="mb-6 text-2xl font-bold text-yellow-400">
    Invoice Summary
  </h2>

  <div className="space-y-5">

    <div>
      <label className="mb-2 block text-sm text-zinc-400">
        Shipping
      </label>

      <input
        type="number"
        name="shipping"
        value={invoice.shipping}
        onChange={handleNumberChange}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm text-zinc-400">
        Discount
      </label>

      <input
        type="number"
        name="discount"
        value={invoice.discount}
        onChange={handleNumberChange}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
      />
    </div>

    <hr className="border-zinc-800" />

    <div className="flex justify-between">
      <span className="text-zinc-400">Subtotal</span>
      <span className="font-semibold text-white">
        ${invoice.subtotal.toFixed(2)}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-zinc-400">Shipping</span>
      <span className="font-semibold text-white">
        ${invoice.shipping.toFixed(2)}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-zinc-400">Discount</span>
      <span className="font-semibold text-white">
        - ${invoice.discount.toFixed(2)}
      </span>
    </div>

    <hr className="border-zinc-800" />

    <div className="flex justify-between text-2xl font-bold text-yellow-400">
      <span>Grand Total</span>
      <span>${invoice.total.toFixed(2)}</span>
    </div>

   <button
  type="button"
  onClick={handleSaveInvoice}
  disabled={loading}
  className="mt-6 w-full rounded-xl bg-yellow-500 py-3 font-bold text-black transition hover:bg-yellow-400 disabled:opacity-50"
>
  {loading ? "Saving..." : "Save Invoice"}
</button>

  </div>

</div>
      </div>

    </div>

  </div>
);

}





  
  