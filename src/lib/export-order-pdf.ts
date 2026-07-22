import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportOrderPDF(
  teamName: string,
  orderCode: string,
  players: any[]
) {

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });


  doc.setFontSize(20);
  doc.text(
    "ZASHAM ENTERPRISES",
    14,
    15
  );


  doc.setFontSize(12);

  doc.text(
    `Team: ${teamName}`,
    14,
    25
  );

  doc.text(
    `Order Code: ${orderCode}`,
    14,
    32
  );


  const rows = players.map((player, index) => [
    index + 1,
    player.player_number,
    player.player_name,
    player.top_size,
    player.bottom_size,
    player.shorts_style,
    player.hood,
    player.special_request || "-"
  ]);


  autoTable(doc, {
    startY: 40,

    head: [
      [
        "#",
        "No",
        "Player Name",
        "Top",
        "Bottom",
        "Shorts",
        "Hood",
        "Request"
      ]
    ],

    body: rows,

    styles:{
      fontSize:8
    }
  });


  doc.save(
    `${teamName}-Order-Sheet.pdf`
  );
}