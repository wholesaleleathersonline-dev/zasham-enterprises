export type CustomerStatus = "Active" | "Inactive";

export interface Customer {
  id?: string;

  customerName: string;
  company: string;

  email: string;
  phone: string;

  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;

  taxId?: string;

  currency: "USD" | "EUR" | "GBP" | "PKR";

  notes?: string;

  status: CustomerStatus;

  totalInvoices?: number;

  createdAt?: string;
  updatedAt?: string;
}