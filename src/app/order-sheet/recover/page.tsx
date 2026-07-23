    "use client";

    import { useState } from "react";
    import Link from "next/link";
import {
  getCaptainTeams,
  deleteOrderSheet,
} from "../../../services/order-sheet.service";

import DeleteOrderSheetModal from "../../../components/order-sheet/DeleteOrderSheetModal";
import OrderSheetStatusModal from "../../../components/order-sheet/OrderSheetStatusModal";



    export default function RecoverCaptainDashboardPage() {
  
  const [loading, setLoading] = useState(false);
    const [captainEmail, setCaptainEmail] = useState("");
    const [teams, setTeams] = useState<any[]>([]);
const [searched, setSearched] = useState(false);
const [modalOpen, setModalOpen] = useState(false);

const [modalType, setModalType] = useState<"success" | "error">("success");

const [modalTitle, setModalTitle] = useState("");

const [modalMessage, setModalMessage] = useState("");
const [deletingTeam, setDeletingTeam] = useState<any>(null);

   async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

if (!captainEmail.trim()) {
  setModalType("error");
  setModalTitle("Email Required");
  setModalMessage("Please enter your captain email.");
  setModalOpen(true);
  return;
}

  try {
    setLoading(true);

    const data = await getCaptainTeams(
      captainEmail.trim().toLowerCase()
    );

    setTeams(data || []);
    setSearched(true);
    if (data.length > 0) {
  setModalType("success");
  setModalTitle("Teams Found");
  setModalMessage(
    `${data.length} team${data.length > 1 ? "s" : ""} found for your account.`
  );
  setModalOpen(true);
}

 } catch (error: any) {
  console.error(error);

    setTeams([]);
    setSearched(true);

    setModalType("error");
setModalTitle("Search Failed");
setModalMessage(
  "Unable to find your teams. Please check your email and try again."
);
setModalOpen(true);
  } finally {
    setLoading(false);
  }
}

async function handleDeleteTeam() {
  if (!deletingTeam) return;

  try {
    await deleteOrderSheet(deletingTeam.id);

    setTeams((prev) =>
      prev.filter((team) => team.id !== deletingTeam.id)
    );

    setDeletingTeam(null);

    setModalType("success");
    setModalTitle("Team Deleted");
    setModalMessage("The team has been deleted successfully.");
    setModalOpen(true);

  } catch (error) {
    console.error(error);

    setDeletingTeam(null);

    setModalType("error");
    setModalTitle("Delete Failed");
    setModalMessage("Unable to delete this team.");
    setModalOpen(true);
  }
}

   return (
  <main className="min-h-screen bg-[#0F0F0F] px-4 pt-44 pb-10 sm:pt-44 md:pt-48 lg:pt-52">
    <div className="mx-auto flex w-full max-w-7xl justify-center">
      <div className="w-full max-w-4xl rounded-2xl border border-yellow-500/20 bg-[#181818] p-8 shadow-xl">

        <h1 className="text-center text-3xl font-bold text-yellow-400">
          My Teams
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Sign in with your Captain Email to access all your teams.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Captain Email
            </label>

            <input
              type="email"
              value={captainEmail}
              onChange={(e) => setCaptainEmail(e.target.value)}
              placeholder="john@email.com"
              className="w-full rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-400 disabled:opacity-60"
          >
            {loading ? "Searching..." : "Find My Teams"}
          </button>
        </form>

        <Link
  href="/order-sheet"
  className="mt-8 block w-full rounded-xl border border-yellow-500 py-3 text-center font-semibold text-yellow-400 hover:bg-yellow-500 hover:text-black transition"
>
  + Create New Team
</Link>

        {searched && (
          <div className="mt-8 space-y-4">
            {teams.length === 0 ? (
              <div className="rounded-xl border border-red-500/20 bg-[#111] p-5 text-center text-gray-400">
                No teams found with this email.
              </div>
            ) : (
              teams.map((team) => (
               <div
  key={team.order_code}
  className="rounded-2xl border border-yellow-500/20 bg-[#111] p-6 shadow-lg"
>
                  <h2 className="text-xl font-bold text-yellow-400">
  {team.team_name}
</h2>

<div className="mt-4 grid grid-cols-2 gap-3 text-sm">

  <div>
    <p className="text-gray-500">Category</p>
    <p className="font-medium text-white">
      {team.category}
    </p>
  </div>

  <div>
    <p className="text-gray-500">Status</p>

    <p
      className={`font-medium ${
        team.is_locked
          ? "text-red-400"
          : "text-green-400"
      }`}
    >
      {team.is_locked ? "Locked" : "Open"}
    </p>
  </div>

  <div>
    <p className="text-gray-500">Players</p>
    <p className="font-medium text-white">
      0
    </p>
  </div>

  <div>
    <p className="text-gray-500">Created</p>
    <p className="font-medium text-white">
      {new Date(team.created_at).toLocaleDateString()}
    </p>
  </div>

</div>



                  <Link
                    href={`/order-sheet/manage/${team.order_code}?token=${team.manage_token}`}
                    className="mt-5 block rounded-xl bg-yellow-500 py-3 text-center font-semibold text-black hover:bg-yellow-400"
                  >
                    Open Dashboard
                  </Link>
                  <button
  onClick={() => setDeletingTeam(team)}
  className="mt-3 w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-500"
>
  🗑 Delete Team
</button>
                </div>
                
              ))
            )}
            
          </div>
          
        )}

      </div>
    </div>
    <DeleteOrderSheetModal
  isOpen={!!deletingTeam}
  teamName={deletingTeam?.team_name || ""}
  onClose={() => setDeletingTeam(null)}
  onConfirm={handleDeleteTeam}
/>

    <OrderSheetStatusModal
  isOpen={modalOpen}
  type={modalType}
  title={modalTitle}
  message={modalMessage}
  onClose={() => setModalOpen(false)}
/>
  </main>
);
    }