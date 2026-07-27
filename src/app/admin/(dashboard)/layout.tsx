import type { Metadata } from "next";
import { redirect } from "next/navigation";

import AdminLayout from "../../../components/admin/layout/AdminLayout";
import { createClient } from "../../../lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Dashboard | Zasham Enterprises",
  description: "Zasham Enterprises Admin Panel",
  robots: {
    index: false,
    follow: false,
  },
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps): Promise<React.JSX.Element> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

console.log("Dashboard User:", user?.email ?? "No User");


  if (!user) {
    redirect("/admin/login");
  }

  return <AdminLayout>{children}</AdminLayout>;
}