"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import PlayerForm from "../../../components/order-sheet/PlayerForm";
import { getOrderSheet } from "../../../services/order-sheet.service";

import PlayersList from "../../../components/order-sheet/PlayersList";

import { getPlayers } from "../../../services/player.service";

export default function OrderSheetDetailsPage() {
  const params = useParams();

  const orderCode = params.orderCode as string;

  const [orderSheet, setOrderSheet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    loadOrderSheet();
  }, []);

 async function loadOrderSheet() {
  try {
    const data = await getOrderSheet(orderCode);

    setOrderSheet(data);

    const playerData = await getPlayers(data.id);

    setPlayers(playerData || []);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}


async function loadPlayers() {
  if (!orderSheet) return;

  try {
    const data = await getPlayers(orderSheet.id);

    setPlayers(data || []);
  } catch (error) {
    console.error(error);
  }
}
  if (loading) return <p className="p-10 text-white">Loading...</p>;

  if (!orderSheet)
    return <p className="p-10 text-red-500">Order Sheet Not Found</p>;

  return (
  <main className="min-h-screen bg-[#0F0F0F] px-4 pb-10 pt-40 sm:pt-40 md:pt-44 lg:pt-48 xl:pt-52">

      <div className="mx-auto w-full max-w-6xl">

  <div className="mb-8 rounded-2xl border border-yellow-500/20 bg-[#181818] p-4 sm:p-6 lg:p-8">

    <h1 className="text-center text-2xl font-bold text-yellow-400 sm:text-3xl lg:text-4xl break-words">
      {orderSheet.team_name}
    </h1>

    <p className="mt-3 break-all text-center text-sm text-gray-400 sm:text-base">
      Order Code: {orderSheet.order_code}
    </p>
    <p className="mt-4 text-center text-base font-semibold text-yellow-400">
  👥 Players Submitted: {players.length}
</p>

  </div>

      <PlayerForm
  orderSheet={orderSheet}
  onSuccess={loadPlayers}
/>
<PlayersList players={players} />

      </div>

    </main>
  );
}