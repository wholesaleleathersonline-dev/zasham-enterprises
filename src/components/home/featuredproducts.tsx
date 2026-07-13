"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import Link from "next/link";

import type { Product } from "../../types/product";
import { getFeaturedProducts } from "../../services/website/product.service";



export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
  async function loadProducts() {
    try {
      const data = await getFeaturedProducts();

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  void loadProducts();
}, []);


  return (
    <section className="bg-[#0F0F0F] py-24">

      <div className="mx-auto max-w-[1600px] px-6">

        <h2 className="text-center text-5xl font-bold text-[#D4AF37]">
          Featured Products
        </h2>

        <p className="mt-4 mb-16 text-center text-gray-400">
          Premium Quality Custom Sportswear
        </p>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{
  clickable: true,
  type: "progressbar",
}}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={25}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>

             <Link
  href={`/team-uniforms/${product.sportRoute}/${product.slug}`}
  className="block overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-[#111] transition hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,.2)]"
>

                <img
                 src={product.image || "/Pictures/pch.jpg"}
                  alt={product.name}
                 className="h-[420px] w-full object-contain bg-[#111]"
                />

                <div className="p-5">

                  <h3 className="text-xl font-semibold text-white">
                    {product.name}
                  </h3>

                </div>

              </Link>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>

    </section>
  );
}