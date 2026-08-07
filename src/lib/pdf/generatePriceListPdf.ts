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

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);

  doc.text(
    "ZASHAM ENTERPRISES",
    pageWidth / 2,
    18,
    {
      align: "center",
    }
  );

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  doc.text(
    "FACTORY DIRECT PRICE LIST",
    pageWidth / 2,
    25,
    {
      align: "center",
    }
  );

  doc.text(
    `Generated: ${new Date().toLocaleDateString()}`,
    pageWidth / 2,
    31,
    {
      align: "center",
    }
  );

  const body = items.map((item) => [
    item.section,
    item.item_name,
    item.moq,
    item.price,
  ]);
  autoTable(doc, {
  startY: 38,

  head: [[
    "Category",
    "Item",
    "MOQ",
    "Price",
  ]],

  body,

  theme: "grid",

  margin: {
    top: 38,
    left: 8,
    right: 8,
    bottom: 12,
  },

  styles: {
    font: "helvetica",
    fontSize: 8.5,
    cellPadding: 1.6,
    lineWidth: 0.15,
    textColor: [30, 30, 30],
    lineColor: [190, 190, 190],
    overflow: "linebreak",
    valign: "middle",
  },

  headStyles: {
    fillColor: [200, 164, 77],
    textColor: [0, 0, 0],
    fontStyle: "bold",
    halign: "center",
  },

  columnStyles: {
    0: { cellWidth: 42 },
    1: { cellWidth: 90 },
    2: {
      cellWidth: 20,
      halign: "center",
    },
    3: {
      cellWidth: 30,
      halign: "right",
    },
  },

  didDrawPage: () => {
    const pageHeight =
      doc.internal.pageSize.getHeight();

    doc.setFontSize(8);

    doc.setTextColor(120);

    doc.text(
      "www.zashamenterprises.com",
      8,
      pageHeight - 5
    );

    doc.text(
      `Page ${doc.getCurrentPageInfo().pageNumber}`,
      pageWidth - 8,
      pageHeight - 5,
      {
        align: "right",
      }
    );
  },
});

doc.save("Zasham-Price-List.pdf");
}

  