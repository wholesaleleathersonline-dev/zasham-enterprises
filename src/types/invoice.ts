export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Unpaid";

export interface InvoiceListItem {
  id: string;

  customer_id: string | null;

  invoice_number: string;
  customer_name: string;
  company: string;

  invoice_date: string;
  due_date: string;

  total: number;

  status: InvoiceStatus;

  created_at: string;
}

export interface InvoiceItem {
  id?: string;

  productName: string;

  description?: string;

  size: string;

  quantity: number;

  unitPrice: number;

  total: number;
}


export interface Invoice {
  id?: string;

  invoiceNumber: string;
  customerId?: string;

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

export interface InvoiceListItem {
  id: string;
  invoice_number: string;
  customer_name: string;
  company: string;
  invoice_date: string;
  due_date: string;
  total: number;
  status: InvoiceStatus;
  created_at: string;
}