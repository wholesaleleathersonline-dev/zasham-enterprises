import { supabase } from "../lib/supabase/client";
import { Customer } from "../types/customer";

function mapCustomer(customer: Customer) {
  return {
    customer_name: customer.customerName,
    company: customer.company,

    email: customer.email,
    phone: customer.phone,

    address: customer.address,
    city: customer.city,
    state: customer.state,
    zip: customer.zip,
    country: customer.country,

    tax_id: customer.taxId,

    currency: customer.currency,

    notes: customer.notes,

    status: customer.status,

    total_invoices: customer.totalInvoices ?? 0,
  };
}

export interface CustomerRow {
  id: string;

  customer_name: string;
  company: string;

  email: string;
  phone: string;

  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;

  tax_id: string | null;

  currency: "USD" | "EUR" | "GBP" | "PKR";

  notes: string | null;

  status: "Active" | "Inactive";

  total_invoices: number;

  created_at: string;
  updated_at: string;
}




function mapCustomerFromDb(customer: CustomerRow): Customer {
  return {
    id: customer.id,

    customerName: customer.customer_name,
    company: customer.company,

    email: customer.email,
    phone: customer.phone,

    address: customer.address,
    city: customer.city,
    state: customer.state,
    zip: customer.zip,
    country: customer.country,

    taxId: customer.tax_id ?? undefined,

    currency: customer.currency,

    notes: customer.notes ?? undefined,

    status: customer.status,

    totalInvoices: customer.total_invoices,

    createdAt: customer.created_at,
    updatedAt: customer.updated_at,
  };
}
export async function getCustomers() {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("customer_name", { ascending: true });

  if (error) throw error;

  return (data ?? []).map(mapCustomerFromDb);
}

export async function getCustomerById(id: string) {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return mapCustomerFromDb(data);
}

export async function createCustomer(customer: Customer) {
  const { data, error } = await supabase
    .from("customers")
    .insert(mapCustomer(customer))
    .select()
    .single();

  if (error) throw error;

 return mapCustomerFromDb(data);
}

export async function updateCustomer(
  id: string,
  customer: Customer
) {
  const { data, error } = await supabase
    .from("customers")
    .update(mapCustomer(customer))
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

 return mapCustomerFromDb(data);
}

export async function deleteCustomer(id: string) {
  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", id);

  if (error) throw error;
}