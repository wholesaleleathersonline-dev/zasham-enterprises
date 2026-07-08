"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const products = [
  {
    title: "Basketball Uniform",
    image: "/Pictures/basketabll.png",
  },
  {
    title: "American Football",
    image: "/Pictures/American Football 1.png",
  },
  {
    title: "Soccer Uniform",
    image: "/Pictures/Soccer.png",
  },
  {
    title: "Baseball Uniform",
    image: "/Pictures/baseball.png",
  },
  {
    title: "Volleyball Uniform",
    image: "/Pictures/Vollyball Uniforms.png",
  },
  {
    title: "Cricket Uniform",
    image: "/Pictures/Cricket.png",
  },
  {
    title: "Rugby Uniform",
    image: "/Pictures/Rugby Uniforms.png",
  },
  {
    title: "Ice Hockey",
    image: "/Pictures/Ice Hockey.png",
  },
];

export default function FeaturedProducts() {
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
            <SwiperSlide key={product.title}>

              <div className="overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-[#111]">

                <img
                  src={product.image}
                  alt={product.title}
                  className="h-[420px] w-full object-cover"
                />

                <div className="p-5">

                  <h3 className="text-xl font-semibold text-white">
                    {product.title}
                  </h3>

                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>

    </section>
  );
}