"use client";

import RevenueStats from "./RevenueStats";
import RevenueTable from "./RevenueTable";

export default function Page() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Revenue Dashboard
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Track your revenue, payments and business performance.
        </p>
      </div>

      {/* Stats */}

      <RevenueStats />

<RevenueTable />

    </div>
  );
}