"use client";

import { useState } from "react";

import { createPlayer } from "../../services/player.service";
import { SIZES } from "../../constants/sizes";
import { SHORTS_STYLES } from "../../constants/shortsStyles";
import { HOOD_OPTIONS } from "../../constants/hoodOptions";
import OrderSheetStatusModal from "./OrderSheetStatusModal";
import {
  FLAG_FOOTBALL_MATERIALS,
  FLAG_FOOTBALL_TOP_STYLES,
  FLAG_FOOTBALL_SHORTS,
  JOGGER_SIZES,
} from "../../constants/flagfootball";

interface Props {

  
  orderSheet: any;
  onSuccess: () => void;
}



export default function PlayerForm({
  orderSheet,
  onSuccess,
}: Props)

{


  if (orderSheet.is_locked) {
  return (
    <div className="rounded-2xl border border-red-500/30 bg-[#181818] p-8 text-center">

      <div className="text-5xl">
        🔒
      </div>

      <h2 className="mt-4 text-2xl font-bold text-red-400">
        Order Locked
      </h2>

      <p className="mt-3 text-gray-400">
        The captain has locked this order.
        <br />
        No more players can be added.
      </p>

    </div>
  );
}
  const [loading, setLoading] = useState(false);

  const [playerNumber, setPlayerNumber] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [topSize, setTopSize] = useState("");
  const [bottomSize, setBottomSize] = useState("");
  const [shortsStyle, setShortsStyle] = useState("");
  const [hood, setHood] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
const [modalOpen, setModalOpen] = useState(false);
const isFlagFootball = orderSheet.category === "Flag Football";
const [material, setMaterial] = useState("");
const [topStyle, setTopStyle] = useState("");
const [joggerSize, setJoggerSize] = useState("");

const [modalType, setModalType] = useState<"success" | "error">("success");

const [modalTitle, setModalTitle] = useState("");

const [modalMessage, setModalMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();


if (!playerNumber || !playerName) {
  setModalType("error");
  setModalTitle("Missing Information");
  setModalMessage(
    "Player Name and Jersey Number are required."
  );
  setModalOpen(true);
  return;
}
   
    

    try {
      setLoading(true);

     await createPlayer({
  order_sheet_id: orderSheet.id,
  player_number: playerNumber,
  player_name: playerName,
  top_size: topSize,
  bottom_size: bottomSize,
  shorts_style: shortsStyle,
  hood,

  material: isFlagFootball ? material : undefined,
  top_style: isFlagFootball ? topStyle : undefined,
  jogger_size: isFlagFootball ? joggerSize : undefined,

  special_request: specialRequest,
});

      setPlayerNumber("");
      setPlayerName("");
      setTopSize("");
      setBottomSize("");
      setShortsStyle("");
      setHood("");
      setSpecialRequest("");

      onSuccess();

   setModalType("success");
setModalTitle("Success");
setModalMessage("Player information submitted successfully.");
setModalOpen(true);
  } catch (error: any) {
  console.error(error);

  if (error.message === "PLAYER_NUMBER_EXISTS") {
    setModalType("error");
    setModalTitle("Player Number Already Exists");
    setModalMessage(
      "This jersey number has already been used for this team. Please choose a different player number."
    );
  } else {
    setModalType("error");
    setModalTitle("Submission Failed");
    setModalMessage("Something went wrong. Please try again.");
  }

  setModalOpen(true);
} finally {
 setLoading(false);
}
  }

  return (
    <div className="mt-8 w-full rounded-2xl border border-yellow-500/20 bg-[#181818] p-4 shadow-xl sm:p-6 lg:p-8">

      <h2 className="mb-6 text-center text-2xl font-bold text-yellow-400 sm:text-3xl">
        Player Information
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
      >

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Player Number *
          </label>

          <input
            type="text"
            value={playerNumber}
            onChange={(e) => setPlayerNumber(e.target.value)}
            className="w-full rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
            placeholder="23"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Player Name *
          </label>

          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Top Size 
          </label>

          <select
            value={topSize}
            onChange={(e) => setTopSize(e.target.value)}
            className="w-full rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
          >
            <option value="">Select Size</option>

            {SIZES.map((size) => (
              <option
                key={size}
                value={size}
              >
                {size}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Bottom Size 
          </label>

          <select
            value={bottomSize}
            onChange={(e) => setBottomSize(e.target.value)}
            className="w-full rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
          >
            <option value="">Select Size</option>

            {SIZES.map((size) => (
              <option
                key={size}
                value={size}
              >
                {size}
              </option>
            ))}
          </select>
        </div>        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Shorts Style 
          </label>

          <select
            value={shortsStyle}
            onChange={(e) => setShortsStyle(e.target.value)}
            className="w-full rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
          >
            <option value="">Select Style</option>
{(isFlagFootball
  ? FLAG_FOOTBALL_SHORTS
  : SHORTS_STYLES
).map((style) => (
  <option
    key={style}
    value={style}
  >
    {style}
  </option>
))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Hood 
          </label>

          <select
            value={hood}
            onChange={(e) => setHood(e.target.value)}
            className="w-full rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
          >
            <option value="">Select Option</option>

            {HOOD_OPTIONS.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>


        {isFlagFootball && (
  <>
   

   
  </>
)}

{isFlagFootball && (
  <>
    {/* Material */}
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-300">
        Material *
      </label>

      <select
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        className="w-full rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
      >
        <option value="">Select Material</option>

        {FLAG_FOOTBALL_MATERIALS.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>

    {/* Top Style */}
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-300">
        Top Style *
      </label>

      <select
        value={topStyle}
        onChange={(e) => setTopStyle(e.target.value)}
        className="w-full rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
      >
        <option value="">Select Top Style</option>

        {FLAG_FOOTBALL_TOP_STYLES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>

    {/* Jogger Size */}
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-300">
        Uniform Jogger Pants Size
      </label>

      <select
        value={joggerSize}
        onChange={(e) => setJoggerSize(e.target.value)}
        className="w-full rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
      >
        <option value="">Not Required</option>

        {JOGGER_SIZES.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  </>
)}






        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Special Request
          </label>

          <textarea
            rows={4}
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            placeholder="Sleeves longer, player nickname, etc."
            className="w-full rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white outline-none transition resize-none focus:border-yellow-500"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Information"}
          </button>
        </div>

      </form>

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