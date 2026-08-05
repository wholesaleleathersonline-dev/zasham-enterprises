import { supabase } from "../../lib/supabase/client";

export interface HeroBanner {
  id: string;
  image: string;
}

export async function getHeroBanner(): Promise<HeroBanner | null> {
  const { data, error } = await supabase
    .from("hero_banner")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateHeroBanner(
  id: string,
  image: string
): Promise<void> {
  const { error } = await supabase
    .from("hero_banner")
    .update({
      image,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}