"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { getProducts } from "../../../services/admin/product.service";

interface Product {
  id: number;
  name: string;
  sport: string;
  category: string;
  price: number | string;
  status: string;
  image: string | null;
}

export default function ProductsTable(): React.JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        setProducts((data as Product[]) ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-yellow-500/20 bg-[#1A1A1A] p-10 text-center text-gray-400">
        Loading products...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-yellow-500/20 bg-[#1A1A1A]">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-yellow-500/20 bg-[#111111]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-500">
                Image
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-500">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-500">
                Sport
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-500">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-500">
                Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-500">
                Status
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-yellow-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-20 text-center"
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-4 text-6xl">📦</div>

                    <h3 className="text-xl font-semibold text-white">
                      No Products Found
                    </h3>

                    <p className="mt-2 text-gray-400">
                      Start by adding your first product.
                    </p>

                    <Link
                      href="/admin/products/add"
                      className="mt-6 inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
                    >
                      <Plus size={18} />
                      Add First Product
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-yellow-500/10"
                >
                  <td className="px-6 py-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#111111]">
                      📷
                    </div>
                  </td>

                  <td className="px-6 py-4 text-white">
                    {product.name}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {product.sport}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    ${product.price}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
                      {product.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button className="text-yellow-500 hover:text-yellow-400">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}