import * as XLSX from "xlsx";

export function exportPlayersExcel(
  players: any[],
  teamName: string
) {

  const data = players.map((player, index) => ({
    "#": index + 1,
    "Player Number": player.player_number,
    "Player Name": player.player_name,
    "Top Size": player.top_size,
    "Bottom Size": player.bottom_size,
    "Shorts Style": player.shorts_style,
    "Hood": player.hood,
    "Special Request": player.special_request || "-",
  }));


  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Players"
  );


  XLSX.writeFile(
    workbook,
    `${teamName}-players.xlsx`
  );
}