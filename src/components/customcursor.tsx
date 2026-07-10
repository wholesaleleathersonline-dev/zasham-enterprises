"use client";

import { useEffect, useState } from "react";
import { FaHandPointer } from "react-icons/fa";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [blackCursor, setBlackCursor] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const mouseOver = (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.closest(".cursor-black")) {
        setBlackCursor(true);
        setHover(false);
      } else if (
        target.closest(".cursor-hover") ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setBlackCursor(false);
        setHover(true);
      } else {
        setBlackCursor(false);
        setHover(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", mouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", mouseOver);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[999999] will-change-transform"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      {blackCursor ? (
        <div className="h-6 w-6 rounded-full bg-black border-2 border-white shadow-[0_0_18px_rgba(255,255,255,0.45)]"></div>
      ) : hover ? (
        <FaHandPointer className="text-[#D4AF37] text-3xl drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
      ) : (
        <div className="h-6 w-6 rounded-full border-2 border-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.8)]"></div>
      )}
    </div>
  );
}