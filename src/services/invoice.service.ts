import { supabase } from "../lib/supabase/client";
import { Invoice } from "../types/invoice";


export async function createInvoice(invoice: Invoice) {
  try {
    // Save invoice
    const { data, error } = await supabase
      .from("invoices")
      .insert({
        invoice_number: invoice.invoiceNumber,
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

    return data;
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

  return data;
}

export async function getInvoice(id: string) {
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