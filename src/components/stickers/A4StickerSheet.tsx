"use client";

import PrintSticker from "./PrintSticker";

type Player = {
  number: string;
  playerName: string;
  topSize: string;
  bottomSize: string;
};

type A4StickerSheetProps = {
  teamName: string;
  players: Player[];
};

export default function A4StickerSheet({
  teamName,
  players,
}: A4StickerSheetProps) {
  const pages: Player[][] = [];

  for (let i = 0; i < players.length; i += 9) {
    pages.push(players.slice(i, i + 9));
  }

  const printStickers = () => {
    const printWindow = window.open("", "_blank", "width=1200,height=800");

    if (!printWindow) {
      alert("Please allow popups for this website.");
      return;
    }

    const pagesHTML = pages
      .map(
        (pagePlayers) => `
          <div class="page">
            <div class="grid">
              ${pagePlayers
                .map(
                  (player) => `
                    <div class="slot">
                      <div class="sticker">

                        <div class="logo-wrap">
                          <img
                            src="/logo/logo2.png"
                            alt="Zasham Enterprises"
                          />
                        </div>

                        <div class="team">
                          ${escapeHtml(teamName || "TEAM NAME")}
                        </div>

                        <div class="player">
                          ${escapeHtml(player.playerName || "")}
                        </div>

                        <div class="sizes">

                          <div class="size-box">
                            TOP:
                            <span>${escapeHtml(
                              player.topSize || "-"
                            )}</span>
                          </div>

                          <div class="size-box">
                            BOTTOM:
                            <span>${escapeHtml(
                              player.bottomSize || "-"
                            )}</span>
                          </div>

                        </div>

                        <div class="contact">

                          <div>
                            Instagram: @zashamenterprises
                            &nbsp;|&nbsp;
                            Facebook: Zasham Sportswear
                          </div>

                          <div>
                            info@zashamenterprises.com
                          </div>

                          <div>
                            www.zashamenterprises.com
                          </div>

                        </div>

                      </div>
                    </div>
                  `
                )
                .join("")}
            </div>
          </div>
        `
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>

      <html>
        <head>

          <title>
            Zasham Stickers - ${escapeHtml(teamName || "Order")}
          </title>

          <style>

            * {
              box-sizing: border-box;
            }

            html,
            body {
              margin: 0;
              padding: 0;
              background: white;
            }

            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            @page {
              size: A4 landscape;
              margin: 0;
            }

            .page {
              width: 297mm;
              height: 210mm;

              display: flex;
              align-items: center;
              justify-content: center;

              page-break-after: always;
              break-after: page;
            }

            .page:last-child {
              page-break-after: auto;
              break-after: auto;
            }

            .grid {
              width: 273.8mm;
              height: 196mm;

              display: grid;

              grid-template-columns:
                repeat(3, 88.9mm);

              grid-template-rows:
                repeat(3, 63.5mm);

              column-gap: 3mm;
              row-gap: 3mm;
            }

            .slot {
              width: 88.9mm;
              height: 63.5mm;

              display: flex;
              align-items: center;
              justify-content: center;
            }

            .sticker {
              width: 88.9mm;
              height: 63.5mm;

              background: #e5a812;

              padding: 3mm 5mm;

              display: flex;
              flex-direction: column;
              align-items: center;

              text-align: center;

              overflow: hidden;

              border-radius: 2mm;

              color: #000;

              font-family:
                Arial,
                Helvetica,
                sans-serif;
            }

            .logo-wrap {
              width: 12mm;
              height: 12mm;

              margin-bottom: 1.5mm;

              display: flex;
              align-items: center;
              justify-content: center;
            }

            .logo-wrap img {
              width: 12mm;
              height: 12mm;

              object-fit: contain;

              display: block;
            }

            .team {
              margin-top: 1.5mm;

              width: 100%;

              font-size: 15px;
              line-height: 1.1;

              font-weight: 600;

              text-transform: uppercase;

              overflow: hidden;

              white-space: nowrap;

              text-overflow: ellipsis;
            }

            .player {
              margin-top: 1.5mm;

              width: 100%;

              font-size: 20px;
              line-height: 1.1;

              font-weight: 900;

              text-transform: uppercase;

              overflow: hidden;

              white-space: nowrap;

              text-overflow: ellipsis;
            }

            .sizes {
              margin-top: 3mm;

              display: flex;

              gap: 2mm;
            }

            .size-box {
              border: 1px solid #000;

              border-radius: 1mm;

              padding: 1mm 2.5mm;

              font-size: 12px;

              line-height: 1.2;

              font-weight: 600;

              white-space: nowrap;
            }

            .size-box span {
              font-weight: 700;
            }

            .contact {
              margin-top: auto;

              width: 100%;

              font-size: 10px;

              line-height: 1.6;

              font-weight: 500;
            }

            .contact div {
              margin-top: 0.5mm;
            }

            @media print {

              html,
              body {
                width: 297mm;
                height: auto;

                margin: 0;
                padding: 0;

                background: white;
              }

            }

          </style>

        </head>

        <body>

          ${pagesHTML}

          <script>

            window.addEventListener("load", function () {

              setTimeout(function () {

                window.focus();

                window.print();

              }, 700);

            });

          </script>

        </body>

      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="mt-8 space-y-8">

      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-yellow-500">
            A4 Print Sheets
          </p>

          <h3 className="mt-1 text-xl font-semibold text-white">
            {players.length} Stickers
          </h3>

          <p className="mt-1 text-sm text-white/40">
            9 stickers per A4 landscape page
          </p>
        </div>

        <button
          type="button"
          onClick={printStickers}
          className="
            rounded-xl
            bg-yellow-500
            px-5
            py-3
            text-sm
            font-semibold
            text-black
            transition
            hover:bg-yellow-400
          "
        >
          🖨 Print / Save A4 PDF
        </button>
      </div>

      {/* Existing Screen Preview */}
      <div className="space-y-8">

        {pages.map((pagePlayers, pageIndex) => (
          <div key={pageIndex}>

            <p className="mb-3 text-xs uppercase tracking-[0.15em] text-white/40">
              Page {pageIndex + 1}
            </p>

            <div
              className="
                a4-sticker-page
                mx-auto
                grid
                grid-cols-3
                grid-rows-3
                overflow-hidden
                bg-white
                shadow-2xl
              "
            >
              {pagePlayers.map((player) => (
                <div
                  key={`${player.number}-${player.playerName}`}
                  className="a4-sticker-slot flex items-center justify-center"
                >
                  <PrintSticker
                    teamName={teamName}
                    playerName={player.playerName}
                    topSize={player.topSize}
                    bottomSize={player.bottomSize}
                  />
                </div>
              ))}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}


/* Prevent HTML injection / broken markup */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}