
import CategoryProductsPage from "../../../components/products/CategoryProductsPage";

export default function DuffleBagsPage() {
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
      description="Premium custom duffle bags manufactured by Zasham Enterprises using durable fabrics, reinforced stitching and premium-quality materials with unlimited customization for schools, clubs, academies and professional teams."
    />
  );
}
