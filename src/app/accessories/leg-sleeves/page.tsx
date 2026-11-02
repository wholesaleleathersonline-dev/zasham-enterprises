import CategoryProductsPage from "../../../components/products/CategoryProductsPage";

export default function LegSleevesPage() {
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
      description="Premium custom leg sleeves manufactured by Zasham Enterprises using breathable compression fabrics, professional stitching and unlimited customization for schools, clubs, academies and professional teams."
    />
  );
}