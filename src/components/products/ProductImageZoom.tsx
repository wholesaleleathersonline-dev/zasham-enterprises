"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageZoomProps {
  src: string;
  alt: string;
}

export default function ProductImageZoom({
  src,
  alt,
}: ProductImageZoomProps) {
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  const [zoom, setZoom] = useState(false);

  const handleMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x =
      ((e.clientX - rect.left) / rect.width) * 100;

    const y =
      ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  };

  return (
    <div
      className="group overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-[#161616]"
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      onMouseMove={handleMove}
    >
      <Image
        src={src}
        alt={alt}
        width={900}
        height={1100}
        priority
        className="h-auto w-full object-cover transition-transform duration-300 ease-out"
        style={{
          transform: zoom ? "scale(2)" : "scale(1)",
          transformOrigin: `${position.x}% ${position.y}%`,
          cursor: zoom ? "zoom-out" : "zoom-in",
        }}
      />
    </div>
  );
}