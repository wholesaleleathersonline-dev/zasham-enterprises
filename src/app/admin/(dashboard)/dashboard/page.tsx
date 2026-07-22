import Link from "next/link";
import { getRevenueStats } from "../../../../services/revenue.service";

export default async function DashboardPage(): Promise<React.JSX.Element> {
  const stats = await getRevenueStats();
  return (
    <div className="space-y-6">
     <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
  {/* Total Sales */}
  <div className="relative overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-br from-[#181818] via-[#111111] to-[#0B0B0B] p-6">
    <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-green-500/10 blur-3xl" />

    <p className="text-sm uppercase tracking-[0.3em] text-green-400">
      Total Sales
    </p>

    <h2 className="mt-4 text-4xl font-bold text-white">
      $
      {Number(stats.totalSales).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </h2>

    <p className="mt-2 text-zinc-400">
      Total invoice value
    </p>
  </div>

  {/* Total Expenses */}
  <div className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-[#181818] via-[#111111] to-[#0B0B0B] p-6">
    <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-red-500/10 blur-3xl" />

    <p className="text-sm uppercase tracking-[0.3em] text-red-400">
      Total Expenses
    </p>

    <h2 className="mt-4 text-4xl font-bold text-white">
      $
      {Number(stats.totalExpenses).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </h2>

    <p className="mt-2 text-zinc-400">
      Fabric + Sublimation + Shipping
    </p>
  </div>

  {/* Net Revenue */}
  <div className="relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-[#181818] via-[#111111] to-[#0B0B0B] p-6">
    <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-yellow-500/10 blur-3xl" />

    <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
      Net Revenue
    </p>

    <h2 className="mt-4 text-4xl font-bold text-white">
      $
      {Number(stats.totalRevenue).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </h2>

    <p className="mt-2 text-zinc-400">
      Sales − Expenses
    </p>
  </div>
</div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-[#111111] p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            Recent Customers
          </h2>

          <p className="mt-3 text-sm text-zinc-400 sm:text-base">
            Customer list will appear here.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-[#111111] p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            Recent Invoices
          </h2>

          <p className="mt-3 text-sm text-zinc-400 sm:text-base">
            Invoice list will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}