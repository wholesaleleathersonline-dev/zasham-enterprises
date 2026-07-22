import { supabase } from "../lib/supabase/client";
import { generateOrderCode } from "../lib/order-code";
import { CreateOrderSheetData } from "../types/order-sheet";
import { generateManageToken } from "../lib/manage-token";

export async function createOrderSheet(
  data: CreateOrderSheetData
) {
  const order_code = generateOrderCode();
const manage_token = generateManageToken();

  const { data: orderSheet, error } = await supabase
    .from("order_sheets")
    .insert({
  team_name: data.team_name,
  order_code,
  manage_token,
})
    .select()
    .single();

  if (error) throw error;

  return orderSheet;
}

export async function getOrderSheet(
  orderCode: string
) {
  const { data, error } = await supabase
    .from("order_sheets")
    .select("*")
    .eq("order_code", orderCode)
    .single();

  if (error) throw error;

  return data;
}

export async function getManageOrderSheet(
  orderCode: string,
  token: string
) {
  const { data, error } = await supabase
    .from("order_sheets")
    .select("*")
    .eq("order_code", orderCode)
    .eq("manage_token", token)
    .single();

  if (error) throw error;

  return data;
}

export async function lockOrderSheet(id: string) {
  const { data, error } = await supabase
    .from("order_sheets")
    .update({
      is_locked: true,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function unlockOrderSheet(id: string) {
  const { data, error } = await supabase
    .from("order_sheets")
    .update({
      is_locked: false,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}