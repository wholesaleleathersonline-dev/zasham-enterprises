import { supabase } from "../lib/supabase/client";
import { getCustomerById, updateCustomer } from "./customer.service";
import { Invoice, InvoiceListItem } from "../types/invoice";


export async function createInvoice(invoice: Invoice) {
  try {
    const invoiceNumber = await generateInvoiceNumber();
    // Save invoice
    const { data, error } = await supabase
      .from("invoices")
      .insert({
        invoice_number: invoiceNumber,
        customer_id: invoice.customerId,
        customer_name: invoice.customerName,
        company: invoice.company,
        email: invoice.email,
        phone: invoice.phone,
        
        address: invoice.address,
        currency: invoice.currency,
        invoice_date: invoice.invoiceDate,
        due_date: invoice.dueDate,
        subtotal: invoice.subtotal,
        shipping: invoice.shipping,
        discount: invoice.discount,
        total: invoice.total,
        payment_terms: invoice.paymentTerms,
        notes: invoice.notes,
        status: invoice.status,
      })
      .select()
      .single();

    if (error) throw error;

    // Save items
    if (invoice.items.length > 0) {
      const items = invoice.items.map((item) => ({
        invoice_id: data.id,
        product_name: item.productName,
        size: item.size,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        total: item.total,
      }));

      const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(items);

      if (itemsError) throw itemsError;
    }
console.log("Invoice customerId:", invoice.customerId);
    if (invoice.customerId) {
  const customer = await getCustomerById(invoice.customerId);
  console.log("Customer:", customer);

  await updateCustomer(invoice.customerId, {
    ...customer,
    totalInvoices: (customer.totalInvoices ?? 0) + 1,
  });
  console.log("Customer invoice count updated");
}

   return {
  ...data,
  invoice_number: invoiceNumber,
};
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function getInvoices() {
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []) as InvoiceListItem[];
}

export async function getInvoiceById(id: string) {
  const { data, error } = await supabase
    .from("invoices")
    .select(`
      *,
      invoice_items(*)
    `)
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}



export async function deleteInvoice(id: string) {
  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", id);

  if (error) throw error;
}



export async function updateInvoice(id: string, invoice: Invoice) {
  try {
    // Update invoice
    const { error } = await supabase
      .from("invoices")
      .update({
        customer_id: invoice.customerId,
        customer_name: invoice.customerName,
        company: invoice.company,
        email: invoice.email,
        phone: invoice.phone,
        address: invoice.address,
        currency: invoice.currency,
        invoice_date: invoice.invoiceDate,
        due_date: invoice.dueDate,
        subtotal: invoice.subtotal,
        shipping: invoice.shipping,
        discount: invoice.discount,
        total: invoice.total,
        payment_terms: invoice.paymentTerms,
        notes: invoice.notes,
        status: invoice.status,
      })
      .eq("id", id);

    if (error) throw error;

    // Remove old items
    const { error: deleteItemsError } = await supabase
      .from("invoice_items")
      .delete()
      .eq("invoice_id", id);

    if (deleteItemsError) throw deleteItemsError;

    // Insert updated items
    if (invoice.items.length > 0) {
      const items = invoice.items.map((item) => ({
        invoice_id: id,
        product_name: item.productName,
        size: item.size,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        total: item.total,
      }));

      const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(items);

      if (itemsError) throw itemsError;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function generateInvoiceNumber() {
  const { data, error } = await supabase.rpc("generate_invoice_number");

  if (error) {
    console.error("Error generating invoice number:", error);
    throw error;
  }

  return data as string;
}

export async function searchInvoices(search: string) {
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .or(
      `invoice_number.ilike.%${search}%,customer_name.ilike.%${search}%,company.ilike.%${search}%`
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

   return (data ?? []) as InvoiceListItem[];
}

export async function updateInvoiceStatus(
  id: string,
  status: "Draft" | "Sent" | "Paid" | "Unpaid"
) {
  const { error } = await supabase
    .from("invoices")
    .update({
      status,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function getInvoicesByCustomer(customerId: string) {
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []) as InvoiceListItem[];
}