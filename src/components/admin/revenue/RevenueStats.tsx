"use client";

import { useEffect, useState } from "react";
import {
  DollarSign,
  Wallet,
  Clock3,
  BadgeCheck,
} from "lucide-react";

import RevenueCard from "./RevenueCard";
import { getRevenueStats } from "../../../services/revenue.service";

export default function RevenueStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRevenue() {
      try {
        const data = await getRevenueStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load revenue:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRevenue();
  }, []);

  if (loading) {
    return (
      <div className="text-gray-400">
        Loading revenue...
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <RevenueCard
        title="Total Revenue"
        value={`$${stats.totalRevenue.toLocaleString()}`}
        subtitle="Overall Revenue"
        icon={<DollarSign size={24} />}
      />

      <RevenueCard
        title="This Month"
        value={`$${stats.monthlyRevenue.toLocaleString()}`}
        subtitle="Current Month"
        icon={<Wallet size={24} />}
      />

      <RevenueCard
        title="Pending Revenue"
        value={`$${stats.pendingRevenue.toLocaleString()}`}
        subtitle="Awaiting Payment"
        icon={<Clock3 size={24} />}
      />

      <RevenueCard
        title="Paid Invoices"
        value={stats.paidInvoices}
        subtitle="Completed Payments"
        icon={<BadgeCheck size={24} />}
      />
    </div>
  );
}