"use client";

import CreateTeamForm from "../../components/order-sheet/CreateTeamForm";

export default function OrderSheetPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] px-4 pt-44 pb-10 sm:pt-44 md:pt-48 lg:pt-52">
      <div className="mx-auto flex w-full max-w-7xl justify-center">
        <CreateTeamForm />
      </div>
    </main>
  );
}