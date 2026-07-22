import { supabase } from "../lib/supabase/client";


export async function getRevenueStats() {
  const usdRate = await getUsdRate();
  const { data, error } = await supabase
    .from("invoices")
    .select("*");

  if (error) throw error;

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  let totalSales = 0;
  let totalExpenses = 0;
  let totalRevenue = 0;

  let monthlyRevenue = 0;
  let todayRevenue = 0;
  let pendingRevenue = 0;

  let paidInvoices = 0;
  let pendingInvoices = 0;
  let overdueInvoices = 0;

  data.forEach((invoice: any) => {
    const sale = Number(invoice.total ?? 0);
 const expense = Number(invoice.total_cost ?? 0) / usdRate;

// Final calculated revenue (already saved in USD)
const revenue =
  invoice.revenue != null
    ? Number(invoice.revenue)
    : sale - expense;

    totalSales += sale;
    totalExpenses += expense;
    totalRevenue += revenue;

    if (!invoice.invoiceDate) return;

    const invoiceDate = new Date(invoice.invoiceDate);

    if (
      invoiceDate.getMonth() === currentMonth &&
      invoiceDate.getFullYear() === currentYear
    ) {
      monthlyRevenue += revenue;
    }

    if (invoiceDate.toDateString() === today.toDateString()) {
      todayRevenue += revenue;
    }

    switch ((invoice.status ?? "").toLowerCase()) {
      case "paid":
        paidInvoices++;
        break;

      case "pending":
        pendingInvoices++;
        pendingRevenue += revenue;
        break;

      case "overdue":
        overdueInvoices++;
        break;
    }
  });

  return {
    totalSales,
    totalExpenses,
    totalRevenue,
    monthlyRevenue,
    todayRevenue,
    pendingRevenue,
    paidInvoices,
    pendingInvoices,
    overdueInvoices,
  };
}

export async function getRevenueInvoices() {
  const { data, error } = await supabase
    .from("invoices")
    .select(`
      id,
      invoice_number,
      customer_name,
      invoice_date,
      total,
      revenue,
      status,
      fabric_cost,
      sublimation_cost,
      shipping_cost,
      total_cost
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getUsdRate() {
  const { data, error } = await supabase
    .from("settings")
    .select("usd_rate")
    .single();

  if (error) {
    throw error;
  }

  return Number(data.usd_rate);
}

export async function saveRevenue(
  invoiceId: string,
  data: {
    fabric_cost: number;
    sublimation_cost: number;
    shipping_cost: number;
    total_cost: number;
    revenue: number;
  }
) {
  const { error } = await supabase
    .from("invoices")
    .update({
      fabric_cost: data.fabric_cost,
      sublimation_cost: data.sublimation_cost,
      shipping_cost: data.shipping_cost,
      total_cost: data.total_cost,
      revenue: data.revenue,
    })
    .eq("id", invoiceId);

  if (error) throw error;
}