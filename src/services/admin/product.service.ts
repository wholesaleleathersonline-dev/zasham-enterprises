import { supabase } from "../../lib/supabase/client";
import type { ProductFormData } from "../../lib/validations/product.schema";

export async function createProduct(
  data: ProductFormData
): Promise<void> {
  const { error } = await supabase
    .from("products")
    .insert({
      name: data.name,
      slug: data.slug,
      sport: data.sport,
      category: data.category,
      age_group: data.ageGroup,
      uniform_type: data.uniformType,
      price: data.price,
      moq: data.moq,
      description: data.description,
      short_description: data.shortDescription,
      seo_title: data.seoTitle,
      seo_description: data.seoDescription,
      is_featured: data.isFeatured,
      status: data.status,
    });

  if (error) {
    throw new Error(error.message);
  }
}

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateProduct(
  id: string,
  data: ProductFormData
): Promise<void> {
  console.log("Update Product:", id, data);
}

export async function deleteProduct(
  id: string
): Promise<void> {
  console.log("Delete Product:", id);
}