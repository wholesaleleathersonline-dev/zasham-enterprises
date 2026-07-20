  "use client";

  import { useState } from "react";
  import { useRouter } from "next/navigation";
import {
  createInvoice,
  updateInvoice,

} from "../../../services/invoice.service";
  import html2canvas from "html2canvas";
  import { toJpeg } from "html-to-image";
  import { useRef } from "react";
  import { useReactToPrint } from "react-to-print";
  import InvoicePreview from "./InvoicePreview";
  import { useEffect } from "react";
  import {
    getCustomers,
    CustomerRow,
    
  } from "../../../services/customer.service";
  import { Customer } from "../../../types/customer";
  import { useSearchParams } from "next/navigation";
  import FormStatusModal from "../../ui/FormStatusModal";


  




  interface InvoiceItem {
    productName: string;
    size: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }

  interface InvoiceState {
    invoiceNumber: string;
      customerId?: string;

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

 interface InvoiceFormProps {
  initialData?: InvoiceState;
  invoiceId?: string;
  isEdit?: boolean;
}

export default function InvoiceForm({
  initialData,
  invoiceId,
  isEdit = false,
}: InvoiceFormProps) {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
const [modalTitle, setModalTitle] = useState("");
const [modalMessage, setModalMessage] = useState("");

const showModal = (title: string, message: string) => {
  setModalTitle(title);
  setModalMessage(message);
  setModalOpen(true);
};

const customerIdFromUrl = searchParams.get("customer");

   const defaultInvoice: InvoiceState = {
  invoiceNumber: "",
customerId: "",
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
};

const [invoice, setInvoice] = useState<InvoiceState>(
  initialData ?? defaultInvoice
);

useEffect(() => {
  if (initialData) {
    setInvoice(initialData);
  }
}, [initialData]);

useEffect(() => {
  async function loadCustomers() {
    try {
      const data = await getCustomers();

      setCustomers(data);

      if (customerIdFromUrl) {
        const selected = data.find(
          (c) => c.id === customerIdFromUrl
        );

        if (selected) {
          setInvoice((prev) => ({
            ...prev,
            customerId: selected.id,
            customerName: selected.customerName,
            company: selected.company,
            email: selected.email,
            phone: selected.phone,
            address: selected.address,
          }));
        }
      }
    } catch (error) {
      console.error("LOAD CUSTOMERS ERROR:", error);
    }
  }

  loadCustomers();
}, [customerIdFromUrl]);





    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
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

      const numberValue = Number(value);

      setInvoice((prev) => {
        const updated = {
          ...prev,
          [name]: numberValue,
        };

        return {
          ...updated,
          total:
            updated.subtotal +
            updated.shipping -
            updated.discount,
        };
      });
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
      const items = [...invoice.items];

      items[index] = {
        ...items[index],
        [field]: value,
      };

      items[index].total =
        Number(items[index].quantity) *
        Number(items[index].unitPrice);

      const subtotal = items.reduce(
        (sum, item) => sum + item.total,
        0
      );

      setInvoice((prev) => ({
        ...prev,
        items,
        subtotal,
        total:
          subtotal +
          prev.shipping -
          prev.discount,
      }));
    };

      const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: invoice.invoiceNumber || "Invoice",
  });
