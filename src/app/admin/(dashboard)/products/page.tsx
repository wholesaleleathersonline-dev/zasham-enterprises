import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";
import ProductsTable from "../../../../components/admin/products/ProductsTable";

export default function ProductsPage(): React.JSX.Element {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

  {/* Left */}
  <div>
    <Link
      href="/admin/dashboard"
      className="group mb-6 inline-flex items-center gap-2 rounded-xl border-2 border-yellow-500/40 bg-white/5 px-5 py-2.5 text-sm font-semibold text-yellow-400 backdrop-blur-md transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-500 hover:text-black hover:shadow-[0_0_30px_rgba(234,179,8,0.45)] active:scale-95"
    >
      <FaArrowLeft
        size={13}
        className="transition-transform duration-300 group-hover:-translate-x-1"
      />

      <span>Back to Dashboard</span>
    </Link>

    <h1 className="text-3xl font-bold text-white">
      Products
    </h1>

    <p className="mt-2 text-gray-400">
      Manage all sportswear products.
    </p>
  </div>

  {/* Right */}
  <Link
    href="/admin/products/add"
    className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-yellow-400 hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]"
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