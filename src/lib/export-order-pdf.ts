import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export async function exportOrderPDF(
  teamName: string,
  orderCode: string,
  category: string,
  players: any[]
) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  doc.setFontSize(20);
  doc.text("ZASHAM ENTERPRISES", 14, 15);

  doc.setFontSize(12);
  doc.text(`Team: ${teamName}`, 14, 25);
  doc.text(`Order Code: ${orderCode}`, 14, 32);

  const isFlagFootball = category === "Flag Football";

  const rows = players.map((player, index) =>
    isFlagFootball
      ? [
          index + 1,
          player.player_number,
          player.player_name,
          player.material || "-",
          player.top_style || "-",
          player.top_size,
          player.bottom_size,
          player.shorts_style,
          player.jogger_size || "-",
          player.hood,
          player.special_request || "-",
        ]
      : [
          index + 1,
          player.player_number,
          player.player_name,
          player.top_size,
          player.bottom_size,
          player.shorts_style,
          player.hood,
          player.special_request || "-",
        ]
  );

  autoTable(doc, {
    startY: 40,

    head: [
      isFlagFootball
        ? [
            "#",
            "No",
            "Player",
            "Material",
            "Top Style",
            "Top",
            "Bottom",
            "Shorts",
            "Jogger",
            "Hood",
            "Request",
          ]
        : [
            "#",
            "No",
            "Player",
            "Top",
            "Bottom",
            "Shorts",
            "Hood",
            "Request",
          ],
    ],

    body: rows,

    theme: "grid",

    styles: {
      fontSize: 7,
      cellPadding: 2,
    },

    headStyles: {
      fillColor: [212, 175, 55],
      textColor: [0, 0, 0],
      fontStyle: "bold",
    },
  });

  const pdfBlob = doc.output("blob");

  doc.save(`${teamName}-Order-Sheet.pdf`);

  const formData = new FormData();

  formData.append(
    "file",
    pdfBlob,
    `${teamName}-Order-Sheet.pdf`
  );

  formData.append("teamName", teamName);

  await fetch("/api/order-sheet/pdf", {
    method: "POST",
    body: formData,
  });

  return pdfBlob;
}