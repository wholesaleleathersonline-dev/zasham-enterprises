"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import type { Product } from "../../types/product";
import { getFeaturedProducts } from "../../services/website/product.service";

export default function FeaturedProducts(): React.JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const prevRef =
    useRef<HTMLButtonElement>(null);

  const nextRef =
    useRef<HTMLButtonElement>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data =
          await getFeaturedProducts();

       setProducts(data);
setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    void loadProducts();
  }, []);



if (loading) {
  return (
    <section className="bg-[#0F0F0F] py-24">
   <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex h-[420px] items-center justify-center rounded-3xl border border-[#D4AF37]/20 bg-[#111111]">
          <p className="text-lg text-gray-400">
            Loading Featured Products...
          </p>
        </div>
      </div>
    </section>
  );
}

if (products.length === 0) {
  return (
    <section className="bg-[#0F0F0F] py-24">
   <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-[420px] items-center justify-center rounded-3xl border border-[#D4AF37]/20 bg-[#111111]">
          <p className="text-lg text-gray-400">
            No Featured Products Found.
          </p>
        </div>
      </div>
    </section>
  );
}




 return (
  <section className="bg-[#0F0F0F] py-24">

    <div className="mx-auto max-w-[1600px] px-6">

      <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <span className="inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
            Premium Collection
          </span>

          <h2 className="mt-5 text-5xl font-black text-white">
            Featured Products
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-400">
            Premium custom sportswear manufactured with
            professional sublimation printing, premium
            fabrics and worldwide shipping.
          </p>

        </div>

        <div className="flex items-center gap-4">

          <button
            ref={prevRef}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#111111] text-[#D4AF37] transition-all duration-300 hover:scale-105 hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_40px_rgba(212,175,55,.45)]"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            ref={nextRef}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#111111] text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_40px_rgba(212,175,55,.45)]"
          >
            <ChevronRight size={22} />
          </button>

        </div>

      </div>

      


      


<div className="mx-auto max-w-7xl overflow-hidden">

      <Swiper


        modules={[
          Navigation,
          Pagination,
          Autoplay,
        ]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // @ts-expect-error
          swiper.params.navigation.prevEl =
            prevRef.current;

          // @ts-expect-error
          swiper.params.navigation.nextEl =
            nextRef.current;
        }}
       autoplay={{
  delay: 3200,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
  reverseDirection: false,
}}
      pagination={{
  clickable: true,
}}
        loop={products.length > 4}
        spaceBetween={32}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
         1280: {
  slidesPerView: 3,
},
1536: {
  slidesPerView: 4,
},
        }}
       className="featured-swiper pb-20"
      >

        {products.map((product) => (

         <SwiperSlide key={product.id} className="h-auto">

  <Link
    href={`/team-uniforms/${product.sportRoute}/${product.slug}`}
   className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-[#111111] transition-all duration-700 hover:border-[#D4AF37] hover:shadow-[0_25px_70px_rgba(212,175,55,.22)]">

    {/* Image */}

<div className="relative flex h-[300px] items-center justify-center overflow-hidden rounded-t-3xl bg-gradient-to-br from-[#1B1B1B] via-[#111111] to-[#090909] p-8">

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,.10),transparent_60%)]" />

  <span className="absolute left-5 top-5 z-20 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37] px-4 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-black">
    FEATURED
  </span>

  <img
    src={product.image || "/Pictures/pch.jpg"}
    alt={product.name}
    loading="lazy"
    className="relative z-10 max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.08]"
  />

</div>

    {/* Content */}
<div className="flex flex-1 flex-col p-6">

  <span className="mb-4 inline-flex w-fit rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
    {product.sport}
  </span>

  <h3 className="line-clamp-2 h-[64px] text-2xl font-black leading-tight text-white">
    {product.name}
  </h3>

  <p className="mt-4 line-clamp-2 text-sm leading-7 text-gray-400">
    Premium custom sportswear manufactured with
    high-quality sublimation printing.
  </p>

  <div className="mt-6 flex items-end justify-between">

    <div>

      <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
        MOQ
      </p>

      <p className="mt-1 text-lg font-bold text-white">
        {product.moq} Sets
      </p>

    </div>

    <div className="text-right">

      <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
        PRICE
      </p>

      <p className="mt-1 text-3xl font-black text-[#D4AF37]">
        {product.price}
      </p>

    </div>

  </div>

  <div className="mt-8">

    <div className="inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/30 px-5 py-3 transition-all duration-300 group-hover:border-[#D4AF37]">

      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37] text-black">
        →
      </span>

      <span className="text-sm font-bold uppercase tracking-[0.18em] text-white">
        View Product
      </span>

    </div>

  </div>

</div>

  </Link>

</SwiperSlide>
        ))}

      </Swiper>
      </div>

    </div>

  </section>
);
}

