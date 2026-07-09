"use client";

import Image from "next/image";
import Link from "next/link";

interface RelatedProductCardProps {
  slug: string;
  name: string;
  category: string;
  image: string;
  price: string;
  sportRoute: string;
}

export default function RelatedProductCard({
  slug,
  name,
  category,
  image,
  price,
  sportRoute,
  
}: RelatedProductCardProps) {
  return (
    <Link
     href={`/team-uniforms/${sportRoute}/${slug}`}
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-yellow-500/10
        bg-white/5
        backdrop-blur-xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-yellow-500/60
        hover:shadow-[0_0_40px_rgba(234,179,8,0.18)]
      "
    >
      {/* Category Badge */}
      <div className="absolute left-4 top-4 z-20">
        <span
          className="
            rounded-full
            border
            border-yellow-500/30
            bg-black/70
            px-3
            py-1
            text-xs
            font-semibold
            uppercase
            tracking-widest
            text-yellow-400
            backdrop-blur-md
          "
        >
          {category}
        </span>
      </div>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        <div
          className="
            absolute
            inset-0
            pointer-events-none
            bg-gradient-to-t
            from-black/80
            via-black/10
            to-transparent
          "
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3
          className="
            line-clamp-2
            text-lg
            font-bold
            text-white
            transition-colors
            duration-300
            group-hover:text-yellow-400
          "
        >
          {name}
        </h3>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">
            Price
          </p>

          <p className="text-xl font-bold text-yellow-400">
            {price}
          </p>
        </div>

        <div className="mt-auto pt-6">
          <div
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              rounded-xl
              border
              border-yellow-500/40
              bg-gradient-to-r
              from-yellow-500/10
              to-yellow-400/10
              font-semibold
              text-yellow-400
              transition-all
              duration-300
              group-hover:border-yellow-400
              group-hover:bg-yellow-500
              group-hover:text-black
            "
          >
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
}