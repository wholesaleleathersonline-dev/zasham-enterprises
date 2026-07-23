  import { supabase } from "../lib/supabase/client";
  import { generateOrderCode } from "../lib/order-code";
  import { CreateOrderSheetData } from "../types/order-sheet";
  import { generateManageToken } from "../lib/manage-token";

  export async function createOrderSheet(
    data: CreateOrderSheetData
  ) {
    console.log("createOrderSheet called");
    const order_code = generateOrderCode();
  const manage_token = generateManageToken();

    const { data: orderSheet, error } = await supabase
      .from("order_sheets")
      .insert({
    team_name: data.team_name,
    captain_name: data.captain_name,
    captain_email: data.captain_email,
    category: data.category,
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

  export async function recoverCaptainDashboard(
    orderCode: string,
    captainEmail: string
  ) {
    const { data, error } = await supabase
      .from("order_sheets")
      .select("order_code, manage_token")
      .eq("order_code", orderCode)
      .eq("captain_email", captainEmail)
      .single();

    if (error) throw error;

    return data;
  }

export async function getCaptainTeams(
  captainEmail: string
) {
  const { data, error } = await supabase
    .from("order_sheets")
    .select(`
      id,
      team_name,
      category,
      order_code,
      manage_token,
      is_locked,
      created_at
    `)
    .eq("captain_email", captainEmail)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

export async function deleteOrderSheet(id: string) {
  // Delete all players first
  const { error: playerError } = await supabase
    .from("order_sheet_players")
    .delete()
    .eq("order_sheet_id", id);

  if (playerError) throw playerError;

  // Delete order sheet
  const { error } = await supabase
    .from("order_sheets")
    .delete()
    .eq("id", id);

  if (error) throw error;
}