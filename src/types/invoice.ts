export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Unpaid";

export interface InvoiceItem {
  id?: string;
  productName: string;
  size: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id?: string;

  invoiceNumber: string;

  customerName: string;
  company: string;
  email: string;
  phone: string;
  address: string;

  currency: "USD";

  invoiceDate: string;
  dueDate: string;

  items: InvoiceItem[];

  subtotal: number;
  shipping: number;
  discount: number;
  total: number;

  paymentTerms: string;
  notes: string;

  status: InvoiceStatus;

  createdAt?: string;
  updatedAt?: string;
}