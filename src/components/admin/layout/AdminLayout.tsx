  import React from "react";
  import Sidebar from "./Sidebar";
  import Topbar from "./Topbar";
  import MobileSidebar from "./MobileSidebar";

  interface AdminLayoutProps {
    children: React.ReactNode;
  }

  export default function AdminLayout({
    children,
  }: AdminLayoutProps): React.JSX.Element {
    return (
      <div className="flex min-h-screen bg-[#0B0B0B] text-white">
        {/* Sidebar */}
        <>
    <Sidebar />
    <MobileSidebar />
  </>

        {/* Main Content */}
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <Topbar />

          {/* Page Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#141414] p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    );
  }