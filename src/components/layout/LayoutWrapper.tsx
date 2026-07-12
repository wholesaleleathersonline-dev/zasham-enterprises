"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Header from "./Header";
import Footer from "./Footer";
import WelcomeOfferModal from "../ui/WelcomeOfferModal";

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({
  children,
}: LayoutWrapperProps): React.JSX.Element {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <WelcomeOfferModal />

      <Header />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </>
  );
}