"use client";

interface CategoryProductsPageProps {
  sport: string;
  title: string;
  breadcrumbHref: string;
  categoryTitles: Record<string, string>;
}

export default function CategoryProductsPage({
  sport,
  title,
  breadcrumbHref,
  categoryTitles,
}: CategoryProductsPageProps) {
  return (
    <div>
      CategoryProductsPage
    </div>
  );
}