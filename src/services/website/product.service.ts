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
export async function getProductBySlug(
  sport: string,
  slug: string
) {
  console.log("SPORT:", sport);
  console.log("SLUG:", slug);

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_images (
        image_url,
        sort_order
      )
    `)
    .eq("slug", slug)
    .eq("sport", sport)
    .eq("status", "active")
    .single();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    return null;
  }

  return mapProduct(data);
}

export async function getRelatedProducts(
  sport: string,
  currentProductId: number
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
    .neq("id", currentProductId)
    .limit(8);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapProduct);
}