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

interface AdminRootLayoutProps {
  children: React.ReactNode;
}

export default async function AdminRootLayout({
  children,
}: AdminRootLayoutProps): Promise<React.JSX.Element> {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin/login");
  }

  return <AdminLayout>{children}</AdminLayout>;
}