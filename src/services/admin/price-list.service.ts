import { supabase } from "../../lib/supabase/client";

export interface PriceListItem {
  id: number;
  section: string;
  item_name: string;
  price: string;
  moq: number;
  display_order: number;
  status: boolean;
}

export async function getPriceList() {

  
  const { data, error } = await supabase
    .from("price_list")
    .select("*")
    .eq("status", true)
    .order("section", { ascending: true })
    .order("display_order", { ascending: true });

  if (error) throw new Error(error.message);

  return data as PriceListItem[];
}

export async function createPriceItem(
  item: Omit<PriceListItem, "id">
) {
  const { error } = await supabase
    .from("price_list")
    .insert(item);

  if (error) throw new Error(error.message);
}

export async function updatePriceItem(
  id: number,
  item: Omit<PriceListItem, "id">
) {
  const { error } = await supabase
    .from("price_list")
    .update(item)
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deletePriceItem(id: number) {
  const { error } = await supabase
    .from("price_list")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}