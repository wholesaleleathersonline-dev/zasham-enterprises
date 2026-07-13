import { supabase } from "../../lib/supabase/client";
import { mapProduct } from "../../lib/mappers/product.mapper";

export async function getProductsBySport(
  sport: string
) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_images (
        image_url,
        sort_order
      )
    `)
    .eq("sport", sport)
    .eq("status", "active")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapProduct);

}

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_images (
        image_url,
        sort_order
      )
    `)
    .eq("is_featured", true)
    .eq("status", "active")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapProduct);
}