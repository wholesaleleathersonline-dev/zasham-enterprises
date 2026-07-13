import type { Product } from "../../types/product";

export function mapProduct(product: any): Product {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sport: product.sport,
    category: product.category,

    image: product.image ?? "",

    gallery:
      product.product_images
        ?.sort(
          (a: any, b: any) =>
            a.sort_order - b.sort_order
        )
        .map((img: any) => img.image_url) ?? [],

    price: `$${product.price}`,

    moq: product.moq,

    description: product.description ?? "",

    shortDescription:
      product.short_description ?? "",

    features: product.features ?? [],

    colors: product.colors ?? [],

    sizes: product.sizes ?? [],

    fabric: product.fabric ?? [],

    tags: product.tags ?? [],

    isFeatured: product.is_featured,

    seoTitle: product.seo_title ?? "",

    seoDescription:
      product.seo_description ?? "",

    sportRoute: product.sport
      .toLowerCase()
      .replace(/\s+/g, "-"),

    ageGroup: product.age_group,

    uniformType: product.uniform_type,
  };
}