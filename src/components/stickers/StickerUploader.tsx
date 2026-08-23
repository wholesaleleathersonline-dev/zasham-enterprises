"use client";

import { useState } from "react";
import StickerPreview from "./StickerPreview";
import StickerDataPreview from "./StickerDataPreview";
import A4StickerSheet from "./A4StickerSheet";

type Player = {
  id?: string | number;
  number: string;
  playerName: string;
  topSize: string;
  bottomSize: string;
  joggerSize: string;
  jerseyStyle: string;
  material: string;
  hood: string;
};

type OrderResult = {
  orderCode: string;
  teamName: string;
  fileName?: string | null;
  totalPlayers: number;
  createdAt?: string;
  players: Player[];
};

type ApiResponse = {
  success: boolean;
  order?: OrderResult;
  error?: string;
};

export default function StickerUploader() {
  const [orderCode, setOrderCode] = useState("");

  const [result, setResult] =
    useState<OrderResult | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==========================================
  // FETCH ORDER BY ORDER CODE
  // ==========================================

  const fetchOrder = async () => {
    const code = orderCode.trim();

    if (!code) {
      setError("Please enter an order code.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setResult(null);

const response = await fetch(
  `/api/stickers/order-sheet/${encodeURIComponent(
    code
  )}`,
  {
    method: "GET",
    cache: "no-store",
  }
);
      const data =
        (await response.json()) as ApiResponse;

      if (
        !response.ok ||
        !data.success ||
        !data.order
      ) {
        throw new Error(
          data.error ||
            "Sticker order not found."
        );
      }

      setResult(data.order);
    } catch (error) {
      console.error(
        "Fetch sticker order error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch sticker order."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // ENTER KEY
  // ==========================================

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchOrder();
    }
  };

  // ==========================================
  // CLEAR
  // ==========================================

  const clearOrder = () => {
    setOrderCode("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-none space-y-6">

      {/* ======================================
          ORDER CODE SEARCH
      ====================================== */}

      <div
        className="
          rounded-2xl
          border
          border-white/10
          bg-white/[0.03]
          p-6
        "
      >
        <div className="mb-5">
          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-[0.18em]
              text-yellow-500
            "
          >
            Sticker Generator
          </p>

          <h2
            className="
              mt-1
              text-xl
              font-semibold
              text-white
            "
          >
            Generate From Order Code
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-white/40
            "
          >
            Enter the order code to fetch
            the complete order and all
            players from the database.
          </p>
        </div>

        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
          "
        >
          <input
            type="text"
            value={orderCode}
            onChange={(event) =>
              setOrderCode(event.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Enter Order Code"
            className="
              h-12
              min-w-0
              flex-1
              rounded-xl
              border
              border-white/10
              bg-black/30
              px-4
              text-sm
              uppercase
              text-white
              outline-none
              placeholder:text-white/25
              focus:border-yellow-500/50
            "
          />

          <button
            type="button"
            onClick={fetchOrder}
            disabled={isLoading}
            className="
              h-12
              rounded-xl
              bg-yellow-500
              px-7
              text-sm
              font-semibold
              text-black
              transition
              hover:bg-yellow-400
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            {isLoading
              ? "Fetching..."
              : "Fetch Order"}
          </button>
        </div>
      </div>

      {/* ======================================
          ERROR
      ====================================== */}

      {error && (
        <div
          className="
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            px-4
            py-3
            text-sm
            text-red-400
          "
        >
          {error}
        </div>
      )}

      {/* ======================================
          ORDER RESULT
      ====================================== */}

      {result && (
        <div className="space-y-6">

          {/* ==================================
              ORDER HEADER
          ================================== */}

          <div
            className="
              rounded-2xl
              border
              border-yellow-500/20
              bg-yellow-500/[0.03]
              p-5
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.18em]
                    text-yellow-500
                  "
                >
                  Order Found
                </p>

                <h3
                  className="
                    mt-1
                    text-2xl
                    font-semibold
                    uppercase
                    text-white
                  "
                >
                  {result.teamName ||
                    "Unknown Team"}
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-white/40
                  "
                >
                  Order Code:{" "}
                  <span className="font-semibold text-white/70">
                    {result.orderCode}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">

                <div
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    px-5
                    py-3
                    text-center
                  "
                >
                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-wider
                      text-white/35
                    "
                  >
                    Players
                  </p>

                  <p
                    className="
                      mt-1
                      text-2xl
                      font-semibold
                      text-white
                    "
                  >
                    {result.players.length}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearOrder}
                  className="
                    rounded-xl
                    border
                    border-white/10
                    px-4
                    py-3
                    text-sm
                    text-white/50
                    transition
                    hover:border-red-500/30
                    hover:text-red-400
                  "
                >
                  Clear
                </button>

              </div>
            </div>
          </div>

          {/* ==================================
              PLAYERS DATA
          ================================== */}

          {result.players.length > 0 ? (
            <StickerDataPreview
              teamName={result.teamName}
              orderCode={result.orderCode}
              players={result.players}
            />
          ) : (
            <div
              className="
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-4
                py-4
                text-sm
                text-red-400
              "
            >
              This order exists, but no players
              were found in the database.
            </div>
          )}

          {/* ==================================
              INDIVIDUAL PREVIEWS
          ================================== */}

          {result.players.length > 0 && (
            <div className="space-y-5">

              <div>
                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.18em]
                    text-yellow-500
                  "
                >
                  Sticker Previews
                </p>

                <h3
                  className="
                    mt-1
                    text-xl
                    font-semibold
                    text-white
                  "
                >
                  {result.players.length}
                  {" "}
                  Individual Stickers
                </h3>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-6
                  xl:grid-cols-3
                "
              >
                {result.players.map(
                  (player, index) => (
                   <StickerPreview
  key={
    player.id ??
    `${player.number}-${index}`
  }
  teamName={
    result.teamName
  }
  playerName={
    player.playerName
  }
  topSize={
    player.topSize
  }
  bottomSize={
    player.bottomSize
  }
  joggerSize={
    player.joggerSize
  }
  jerseyStyle={
    player.jerseyStyle
  }
  material={
    player.material
  }
  hood={
    player.hood
  }
/>
                  )
                )}
              </div>
            </div>
          )}

          {/* ==================================
              A4 STICKER SHEET
          ================================== */}

          {result.players.length > 0 && (
            <A4StickerSheet
              orderCode={
                result.orderCode
              }
              teamName={
                result.teamName
              }
              players={
                result.players
              }
            />
          )}

        </div>
      )}

    </div>
  );
}