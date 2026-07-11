import Link from "next/link";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/team-uniforms/${product.sportRoute}/${product.slug}`}
      className="group block overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-[#111111] transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]"
    >
      {/* Image */}
      <div className="p-5">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="line-clamp-2 text-lg font-bold text-white">
          {product.name}
        </h3>

        <p className="mt-3 text-[#D4AF37]">
          {product.price}
        </p>

        <p className="mt-1 text-sm text-gray-400">
          MOQ {product.moq} Sets
        </p>

        <button
          className="mt-4 w-full rounded-xl bg-[#D4AF37] py-3 text-sm font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:bg-[#e5c158] hover:shadow-lg"
        >
          View Details
        </button>
      </div>
    </Link>
  );
}