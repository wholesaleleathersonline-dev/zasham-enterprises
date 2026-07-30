"use client";

import { useEffect, useRef, useState } from "react";

interface SearchableSelectProps {
  name: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (name: string, value: string) => void;
  allowCustomValue?: boolean;
}

export default function SearchableSelect({
  name,
  value,
  placeholder,
  options,
  onChange,
  allowCustomValue = false,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = options.filter((item) =>
    item.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectItem = (item: string) => {
    onChange(name, item);
    setOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        value={value}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          onChange(name, e.target.value);
          setOpen(true);
          setHighlight(0);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();

            if (!filtered.length) return;

            setHighlight((prev) =>
              prev < filtered.length - 1 ? prev + 1 : prev
            );
          }

          if (e.key === "ArrowUp") {
            e.preventDefault();

            if (!filtered.length) return;

            setHighlight((prev) => (prev > 0 ? prev - 1 : 0));
          }

          if (e.key === "Enter") {
            e.preventDefault();

            if (filtered.length > 0) {
              selectItem(filtered[highlight]);
            } else if (allowCustomValue) {
              setOpen(false);
            }
          }

          if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
      />

      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-zinc-700 bg-zinc-900 shadow-xl">
          {filtered.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => selectItem(item)}
              className={`block w-full px-4 py-3 text-left transition ${
                index === highlight
                  ? "bg-yellow-500 text-black"
                  : "text-white hover:bg-zinc-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}