"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  productSchema,
  type ProductFormData,
} from "../../lib/validations/product.schema";

export function useProductForm() {
  return useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      category: "",
      price: 0,
      moq: 1,
      status: "draft",
      shortDescription: "",
      description: "",
      seoTitle: "",
      seoDescription: "",
      sport: "",
      ageGroup: "",
      uniformType: "",
      isFeatured: false,
      image: "",
      galleryImages: [],
    },
    mode: "onChange",
  });
}