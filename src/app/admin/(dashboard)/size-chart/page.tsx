import Link from "next/link";
import { Plus, Pencil, Trash2, Ruler } from "lucide-react";

import SizeChartsTable from "../../../../components/admin/size-chart/SizeChartsTable";

export default async function SizeChartPage(): Promise<React.JSX.Element> {


  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-3 py-4 sm:px-4 sm:py-6 lg:px-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="break-words text-2xl font-bold text-white sm:text-3xl">
            Size Charts
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Create and manage reusable size charts.
          </p>
        </div>

        <Link
          href="/admin/size-chart/create"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400 sm:w-auto"
        >
          <Plus size={18} />
          Create Size Chart
        </Link>
      </div>

<div className="overflow-hidden rounded-xl border border-yellow-500/20 bg-[#1A1A1A]">
  <SizeChartsTable />
</div>



    
    </div>
  );
}