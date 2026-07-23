"use client";

import { useState } from "react";
import Link from "next/link";
import OrderSheetStatusModal from "./OrderSheetStatusModal";
import { createOrderSheet } from "../../services/order-sheet.service";

export default function CreateTeamForm() {
  const [teamName, setTeamName] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const [copied, setCopied] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

const [modalType, setModalType] = useState<"success" | "error">("success");

const [modalTitle, setModalTitle] = useState("");

const [modalMessage, setModalMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

   if (
  !teamName.trim() ||
  !captainName.trim() ||
  !captainEmail.trim() ||
  !category
) {
      setModalType("error");
setModalTitle("Missing Information");
setModalMessage("Please fill all required fields.");
setModalOpen(true);
return;
      return;
    }

    try {
      setLoading(true);
const order = await createOrderSheet({
  team_name: teamName,
  captain_name: captainName,
  captain_email: captainEmail,
  category,
});

      const playerLink = `${window.location.origin}/order-sheet/${order.order_code}`;

const captainLink = `${window.location.origin}/order-sheet/manage/${order.order_code}?token=${order.manage_token}`;

await fetch("/api/inquiry", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    inquiryType: "order-sheet",

    teamName: order.team_name,
    captainName: order.captain_name,
    captainEmail: order.captain_email,

    playerLink,
    captainLink,
  }),
});

      setCreatedOrder(order);

      setTeamName("");
      setCaptainName("");
      setCaptainEmail("");
      setCategory("");
    } catch (error: any) {
      console.error(error);
      setModalType("error");
setModalTitle("Creation Failed");
setModalMessage(
  error.message || "Failed to create order sheet."
);
setModalOpen(true);
    } finally {
      setLoading(false);
    }
  }

async function copy(text: string, type: string) {
  try {
    await navigator.clipboard.writeText(text);

    setCopied(type);

    setModalType("success");
    setModalTitle("Link Copied");
    setModalMessage(
      type === "player"
        ? "Player order link has been copied successfully."
        : "Captain dashboard link has been copied successfully."
    );
    setModalOpen(true);

    setTimeout(() => {
      setCopied("");
    }, 2000);

  } catch (error) {
    console.error(error);

    setModalType("error");
    setModalTitle("Copy Failed");
    setModalMessage("Unable to copy the link. Please try again.");
    setModalOpen(true);
  }
}
  if (createdOrder) {
    const playerLink =
      `${window.location.origin}/order-sheet/${createdOrder.order_code}`;

    const captainLink =
      `${window.location.origin}/order-sheet/manage/${createdOrder.order_code}?token=${createdOrder.manage_token}`;

          return (
      <div className="w-full max-w-2xl rounded-2xl border border-yellow-500/20 bg-[#181818] p-8 shadow-xl">
        <h1 className="text-center text-3xl font-bold text-yellow-400">
          Order Sheet Created 🎉
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Your team has been created successfully.
        </p>

        <div className="mt-8 space-y-5">

          <div>
            <p className="text-sm text-gray-400">Team Name</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {createdOrder.team_name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Captain Name</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {createdOrder.captain_name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Captain Email</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {createdOrder.captain_email}
            </p>
          </div>

   

          <div>
            <p className="mb-2 text-sm text-gray-400">
              Player Order Link
            </p>

            <input
              readOnly
              value={playerLink}
              className="w-full rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white"
            />

            <div className="mt-3 flex gap-3">
              <button
                onClick={() => copy(playerLink, "player")}
                className="flex-1 rounded-xl bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-400"
              >
                {copied === "player" ? "Copied!" : "Copy"}
              </button>

              <a
                href={playerLink}
                target="_blank"
                className="flex-1 rounded-xl border border-yellow-500 py-3 text-center font-semibold text-yellow-400"
              >
                Open
              </a>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-400">
              Captain Dashboard
            </p>

            <input
              readOnly
              value={captainLink}
              className="w-full rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white"
            />

            <div className="mt-3 flex gap-3">
              <button
                onClick={() => copy(captainLink, "captain")}
                className="flex-1 rounded-xl bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-400"
              >
                {copied === "captain" ? "Copied!" : "Copy"}
              </button>

              <a
                href={captainLink}
                target="_blank"
                className="flex-1 rounded-xl border border-yellow-500 py-3 text-center font-semibold text-yellow-400"
              >
                Open
              </a>
            </div>
          </div>

          <button
            onClick={() => {
              setCreatedOrder(null);
              setCopied("");
            }}
            className="w-full rounded-xl bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-400"
          >
            Create Another Team
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg rounded-2xl border border-yellow-500/20 bg-[#181818] p-8 shadow-xl">
      <h1 className="text-center text-3xl font-bold text-yellow-400">
        Create Order Sheet
      </h1>

      <p className="mt-2 text-center text-gray-400">
        Enter your team details to create an order sheet.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Team Name
          </label>

          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Texas Wildcats"
            className="w-full rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Captain Name
          </label>

          <input
            type="text"
            value={captainName}
            onChange={(e) => setCaptainName(e.target.value)}
            placeholder="John Smith"
            className="w-full rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none focus:border-yellow-500"
          />
        </div>

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
<div>
  <label className="mb-2 block text-sm text-gray-300">
    Category
  </label>

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none focus:border-yellow-500"
  >
    <option value="">Select Category</option>

    <option value="Basketball">Basketball</option>
    <option value="Baseball">Baseball</option>
    <option value="Soccer">Soccer</option>
    <option value="Volleyball">Volleyball</option>
    <option value="Rugby">Rugby</option>
    <option value="Cricket">Cricket</option>
    <option value="Ice Hockey">Ice Hockey</option>
    <option value="Team Apparel">Team Apparel</option>
    <option value="Flag Football">Flag Football</option>
  </select>
</div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-400 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Team"}
        </button>
      </form>

      <Link
        href="/order-sheet/recover"
        className="mt-6 block text-center text-sm text-yellow-400 hover:underline"
      >
       Already have a team? Access My Teams
      </Link>

      <OrderSheetStatusModal
  isOpen={modalOpen}
  type={modalType}
  title={modalTitle}
  message={modalMessage}
  onClose={() => setModalOpen(false)}
/>
    </div>
  );
}