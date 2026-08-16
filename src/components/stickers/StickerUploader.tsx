"use client";

import { useRef, useState } from "react";
import StickerPreview from "./StickerPreview";
import StickerDataPreview from "./StickerDataPreview";
import A4StickerSheet from "./A4StickerSheet";

type Player = {
  number: string;
  playerName: string;
  topSize: string;
  bottomSize: string;
};

type ParsedResult = {
  fileName: string;
  teamName: string;
  orderCode: string;
  players: Player[];
  totalPlayers: number;
};

export default function StickerUploader() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ParsedResult | null>(null);
  const [isSaving, setIsSaving] = useState(false);
const [saveMessage, setSaveMessage] = useState("");
const [saveError, setSaveError] = useState("");

  const handleFile = (selectedFile: File | undefined) => {
    if (!selectedFile) return;

    setError("");
    setResult(null);

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    handleFile(event.dataTransfer.files?.[0]);
  };

  const removeFile = () => {
    setFile(null);
    setResult(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const generateStickers = async () => {
    if (!file) return;

    try {
      setIsParsing(true);
      setError("");
      setResult(null);

      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/stickers/parse-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to parse PDF.");
      }

      setResult(data);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while reading the PDF."
      );
    } finally {
      setIsParsing(false);
    }
  };

  const saveOrder = async () => {
  if (!result) return;

  try {
    setIsSaving(true);
    setSaveMessage("");
    setSaveError("");

    const response = await fetch("/api/stickers/save-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderCode: result.orderCode,
        teamName: result.teamName,
        fileName: result.fileName,
        players: result.players,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.error || "Failed to save sticker order."
      );
    }

    setSaveMessage(
      `Order ${data.orderCode} saved successfully with ${data.totalPlayers} players.`
    );
  } catch (error) {
    console.error(error);

    setSaveError(
      error instanceof Error
        ? error.message
        : "Something went wrong while saving the order."
    );
  } finally {
    setIsSaving(false);
  }
};

return (
  <div className="w-full max-w-none space-y-6">
      {/* Upload Area */}
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-2xl border border-dashed p-10 text-center transition-all duration-200 ${
          isDragging
            ? "border-yellow-500 bg-yellow-500/10"
            : "border-white/15 bg-white/[0.03] hover:border-yellow-500/50 hover:bg-white/[0.05]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(event) =>
            handleFile(event.target.files?.[0])
          }
        />

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-yellow-500/20 bg-yellow-500/10">
          <svg
            className="h-7 w-7 text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 16V4m0 0L8 8m4-4 4 4M5 20h14"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-white">
          Upload Order Sheet PDF
        </h3>

        <p className="mt-2 text-sm text-white/45">
          Drag & drop your PDF here or click to browse
        </p>

        <p className="mt-3 text-xs text-white/30">
          PDF files only
        </p>
      </div>

      {/* Selected File */}
      {file && (
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-xs font-bold text-red-400">
              PDF
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {file.name}
              </p>

              <p className="mt-1 text-xs text-white/40">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              removeFile();
            }}
            className="ml-4 rounded-lg px-3 py-2 text-xs text-red-400 transition hover:bg-red-500/10"
          >
            Remove
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Generate */}
      <button
        type="button"
        onClick={generateStickers}
        disabled={!file || isParsing}
        className="w-full rounded-xl bg-yellow-500 px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-30"
      >
        {isParsing ? "Reading PDF..." : "Generate Stickers"}
      </button>

      {/* Parsed Result */}
     {result && (
  <div className="space-y-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.03] p-5">

    {/* Success Header */}
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-yellow-500">
          PDF Parsed Successfully
        </p>

        <h3 className="mt-1 text-xl font-semibold text-white">
          {result.teamName || "Unknown Team"}
        </h3>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-right">
        <p className="text-[10px] uppercase text-white/35">
          Players
        </p>

        <p className="text-lg font-semibold text-white">
          {result.totalPlayers}
        </p>
      </div>
    </div>

    {/* Extracted Data */}
    <StickerDataPreview
      teamName={result.teamName}
      orderCode={result.orderCode}
      players={result.players}
    />

    {/* Save Order */}
<div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.04] p-4">

  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-yellow-500">
        Order Database
      </p>

      <p className="mt-1 text-sm text-white/60">
        Save this order and its player data to the database.
      </p>
    </div>

    <button
      type="button"
      onClick={saveOrder}
      disabled={isSaving}
      className="
        shrink-0
        rounded-xl
        bg-yellow-500
        px-6
        py-3
        text-sm
        font-semibold
        text-black
        transition
        hover:bg-yellow-400
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {isSaving ? "Saving Order..." : "💾 Save Order"}
    </button>

  </div>

  {/* Success */}
  {saveMessage && (
    <div className="mt-4 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
      ✓ {saveMessage}
    </div>
  )}

  {/* Error */}
  {saveError && (
    <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
      {saveError}
    </div>
  )}

</div>

    {/* Individual Sticker Preview */}
  {result.players.length > 0 && (
  <div className="space-y-5">
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-yellow-500">
        Sticker Previews
      </p>

      <h3 className="mt-1 text-xl font-semibold text-white">
        {result.totalPlayers} Individual Stickers
      </h3>
    </div>

<div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
  {result.players.map((player) => (
    <StickerPreview
      key={`${player.number}-${player.playerName}`}
      teamName={result.teamName}
      playerName={player.playerName}
      topSize={player.topSize}
      bottomSize={player.bottomSize}
    />
  ))}
</div>
  </div>
)}
{result.players.length > 0 && (
  <A4StickerSheet
    teamName={result.teamName}
    players={result.players}
  />
)}

  </div>
)}

      
    </div>
  );
}