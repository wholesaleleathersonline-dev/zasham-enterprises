import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { PriceListItem } from "../../services/admin/price-list.service";

export async function generatePriceListPdf(
  items: PriceListItem[]
) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

const gold: [number, number, number] = [255, 255, 0]; // C0 M0 Y100 K0
const dark: [number, number, number] = [0, 0, 0]; // C0 M0 Y0 K100

const lightGray: [number, number, number] = [230, 230, 230]; // C0 M0 Y0 K10
const border: [number, number, number] = [204, 204, 204]; // C0 M0 Y0 K20

  // =========================
  // HEADER
  // =========================

  doc.setFillColor(...dark);
  doc.rect(0, 0, pageWidth, 38, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(21);

  doc.text(
    "ZASHAM ENTERPRISES",
    pageWidth / 2,
    14,
    {
      align: "center",
    }
  );

  doc.setTextColor(...gold);
  doc.setFontSize(10);

  doc.text(
    "FACTORY DIRECT PRICE LIST",
    pageWidth / 2,
    21,
    {
      align: "center",
    }
  );

  doc.setTextColor(205, 205, 205);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  doc.text(
    "Custom Sportswear • Team Uniforms • Apparel • Accessories",
    pageWidth / 2,
    27,
    {
      align: "center",
    }
  );

  doc.setDrawColor(...gold);
  doc.setLineWidth(0.8);

  doc.line(
    15,
    33,
    pageWidth - 15,
    33
  );

  // =========================
  // GROUP PRODUCTS
  // =========================

  const sections = [
    "Team Uniforms",
    "Team Apparel",
    "Team Accessories",
  ];

  let currentY = 46;


sections.forEach((section) => {
  const sectionItems = items.filter(
    (item) => item.section === section
  );

  if (sectionItems.length === 0) {
    return;
  }

  // Keep category heading together with the table.
  // If there isn't enough room near the bottom,
  // start the category on a fresh page.
  const minimumSpaceNeeded = 45;

  if (currentY > pageHeight - minimumSpaceNeeded) {
    doc.addPage();
    currentY = 46;
  }

  // =========================
  // SECTION HEADER
  // =========================

  doc.setFillColor(...gold);

  doc.roundedRect(
    10,
    currentY,
    pageWidth - 20,
    8,
    1.5,
    1.5,
    "F"
  );

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);

  doc.text(
    section.toUpperCase(),
    15,
    currentY + 5.5
  );

  currentY += 10;

  // =========================
  // TABLE
  // =========================

  const body = sectionItems.map((item) => [
    item.item_name,
    String(item.moq),
    item.price,
  ]);

  autoTable(doc, {
    startY: currentY,

    head: [
      [
        "PRODUCT",
        "MOQ",
        "PRICE",
      ],
    ],

    body,

    theme: "grid",

    margin: {
      left: 10,
      right: 10,
      top: 42,
      bottom: 15,
    },

    styles: {
      font: "helvetica",
      fontSize: 8.5,
      cellPadding: {
        top: 2.2,
        bottom: 2.2,
        left: 3,
        right: 3,
      },
      lineWidth: 0.15,
      lineColor: border,
      textColor: [35, 35, 35],
      valign: "middle",
      overflow: "linebreak",
    },

    headStyles: {
      fillColor: dark,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 8,
      halign: "left",
      lineColor: dark,
      lineWidth: 0.2,
    },

    alternateRowStyles: {
      fillColor: lightGray,
    },

    columnStyles: {
      0: {
        cellWidth: 112,
        halign: "left",
      },

      1: {
        cellWidth: 25,
        halign: "center",
      },

      2: {
  cellWidth: 43,
  halign: "right",
  fontStyle: "bold",
  textColor: [0, 0, 0],
},
    },

    didDrawPage: () => {
      doc.setDrawColor(...gold);
      doc.setLineWidth(0.3);

      doc.line(
        10,
        pageHeight - 11,
        pageWidth - 10,
        pageHeight - 11
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(110, 110, 110);

      doc.text(
        "www.zashamenterprises.com",
        10,
        pageHeight - 6
      );

      doc.text(
        "ZASHAM ENTERPRISES",
        pageWidth / 2,
        pageHeight - 6,
        {
          align: "center",
        }
      );

      doc.text(
        `Page ${doc.getCurrentPageInfo().pageNumber}`,
        pageWidth - 10,
        pageHeight - 6,
        {
          align: "right",
        }
      );
    },
  });

  currentY =
    (doc as any).lastAutoTable.finalY + 12;
});

  // =========================
  // GENERATED DATE
  // =========================

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);

  doc.text(
    `Generated: ${new Date().toLocaleDateString()}`,
    pageWidth - 10,
    pageHeight - 15,
    {
      align: "right",
    }
  );

  // =========================
  // DOWNLOAD
  // =========================

  doc.save("ZASHAM-PRICE-LIST-V2.pdf");
}