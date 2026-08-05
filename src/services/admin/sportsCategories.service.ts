import { supabase } from "../../lib/supabase/client";
import { uploadSportsCategoryImage } from "./storage.service";

const TABLE_NAME = "sports_categories";

export interface SportCategory {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  sort_order: number;
  is_active: boolean;
}

export async function getSportsCategories(): Promise<SportCategory[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function updateSportCategory(
  id: string,
  image: string
) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .update({
      image,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function uploadSportImage(
  id: string,
  file: File
): Promise<void> {
  const imageUrl = await uploadSportsCategoryImage(file);

  const { error } = await supabase
    .from("sports_categories")
    .update({
      image: imageUrl,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}