import { getPriceList } from "../../services/admin/price-list.service";
import PricingClient from "../../components/pricing/PricingClient";

export default async function PricingPage() {
  const items = await getPriceList();

  const teamUniforms = items.filter(
    (item) => item.section === "Team Uniforms"
  );

  const teamApparel = items.filter(
    (item) => item.section === "Team Apparel"
  );

  const teamAccessories = items.filter(
    (item) => item.section === "Team Accessories"
  );

return (
  <PricingClient items={items}>
    <main className="pt-5">
      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-white">
            Factory Direct Pricing
          </h1>

          <p className="mt-5 text-gray-400">
            Browse our latest prices for uniforms,
            team apparel and accessories.
          </p>
        </div>

        <Section
          title="Team Uniforms"
          products={teamUniforms}
        />

        <Section
          title="Team Apparel"
          products={teamApparel}
        />

        <Section
          title="Team Accessories"
          products={teamAccessories}
        />

      </section>
    </main>
  </PricingClient>
);
}
function Section({
  title,
  products,
}: {
  title: string;
  products: any[];
}) {
  return (
    <section className="mb-16">

      <h2 className="mb-8 text-3xl font-bold text-[#C8A44D]">
        {title}
      </h2>

      <div className="overflow-hidden rounded-3xl border border-[#C8A44D]/20">

        <table className="w-full">

          <thead className="bg-[#C8A44D] text-black">

            <tr>

              <th className="px-6 py-4 text-left">
                Product
              </th>

              <th className="px-6 py-4 text-center">
                MOQ
              </th>

              <th className="px-6 py-4 text-right">
                Price
              </th>

            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>

                <td
                  colSpan={3}
                  className="px-6 py-8 text-center text-gray-400"
                >
                  No products available.
                </td>

              </tr>

            ) : (

              products.map((product: any) => (

                <tr
                  key={product.id}
                  className="border-t border-[#C8A44D]/10 text-white transition hover:bg-white/5"
                >

                  <td className="px-6 py-5">
                    {product.item_name}
                  </td>

                  <td className="px-6 py-5 text-center">
                    {product.moq}
                  </td>

                  <td className="px-6 py-5 text-right font-semibold text-[#C8A44D]">
                    {product.price}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </section>
  );
}