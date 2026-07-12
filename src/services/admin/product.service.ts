import { supabase } from "../../lib/supabase/client";
import type { ProductFormData } from "../../lib/validations/product.schema";

export async function createProduct(
  data: ProductFormData
): Promise<void> {
  const {
    data: product,
    error: productError,
  } = await supabase
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
      image: data.image,
      is_featured: data.isFeatured,
      status: data.status,
    })
    .select("id")
    .single();

  if (productError) {
    console.error(productError);

    throw new Error(productError.message);
  }

  if (!product) {
    throw new Error("Product could not be created.");
  }

  const galleryRows = data.galleryImages.map(
    (imageUrl, index) => ({
      product_id: product.id,
      image_url: imageUrl,
      sort_order: index + 1,
    })
  );
    if (galleryRows.length > 0) {
    const { error: galleryError } = await supabase
      .from("product_images")
      .insert(galleryRows);

    if (galleryError) {
      console.error(galleryError);

      throw new Error(galleryError.message);
    }
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
  id: number,
  data: ProductFormData
): Promise<void> {
  const { error: productError } = await supabase
    .from("products")
    .update({
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
      image: data.image,
      is_featured: data.isFeatured,
      status: data.status,
    })
    .eq("id", id);

  if (productError) {
    throw new Error(productError.message);
  }

  const { error: deleteGalleryError } = await supabase
    .from("product_images")
    .delete()
    .eq("product_id", id);

  if (deleteGalleryError) {
    throw new Error(deleteGalleryError.message);
  }

  const galleryRows = data.galleryImages.map(
    (imageUrl, index) => ({
      product_id: id,
      image_url: imageUrl,
      sort_order: index + 1,
    })
  );

    if (galleryRows.length > 0) {
    const { error: galleryError } = await supabase
      .from("product_images")
      .insert(galleryRows);

    if (galleryError) {
      throw new Error(galleryError.message);
    }
  }
}






export async function deleteProduct(
  id: number
): Promise<void> {
  const { error: galleryError } = await supabase
    .from("product_images")
    .delete()
    .eq("product_id", id);

  if (galleryError) {
    throw new Error(galleryError.message);
  }

  const { error: productError } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (productError) {
    throw new Error(productError.message);
  }
}

export async function getProductById(
  id: number
) {
  const { data: product, error: productError } =
    await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

  if (productError) {
    throw new Error(productError.message);
  }

  const {
    data: gallery,
    error: galleryError,
  } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", id)
    .order("sort_order", {
      ascending: true,
    });

  if (galleryError) {
    throw new Error(galleryError.message);
  }

  return {
    product,
    gallery,
  };
}