
"use client";


interface Props {
  players: any[];
  isCaptain?: boolean;
  onEdit?: (player: any) => void;
  onDelete?: (player: any) => void;
}

export default function PlayersList({
  players,
  isCaptain = false,
  onEdit,
  onDelete,
}: Props) {
  console.log("Captain Mode:", isCaptain);
  
  return (
    <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-[#181818] p-6">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-yellow-400">
          Team Players
        </h2>

        <span className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-bold text-black">
          {players.length} Players
        </span>
      </div>

      {players.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-700 p-10 text-center text-gray-400">
          No player has joined yet.
        </div>
      ) : (
        <>
          {/* Desktop */}

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full">

              <thead>

                <tr className="border-b border-yellow-500/30 text-left text-yellow-400">

                  <th className="p-3">#</th>
                  <th className="p-3">Player No</th>
                  <th className="p-3">Player Name</th>
                  <th className="p-3">Top</th>
                  <th className="p-3">Bottom</th>
                  <th className="p-3">Shorts</th>
                  <th className="p-3">Hood</th>
                  <th className="p-3">Special Request</th>

{isCaptain && (
  <th className="p-3 text-center">
    Actions
  </th>
)}
                 

                </tr>

              </thead>

              <tbody>

                {players.map((player, index) => (

                  <tr
                    key={player.id}
                    className="border-b border-gray-800 text-white"
                  >

                    <td className="p-3">{index + 1}</td>

                    <td className="p-3">
                      {player.player_number}
                    </td>

                    <td className="p-3">
                      {player.player_name}
                    </td>

                    <td className="p-3">
                      {player.top_size}
                    </td>

                    <td className="p-3">
                      {player.bottom_size}
                    </td>

                    <td className="p-3">
                      {player.shorts_style}
                    </td>

                    <td className="p-3">
                      {player.hood}
                    </td>

                    <td className="p-3">
                      {player.special_request || "-"}
                    </td>




                    <td className="p-3">

                      {isCaptain && (
  <div className="flex justify-center gap-2">
   <button
  onClick={() => onEdit?.(player)}
  className="rounded-lg border border-yellow-500/30 px-3 py-1 text-xs font-semibold text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
>
  Edit
</button>

   <button
  onClick={() => onDelete?.(player)}
  className="rounded-lg border border-red-500/30 px-3 py-1 text-xs font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
>
  Delete
</button>
  </div>
                      )}
</td>

                  </tr>

                ))}

              </tbody>

            </table>
          </div>

          {/* Mobile */}

          <div className="space-y-4 lg:hidden">

            {players.map((player, index) => (

              <div
                key={player.id}
                className="rounded-xl border border-gray-700 bg-[#111] p-5"
              >

                <div className="mb-3 flex items-center justify-between">

                  <h3 className="font-bold text-yellow-400">
                    Player {index + 1}
                  </h3>

                  <span className="rounded bg-yellow-500 px-3 py-1 text-sm font-bold text-black">
                    #{player.player_number}
                  </span>

                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">

                  <div>
                    <p className="text-gray-400">Name</p>
                    <p className="text-white">
                      {player.player_name}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Top Size</p>
                    <p className="text-white">
                      {player.top_size}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Bottom Size</p>
                    <p className="text-white">
                      {player.bottom_size}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Shorts</p>
                    <p className="text-white">
                      {player.shorts_style}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Hood</p>
                    <p className="text-white">
                      {player.hood}
                    </p>
                  </div>

                </div>

                {player.special_request && (
                  <div className="mt-4">

                    <p className="text-gray-400">
                      Special Request
                    </p>

                    <p className="text-white">
                      {player.special_request}
                    </p>

                  </div>
                )}

{isCaptain && (
  <div className="mt-5 flex gap-3">

    <button
      onClick={() => onEdit?.(player)}
      className="flex-1 rounded-xl border border-yellow-500/30 py-2 text-sm font-semibold text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
    >
      Edit
    </button>

    <button
      onClick={() => onDelete?.(player)}
      className="flex-1 rounded-xl border border-red-500/30 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
    >
      Delete
    </button>

  </div>
)}  



{isCaptain && (
                <div className="mt-5 flex gap-3">
  <button
    className="flex-1 rounded-xl border border-yellow-500/30 py-2 text-sm font-semibold text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
  >
    Edit
  </button>

  <button
    className="flex-1 rounded-xl border border-red-500/30 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
  >
    Delete
  </button>
</div>
)}

              </div>

            ))}

          </div>
        </>
      )}

    </div>
  );
}