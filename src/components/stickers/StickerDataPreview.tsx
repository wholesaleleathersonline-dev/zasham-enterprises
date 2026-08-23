"use client";

type Player = {
  number: string;
  playerName: string;
  topSize: string;
  bottomSize: string;
  joggerSize: string;
  jerseyStyle: string;
  material: string;
  hood: string;
};

type StickerDataPreviewProps = {
  teamName: string;
  orderCode: string;
  players: Player[];
};

export default function StickerDataPreview({
  teamName,
  orderCode,
  players,
}: StickerDataPreviewProps) {
  return (
    <div className="space-y-5">
      {/* ==============================
          HEADER
      ============================== */}

      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-yellow-500">
          Sticker Data
        </p>

        <h3 className="mt-1 text-xl font-semibold text-white">
          Extracted Players
        </h3>

        <p className="mt-1 text-sm text-white/40">
          {players.length} player{players.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* ==============================
          ORDER INFORMATION
      ============================== */}

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs text-white/35">
            Team
          </p>

          <p className="mt-1 font-medium text-white">
            {teamName || "Not found"}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs text-white/35">
            Order Code
          </p>

          <p className="mt-1 font-medium text-white">
            {orderCode || "Not found"}
          </p>
        </div>
      </div>

      {/* ==============================
          PLAYER TABLE
      ============================== */}

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <div className="min-w-[1000px]">

          {/* TABLE HEADER */}

          <div
            className="
              grid
              grid-cols-[70px_1.5fr_90px_100px_100px_130px_120px_100px]
              bg-white/[0.04]
              px-4
              py-3
              text-xs
              uppercase
              tracking-wider
              text-white/35
            "
          >
            <span>No.</span>

            <span>Player</span>

            <span>Top</span>

            <span>Bottom</span>

            <span>Jogger</span>

            <span>Jersey Style</span>

            <span>Material</span>

            <span>Hood</span>
          </div>

          {/* NO PLAYERS */}

          {players.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-white/35">
              No players found.
            </div>
          ) : (
            players.map((player, index) => (
              <div
                key={`${player.number}-${player.playerName}-${index}`}
                className="
                  grid
                  min-w-[1000px]
                  grid-cols-[70px_1.5fr_90px_100px_100px_130px_120px_100px]
                  border-t
                  border-white/10
                  px-4
                  py-3
                  text-sm
                "
              >
                {/* NUMBER */}

                <span className="text-white/40">
                  {player.number || "-"}
                </span>

                {/* PLAYER */}

                <span className="font-medium text-white">
                  {player.playerName || "-"}
                </span>

                {/* TOP */}

                <span className="text-white/70">
                  {player.topSize || "-"}
                </span>

                {/* BOTTOM */}

                <span className="text-white/70">
                  {player.bottomSize || "-"}
                </span>

                {/* JOGGER */}

                <span className="text-white/70">
                  {player.joggerSize || "-"}
                </span>

                {/* JERSEY STYLE */}

                <span className="text-white/70">
                  {player.jerseyStyle || "-"}
                </span>

                {/* MATERIAL */}

                <span className="text-white/70">
                  {player.material || "-"}
                </span>

                {/* HOOD */}

                <span className="text-white/70">
                  {player.hood || "-"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}