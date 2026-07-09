import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import InquiryForm from "../../../../components/products/InquiryForm";
import Breadcrumb from "../../../../components/common/Breadcrumb";
import { americanFootballProducts } from "../../../../data/americanfootball";
import ProductImageZoom from "../../../../components/products/ProductImageZoom";
import RelatedProducts from "../../../../components/products/RelatedProducts";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

const product = americanFootballProducts.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white pt-55">

    

      {/* Breadcrumb */}


    <Breadcrumb
  items={[
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Team Uniforms",
      href: "/team-uniforms",
    },
    {
  label: "American Football",
  href: "/team-uniforms/american-football",
},
    {
      label: product.name,
    },
  ]}
/>


      

      {/* Product */}

      <section className="py-16">

        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2">

          {/* Image */}

         <div className="space-y-8">

  <ProductImageZoom
    src={product.image}
    alt={product.name}
  />

  {/* Company Card */}

  <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_15px_50px_rgba(212,175,55,0.12)]">

    <span className="inline-flex rounded-full bg-[#D4AF37]/10 px-4 py-2 text-sm font-semibold text-[#D4AF37]">
      WHY CHOOSE US
    </span>

    <h3 className="mt-5 text-3xl font-black">
      Zasham Enterprises
    </h3>

    <p className="mt-5 leading-8 text-gray-300">
      Zasham Enterprises is a trusted custom sportswear manufacturer
      delivering premium-quality uniforms for basketball, baseball,
      soccer, football, volleyball, rugby and more. We provide
      factory-direct pricing, premium sublimation printing, precision
      stitching and worldwide shipping for teams, schools, clubs and
      organizations.
    </p>

    <div className="mt-8 grid grid-cols-2 gap-4">

      <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5">
        <h4 className="text-xl font-bold text-[#D4AF37]">
          10 Sets
        </h4>

        <p className="mt-2 text-sm text-gray-300">
          Minimum Order
        </p>
      </div>

      <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5">
        <h4 className="text-xl font-bold text-[#D4AF37]">
          10 Days
        </h4>

        <p className="mt-2 text-sm text-gray-300">
          Fast Production
        </p>
      </div>

      <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5">
        <h4 className="text-xl font-bold text-[#D4AF37]">
          OEM / ODM
        </h4>

        <p className="mt-2 text-sm text-gray-300">
          Private Label
        </p>
      </div>

      <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5">
        <h4 className="text-xl font-bold text-[#D4AF37]">
          Worldwide
        </h4>

        <p className="mt-2 text-sm text-gray-300">
          Shipping
        </p>
      </div>

    </div>

  </div>

</div>

          {/* Right Side */}

          <div>

            <span className="rounded-full bg-[#D4AF37]/10 px-5 py-2 text-sm font-semibold text-[#D4AF37]">
              {product.category}
            </span>

            <h2 className="mt-6 text-4xl font-black">
              {product.name}
            </h2>

            <p className="mt-8 text-3xl font-bold text-[#D4AF37]">
              {product.price}
            </p>

            <div className="mt-4 text-gray-400">
              Minimum Order Quantity :
              <span className="ml-2 font-semibold text-white">
                {product.moq} Sets
              </span>
            </div>

            <p className="mt-8 leading-8 text-gray-400">
              {product.description}
            </p>

            <InquiryForm productName={product.name} />

          </div>









        </div>

      </section>

    <RelatedProducts
  currentProductId={product.id}
  products={americanFootballProducts}
/>


    </main>
  );
}