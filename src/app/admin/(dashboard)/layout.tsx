import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Zasham Enterprises",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}