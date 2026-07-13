import { z } from "zod";



export const productSchema = z.object({

  sport: z.string().min(1, "Sport is required."),

ageGroup: z.string().optional(),

uniformType: z.string().optional(),

isFeatured: z.boolean(),



  name: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters."),

  slug: z
    .string()
    .trim()
    .min(3, "Slug is required."),

  category: z
    .string()
    .min(1, "Category is required."),

  price: z
    .number({
      error: "Price is required.",
    })
    .min(0, "Price cannot be negative."),

  moq: z
    .number({
      error: "MOQ is required.",
    })
    .min(1, "MOQ must be at least 1."),

  status: z.enum(["active", "draft"]),

  shortDescription: z
    .string()
    .trim()
    .optional(),

  description: z
    .string()
    .trim()
    .optional(),

  seoTitle: z
    .string()
    .trim()
    .optional(),

  seoDescription: z
    .string()
    .trim()
    .optional(),

    image: z
  .string()
  .trim()
  .optional(),
 features: z.array(z.string()),

colors: z.array(z.string()),

sizes: z.array(z.string()),

fabric: z.array(z.string()),

tags: z.array(z.string()),
galleryImages: z.array(z.string()),



    
});

export type ProductFormData = z.infer<typeof productSchema>;