export interface Product {
  id: number;
  name: string;
  slug: string;
  sport: string;
  category: string;
  image: string;
  gallery: string[];
  price: string;
  moq: number;
  description: string;
  shortDescription: string;
  features: string[];
  colors: string[];
  sizes: string[];
  fabric: string[];
  tags: string[];
  isFeatured: boolean;
  seoTitle: string;
  seoDescription: string;

  ageGroup: "Youth" | "Adult";
 uniformType: "Standard" | "Reversible";
}