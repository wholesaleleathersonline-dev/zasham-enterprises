"use client";

type Player = {
  number: string;
  playerName: string;
  topSize: string;
  bottomSize: string;
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

      {/* Order Information */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs text-white/35">Team</p>
          <p className="mt-1 font-medium text-white">
            {teamName || "Not found"}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs text-white/35">Order Code</p>
          <p className="mt-1 font-medium text-white">
            {orderCode || "Not found"}
          </p>
        </div>
      </div>

      {/* Player Table */}
      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="grid grid-cols-[70px_1fr_90px_100px] bg-white/[0.04] px-4 py-3 text-xs uppercase tracking-wider text-white/35">
          <span>No.</span>
          <span>Player</span>
          <span>Top</span>
          <span>Bottom</span>
        </div>

        {players.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-white/35">
            No players found.
          </div>
        ) : (
          players.map((player) => (
            <div
              key={`${player.number}-${player.playerName}`}
              className="grid grid-cols-[70px_1fr_90px_100px] border-t border-white/10 px-4 py-3 text-sm"
            >
              <span className="text-white/40">
                {player.number}
              </span>

              <span className="font-medium text-white">
                {player.playerName}
              </span>

              <span className="text-white/70">
                {player.topSize}
              </span>

              <span className="text-white/70">
                {player.bottomSize}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}