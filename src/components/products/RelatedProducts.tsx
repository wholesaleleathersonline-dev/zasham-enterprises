    "use client";
    
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import type { Product } from "../../types/product";


import RelatedProductCard from "./RelatedProductCard";

interface RelatedProductsProps {
  currentProductId: number;
  products: Product[];
}

export default function RelatedProducts({
  currentProductId,
  products,
}: RelatedProductsProps)  {

  
const relatedProducts = products.filter(
  (product) => product.id !== currentProductId
);

  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (

    

    <section className="mt-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10 flex items-center justify-between">

          <div>

            <span className="rounded-full bg-[#D4AF37]/10 px-4 py-2 text-sm font-semibold text-[#D4AF37]">
              MORE PRODUCTS
            </span>
            

          <h2 className="mt-4 text-4xl font-black">
  Related {products[0]?.sport} Uniforms
</h2>

<p className="mt-3 max-w-2xl text-gray-400">
  Explore more premium {products[0]?.sport.toLowerCase()} uniforms
  manufactured by Zasham Enterprises.
</p>

          </div>

          <div className="hidden gap-4 md:flex">

            <button
              onClick={scrollPrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#161616] transition hover:bg-[#D4AF37] hover:text-black"
            >
              ←     
            </button>

            <button
              onClick={scrollNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#161616] transition hover:bg-[#D4AF37] hover:text-black"
            >
              →
            </button>

          </div>

        </div>

        <div
          className="overflow-hidden"
          ref={emblaRef}
        >

          <div className="flex gap-8">

            

                      {relatedProducts.map((product) => (

            <div
              key={product.id}
              className="min-w-0 flex-[0_0_100%] mt-3 sm:flex-[0_0_calc(50%-16px)] lg:flex-[0_0_calc(33.333%-22px)] xl:flex-[0_0_calc(25%-24px)]"
            >

           <RelatedProductCard
  slug={product.slug}
  sportRoute={product.sportRoute}
  name={product.name}
  category={product.category}
  image={product.image}
  price={product.price}
/>

            </div>

          ))}

          </div>

        </div>

      </div>

    </section>

  );
}