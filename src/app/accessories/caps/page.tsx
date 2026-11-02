
import CategoryProductsPage from "../../../components/products/CategoryProductsPage";

export default function CapsPage() {
  return (
    <CategoryProductsPage
      sport="Team Accessories"
      title="Accessories"
      breadcrumbHref="/accessories"
      categoryTitles={{
        "backpacks": "Backpacks",
        "duffle-bags": "Duffle Bags",
        "caps": "Custom Sports Caps",
        "socks": "Socks",
        "arm-sleeves": "Arm Sleeves",
        "leg-sleeves": "Leg Sleeves",
        "headbands": "Headbands",
        "gloves": "Gloves",
        "sports-towels": "Sports Towels",
      }}
      description="Premium custom sports caps manufactured by Zasham Enterprises using high-quality materials, precision embroidery, professional stitching and unlimited customization for schools, clubs, academies and professional teams."
    />
  );
}
