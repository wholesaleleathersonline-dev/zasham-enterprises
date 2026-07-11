"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [blackCursor, setBlackCursor] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [flicker, setFlicker] = useState(false);

  const frame = useRef<number | null>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame(() => {
        setPosition({
          x: e.clientX,
          y: e.clientY,
        });
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

    const mouseDown = () => {
      setClicked(true);

      setTimeout(() => {
        setClicked(false);
      }, 120);
    };

    const flickerInterval = setInterval(() => {
      setFlicker(true);

      setTimeout(() => {
        setFlicker(false);
      }, 120);
    }, 2500);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", mouseDown);
    document.addEventListener("mouseover", mouseOver);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);

      clearInterval(flickerInterval);

      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("mouseover", mouseOver);
    };
  }, []);
  return (
  <div
    className="pointer-events-none fixed left-0 top-0 z-[1000000] will-change-transform transition-transform duration-75"
    style={{
      left: position.x,
      top: position.y,
      transform: `translate(-50%, -50%) scale(${
        clicked ? 0.8 : hover ? 1.18 : 1
      })`,
    }}
  >
    {blackCursor ? (
      <div className="h-6 w-6 rounded-full border-2 border-white bg-black shadow-[0_0_18px_rgba(255,255,255,0.45)]" />
    ) : (
      <div className="relative">

        {/* Lightning Cursor */}

        <Image
          src="/cursors/cursor1.svg"
          alt="Cursor"
          width={34}
          height={34}
          priority
          draggable={false}
          className={`
            select-none
            transition-all
            duration-200
            ${
              hover
                ? "scale-125 rotate-6"
                : "scale-100"
            }
            ${
              flicker
                ? "opacity-70"
                : "opacity-100"
            }
          `}
          style={{
            filter: hover
              ? "drop-shadow(0 0 10px rgba(212,175,55,1)) drop-shadow(0 0 24px rgba(212,175,55,.9))"
              : "drop-shadow(0 0 6px rgba(212,175,55,.85)) drop-shadow(0 0 12px rgba(212,175,55,.45))",
          }}
        />

        {/* Electric Pulse */}

        {hover && (
          <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]/40 animate-ping" />
        )}

      </div>
    )}
  </div>
);
}
