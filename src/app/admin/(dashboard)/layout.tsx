import type { Metadata } from "next";
import AdminLayout from "../../../components/admin/layout/AdminLayout";

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

export default function AdminRootLayout({
  children,
}: AdminRootLayoutProps) {
  return <AdminLayout>{children}</AdminLayout>;
}