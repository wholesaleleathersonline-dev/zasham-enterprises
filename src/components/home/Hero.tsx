"use client";
import Image from "next/image";

interface HeroProps {
  image: string;
}

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/animations";

export default function Hero({
  image,
}: HeroProps): React.JSX.Element {
  return (
<section
  className="
    relative
    w-full
    overflow-hidden

    mt-[133px]
    sm:mt-[133px]
   md:mt-[130px]
lg:mt-[190px]

    h-[200px]
    min-[360px]:h-[220px]
    min-[394px]:h-[240px]
    min-[430px]:h-[260px]
    sm:h-[340px]
    md:h-[650px]
  "
>
<Image
  src={image}
  alt="Hero Banner"
  fill
  priority
  quality={100}
  sizes="100vw"
  className="object-cover object-center"
/>  
</section>
  );
}