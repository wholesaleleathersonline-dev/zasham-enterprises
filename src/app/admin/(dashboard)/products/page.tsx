import Link from "next/link";
import { Plus, Search } from "lucide-react";
import ProductsTable from "../../../../components/admin/products/ProductsTable";

export default function ProductsPage(): React.JSX.Element {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Products
          </h1>

          <p className="mt-2 text-gray-400">
            Manage all sportswear products.
          </p>
        </div>

        <Link
          href="/admin/products/add"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Search */}

      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search products..."
          className="w-full rounded-xl border border-yellow-500/20 bg-[#1A1A1A] py-3 pl-12 pr-4 text-white outline-none transition focus:border-yellow-500"
        />
      </div>

      {/* Products Table */}

      {/* Products Table */}

<div className="overflow-hidden rounded-xl border border-yellow-500/20 bg-[#1A1A1A]">
 <ProductsTable />
</div>

    </div>
  );
}