const handleSaveInvoice = async () => {
  try {
    setLoading(true);

    const payload = {
      ...invoice,
      status: "Draft",
    };

    console.log("PAYLOAD:", payload);

    if (isEdit && invoiceId) {
      await updateInvoice(invoiceId, payload as any);

      showModal(
  "Invoice Updated",
  "Invoice has been updated successfully."
);
    } else {
      const savedInvoice = await createInvoice(payload as any);

      router.push(`/admin/invoices/${savedInvoice.id}`);
    }
  } catch (error) {
    console.error("SAVE ERROR:", error);
    alert(JSON.stringify(error, null, 2));
    alert("Failed to save invoice.");
  } finally {
    setLoading(false);
  }
};


  const downloadJPG = async () => {
    const element = document.getElementById("invoice-preview");

    if (!element) {
      alert("Invoice preview not found");
      return;
    }

    try {
      const dataUrl = await toJpeg(element, {
        quality: 1,
        pixelRatio: 3,
        backgroundColor: "#ffffff",
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `${invoice.invoiceNumber || "invoice"}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error(error);
      alert("Failed to generate JPG.");
    }
  };

      return (
        <>
      <div className="mx-auto w-full max-w-[1800px] p-4 md:p-6 xl:p-8">

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-10">

          {/* LEFT SECTION */}
          <div className="space-y-6 xl:col-span-4">

  {/*leftcodepart1*/}

  <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6 shadow-lg">
    <h2 className="mb-6 text-2xl font-bold text-yellow-400">
      Customer Information
    </h2>

    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

      {/* Customer */}
      <div>
        <label className="mb-2 block text-sm text-zinc-400">
          Customer
        </label>

        <select
          value={invoice.customerName}
          onChange={(e) => {
            const selected = customers.find(
              (c) => c.customerName === e.target.value
            );

            if (!selected) return;

setInvoice((prev) => ({
  ...prev,
  customerId: selected.id,
  customerName: selected.customerName,
  company: selected.company,
  email: selected.email,
  phone: selected.phone,
  address: selected.address,
}));
          }}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
        >
          <option value="">Select Customer</option>

          {customers.map((customer) => (
            <option
              key={customer.id}
              value={customer.customerName}
            >
              {customer.customerName}
            </option>
          ))}
        </select>
      </div>

      {/* Company */}
      <div>
        <label className="mb-2 block text-sm text-zinc-400">
          Company
        </label>

        <input
          type="text"
          name="company"
          value={invoice.company}
          onChange={handleChange}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
        />
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm text-zinc-400">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={invoice.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="mb-2 block text-sm text-zinc-400">
          Phone
        </label>

        <input
          type="text"
          name="phone"
          value={invoice.phone}
          onChange={handleChange}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
        />
      </div>

    </div>

    <div className="mt-5">
      <label className="mb-2 block text-sm text-zinc-400">
        Address
      </label>

      <textarea
        rows={4}
        name="address"
        value={invoice.address}
        onChange={handleChange}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
      />
    </div>
  </div>


  {/*Invoice Detail Card Part1 */}

  <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6 shadow-lg">
    <h2 className="mb-6 text-2xl font-bold text-yellow-400">
      Invoice Details
    </h2>

    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

      {/* Invoice Number */}
      <div>
        <label className="mb-2 block text-sm text-zinc-400">
          Invoice Number
        </label>

        <input
  type="text"
  name="invoiceNumber"
  value={invoice.invoiceNumber}
  readOnly
  placeholder="Auto Generated on Save"
  className="w-full cursor-not-allowed rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-400"
/>
      </div>

      {/* Invoice Date */}
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

      {/* Due Date */}
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

      {/* Currency */}
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

      {/* Invoice  */}

    </div>
  </div>

  {/*Invoice Detail Card Part2 END  */}

  {/*Products Card Part3 Start  */}

        {/* Products Card */}

  <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6 shadow-lg">

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

    <div className="space-y-5">

      {invoice.items.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
        >




                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">

            <input
              type="text"
              placeholder="Product Name"
              value={item.productName}
              onChange={(e) =>
                handleProductChange(index, "productName", e.target.value)
              }
              className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
            />

            <input
              type="text"
              placeholder="Size"
              value={item.size}
              onChange={(e) =>
                handleProductChange(index, "size", e.target.value)
              }
              className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
            />

            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) =>
                handleProductChange(
                  index,
                  "quantity",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
            />

            <input
              type="number"
              placeholder="Unit Price"
              value={item.unitPrice}
              onChange={(e) =>
                handleProductChange(
                  index,
                  "unitPrice",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
            />

            <div className="flex items-center justify-between rounded-xl border border-zinc-700 bg-black px-4 py-3">
              <span className="font-bold text-yellow-400">
                ${item.total.toFixed(2)}
              </span>

              {invoice.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProduct(index)}
                  className="rounded-lg bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-500"
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


  {/* Product Card end  */}



  {/* Invoice Summary Start */}

      <div className="space-y-6">


              {/*RightCode*/}
              <div className="lg:sticky lg:top-24 rounded-2xl border border-yellow-500/20 bg-zinc-900 p-4 sm:p-6 shadow-lg">

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

      <div className="border-t border-zinc-800 pt-4 space-y-3">

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

        <div className="flex justify-between border-t border-zinc-700 pt-4 text-xl font-bold text-yellow-400">
          <span>Total</span>
          <span>${invoice.total.toFixed(2)}</span>
        </div>

      </div>
  <button
    type="button"
    onClick={handleSaveInvoice}
    disabled={loading}
    className="mt-6 w-full rounded-xl bg-yellow-500 py-3 font-bold text-black transition hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
  >
   {loading
  ? isEdit
    ? "Updating..."
    : "Saving..."
  : isEdit
    ? "Update Invoice"
    : "Save Invoice"}
  </button>

    </div>

  <button
    type="button"
    onClick={handlePrint}
    className="mt-3 w-full rounded-xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-500"
  >
    Print / Save PDF
  </button>

  <button
    type="button"
    onClick={downloadJPG}
    className="mt-3 w-full rounded-xl bg-green-600 py-3 font-bold text-white transition hover:bg-green-500"
  >
    Download JPG
  </button>

  <div
    ref={invoiceRef}
    className="hidden rounded-2xl border border-yellow-500/20 bg-zinc-900 p-4 shadow-lg lg:block"
  >

    
  </div>

  </div>

      </div>

        {/* Invoice Summary End */}
  </div>

      {/* RIGHT SECTION */}
  <div className="xl:col-span-6">
  <div className="lg:sticky lg:top-6 rounded-2xl bg-zinc-900 p-2 md:p-4 shadow-2xl overflow-x-auto">
    <div
      ref={invoiceRef}
      className="flex justify-center"
    >
     <div className="flex justify-center overflow-x-auto">
  <div className="origin-top scale-[0.28] min-[380px]:scale-[0.34] sm:scale-[0.50] md:scale-[0.70] lg:scale-100">
    <InvoicePreview invoice={invoice} />
  </div>
</div>
    </div>
  </div>
</div>
      
  </div>

      </div>

      <FormStatusModal
      isOpen={modalOpen}
      title={modalTitle}
      message={modalMessage}
      onClose={() => setModalOpen(false)}
    />
    </>

      
    );
  }