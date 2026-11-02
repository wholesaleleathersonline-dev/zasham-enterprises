
import CategoryProductsPage from "../../../components/products/CategoryProductsPage";

export default function SocksPage() {
  return (
    <CategoryProductsPage
      sport="Team Accessories"
      title="Accessories"
      breadcrumbHref="/accessories"
      categoryTitles={{
        "backpacks": "Backpacks",
        "duffle-bags": "Duffle Bags",
        "caps": "Caps",
        "socks": "Custom Sports Socks",
        "arm-sleeves": "Arm Sleeves",
        "leg-sleeves": "Leg Sleeves",
        "headbands": "Headbands",
        "gloves": "Gloves",
        "sports-towels": "Sports Towels",
      }}
      description="Premium custom sports socks manufactured by Zasham Enterprises using breathable, moisture-wicking fabrics with reinforced stitching and unlimited customization for schools, clubs, academies and professional teams."
    />
  );
}
