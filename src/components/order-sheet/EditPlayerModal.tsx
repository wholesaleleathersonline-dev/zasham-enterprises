"use client";

import { useEffect, useState } from "react";

import { updatePlayer } from "../../services/player.service";
import OrderSheetStatusModal from "./OrderSheetStatusModal";
import { SIZES } from "../../constants/sizes";
import { SHORTS_STYLES } from "../../constants/shortsStyles";
import { HOOD_OPTIONS } from "../../constants/hoodOptions";
import {
  FLAG_FOOTBALL_MATERIALS,
  FLAG_FOOTBALL_TOP_STYLES,
  FLAG_FOOTBALL_SHORTS,
  JOGGER_SIZES,
} from "../../constants/flagfootball";

interface Props {
  isOpen: boolean;
  player: any;
  category: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditPlayerModal({
  isOpen,
  player,
  category,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [playerNumber, setPlayerNumber] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [topSize, setTopSize] = useState("");
  const [bottomSize, setBottomSize] = useState("");
  const [shortsStyle, setShortsStyle] = useState("");
  const [hood, setHood] = useState("");
  const isFlagFootball = category === "Flag Football";
  const [specialRequest, setSpecialRequest] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] =
    useState<"success" | "error">("success");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [material, setMaterial] = useState("");
const [topStyle, setTopStyle] = useState("");
const [joggerSize, setJoggerSize] = useState("");

  useEffect(() => {
    if (!player) return;

    setPlayerNumber(player.player_number ?? "");
    setPlayerName(player.player_name ?? "");
    setTopSize(player.top_size ?? "");
    setBottomSize(player.bottom_size ?? "");
    setShortsStyle(player.shorts_style ?? "");
    setHood(player.hood ?? "");
    setSpecialRequest(player.special_request ?? "");
  }, [player]);

  if (!isOpen || !player) return null;

    async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    if (!playerNumber || !playerName || !topSize || !bottomSize) {
      setModalType("error");
      setModalTitle("Missing Information");
      setModalMessage("Please fill all required fields.");
      setModalOpen(true);
      return;
    }

    try {
      setLoading(true);

      await updatePlayer(player.id, {
        player_number: playerNumber,
        player_name: playerName,
        top_size: topSize,
        bottom_size: bottomSize,
        shorts_style: shortsStyle,
        hood,
        special_request: specialRequest,
        material,
top_style: topStyle,
jogger_size: joggerSize,
      });

      setModalType("success");
      setModalTitle("Player Updated");
      setModalMessage("Player information updated successfully.");
      setModalOpen(true);
    } catch (error: any) {
      console.error(error);

      setModalType("error");
      setModalTitle("Update Failed");
      setModalMessage(error.message || "Something went wrong.");

      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
        <div className="w-full max-w-2xl rounded-2xl border border-yellow-500/20 bg-[#181818] p-6 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-yellow-400">
              Edit Player
            </h2>

            <button
              onClick={onClose}
              className="text-2xl text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <form
            onSubmit={handleSave}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <input
              value={playerNumber}
              onChange={(e) => setPlayerNumber(e.target.value)}
              placeholder="Player Number"
              className="rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white"
            />

            <input
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Player Name"
              className="rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white"
            />

            <select
              value={topSize}
              onChange={(e) => setTopSize(e.target.value)}
              className="rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white"
            >
              {SIZES.map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>

            <select
              value={bottomSize}
              onChange={(e) => setBottomSize(e.target.value)}
              className="rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white"
            >
              {SIZES.map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>

           <select
  value={shortsStyle}
  onChange={(e) => setShortsStyle(e.target.value)}
  className="rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white"
>
  {(isFlagFootball
    ? FLAG_FOOTBALL_SHORTS
    : SHORTS_STYLES
  ).map((style) => (
    <option key={style} value={style}>
      {style}
    </option>
  ))}
</select>

            <select
              value={hood}
              onChange={(e) => setHood(e.target.value)}
              className="rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white"
            >
              {HOOD_OPTIONS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
  value={material}
  onChange={(e) => setMaterial(e.target.value)}
  className="rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white"
>
  <option value="">Material</option>

  {FLAG_FOOTBALL_MATERIALS.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ))}
</select>

<select
  value={topStyle}
  onChange={(e) => setTopStyle(e.target.value)}
  className="rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white"
>
  <option value="">Top Style</option>

  {FLAG_FOOTBALL_TOP_STYLES.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ))}
</select>

<select
  value={joggerSize}
  onChange={(e) => setJoggerSize(e.target.value)}
  className="rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white"
>
  <option value="">Jogger Size</option>

  {JOGGER_SIZES.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ))}
</select>

            <textarea
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              placeholder="Special Request"
              rows={4}
              className="md:col-span-2 rounded-xl border border-gray-700 bg-[#111] px-4 py-3 text-white"
            />

            <div className="flex gap-3 md:col-span-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-gray-700 py-3 font-semibold text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-400 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <OrderSheetStatusModal
        isOpen={modalOpen}
        type={modalType}
        title={modalTitle}
        message={modalMessage}
        onClose={() => {
          setModalOpen(false);

          if (modalType === "success") {
            onSuccess();
          }
        }}
      />
    </>
  );
}