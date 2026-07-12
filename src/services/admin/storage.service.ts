import { supabase } from "../../lib/supabase/client";

const BUCKET_NAME = "product-images";

export async function uploadImage(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName);

  return publicUrl;
}

export async function deleteImage(imageUrl: string): Promise<void> {
  const fileName = imageUrl.split("/").pop();

  if (!fileName) {
    return;
  }

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([fileName]);

  if (error) {
    throw new Error(error.message);
  }
}