import CategoryProductsPage from "../../../components/products/CategoryProductsPage";

export default function SportsTowelsPage() {
  return (
    <CategoryProductsPage
      sport="Team Accessories"
      title="Accessories"
      breadcrumbHref="/accessories"
      categoryTitles={{
        "backpacks": "Backpacks",
        "duffle-bags": "Duffle Bags",
        "caps": "Caps",
        "socks": "Socks",
        "arm-sleeves": "Arm Sleeves",
        "leg-sleeves": "Leg Sleeves",
        "headbands": "Headbands",
        "gloves": "Gloves",
        "sports-towels": "Sports Towels",
      }}
      description="Premium custom sports towels manufactured by Zasham Enterprises using high-quality, absorbent fabrics, durable stitching and unlimited customization for schools, clubs, academies and professional teams."
    />
  );
}