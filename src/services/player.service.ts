import { supabase } from "../lib/supabase/client";
import { CreatePlayerData } from "../types/player";

export async function createPlayer(data: CreatePlayerData) {
  // Check duplicate player number in same order sheet
  const { data: existingPlayer, error: checkError } = await supabase
    .from("order_sheet_players")
    .select("id")
    .eq("order_sheet_id", data.order_sheet_id)
    .eq("player_number", data.player_number)
    .maybeSingle();

  if (checkError) throw checkError;

  if (existingPlayer) {
    throw new Error("PLAYER_NUMBER_EXISTS");
  }

  // Insert player
  const { data: player, error } = await supabase
    .from("order_sheet_players")
    .insert(data)
    .select()
    .single();

  if (error) throw error;

  return player;
}

export async function getPlayers(orderSheetId: string) {
  const { data, error } = await supabase
    .from("order_sheet_players")
    .select("*")
    .eq("order_sheet_id", orderSheetId)
    .order("created_at", {
      ascending: true,
    });

  if (error) throw error;

  return data;
}

export async function updatePlayer(
  id: string,
 data: {
  player_name: string;
  player_number: string;
  top_size: string;
  bottom_size: string;
  shorts_style: string;
  hood: string;
  special_request: string;

  material?: string;
  top_style?: string;
  jogger_size?: string;
}
) {
  const { data: updatedPlayer, error } = await supabase
    .from("order_sheet_players")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return updatedPlayer;
}

export async function deletePlayer(id: string) {
  const { error } = await supabase
    .from("order_sheet_players")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}