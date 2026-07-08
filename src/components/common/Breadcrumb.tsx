import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({
  items,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-[#D4AF37]/10 bg-[#111111]"
    >
      <div className="mx-auto flex max-w-7xl items-center px-6 py-4">

        <ol className="flex flex-wrap items-center gap-2 text-sm">

          {items.map((item, index) => {
            const last = index === items.length - 1;

            return (
              <li key={item.label} className="flex items-center gap-2">

                {item.href && !last ? (
                  <Link
                    href={item.href}
                    className="text-gray-400 transition hover:text-[#D4AF37]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-[#D4AF37]">
                    {item.label}
                  </span>
                )}

                {!last && (
                  <FaChevronRight
                    size={10}
                    className="text-gray-600"
                  />
                )}

              </li>
            );
          })}

        </ol>

      </div>
    </nav>
  );
}