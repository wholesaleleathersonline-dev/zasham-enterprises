"use client";

type A4StickerSheetProps = {
  orderCode?: string;
  teamName?: string;
  players?: Array<{ number?: string; playerName?: string; topSize?: string; bottomSize?: string; joggerSize?: string; jerseyStyle?: string; material?: string; hood?: string }>;
};

// ======================================================
// EXACT STICKER SIZE
// ======================================================

const STICKER_WIDTH = 60;
const STICKER_HEIGHT = 87.963;

// ======================================================
// STICKER OUTLINE + GAP
// ======================================================

const OUTLINE = 1;
const GAP = 1;

// ======================================================
// A4
// ======================================================

const A4_WIDTH = 210;
const A4_HEIGHT = 297;

// ======================================================
// LAYOUT
// ======================================================

const COLUMNS = 3;
const ROWS = 3;

const STICKERS_PER_PAGE = COLUMNS * ROWS;

// ======================================================
// CENTER CALCULATION
// ======================================================

const TOTAL_WIDTH =
  COLUMNS * STICKER_WIDTH +
  (COLUMNS - 1) * GAP;

const TOTAL_HEIGHT =
  ROWS * STICKER_HEIGHT +
  (ROWS - 1) * GAP;

const LEFT_MARGIN =
  (A4_WIDTH - TOTAL_WIDTH) / 2;

const TOP_MARGIN =
  (A4_HEIGHT - TOTAL_HEIGHT) / 2;

// ======================================================
// LEFT LOGO
// ======================================================

const LEFT_LOGO_SIZE = 16.65;

const LEFT_LOGO_TOP = 0;
const LEFT_LOGO_LEFT = 2;

// ======================================================
// TEAM NAME
// 5MM BELOW LEFT LOGO
// ======================================================

const TEAM_NAME_TOP =
  LEFT_LOGO_TOP +
  LEFT_LOGO_SIZE +
  0;

// ======================================================
// SOCIAL / CONTACT BLOCK
// ======================================================

const SOCIAL_TOP = 5;
const SOCIAL_RIGHT = 5;
const SOCIAL_GAP = 1;
const SOCIAL_FONT_SIZE = 12;
const WEBSITE_FONT_SIZE = 13;

// ======================================================
// COMPONENT
// ======================================================

export default function A4StickerSheet({
  orderCode,
  teamName,
  players,
}: A4StickerSheetProps) {

  // ====================================================
  // PAGE COUNT
  // ====================================================

  const pageCount = Math.max(
    1,
    Math.ceil(
      (players?.length || 0) /
        STICKERS_PER_PAGE
    )
  );

  // ====================================================
  // SAVE ORDER
  // Saves to the same API used by Sticker Orders.
  // ====================================================

  const handleSaveOrder = async () => {
    try {
      const response = await fetch(
        "/api/stickers/save-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderCode:
              orderCode?.trim() || "",
            teamName:
              teamName?.trim() || "",
            fileName: null,
            players:
              players || [],
          }),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.error ||
            "Failed to save sticker order."
        );
      }

      alert(
        `Order ${data.orderCode || orderCode || ""} saved successfully with ${data.totalPlayers ?? players?.length ?? 0} players.`
      );
    } catch (error) {
      console.error(
        "Save sticker order error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to save sticker order."
      );
    }
  };

  // ====================================================
  // PRINT / PDF
  // ====================================================

  const handlePrint = () => {
    const printWindow = window.open(
      "",
      "_blank",
      "width=900,height=1200"
    );

    if (!printWindow) {
      alert(
        "Please allow pop-ups for printing."
      );

      return;
    }

    // -----------------------------------------------
    // SAFE TEAM NAME FOR PRINT HTML
    // -----------------------------------------------

    const safeTeamName = String(
      teamName || "TEAM NAME"
    )
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    // =================================================
    // CREATE ALL A4 PAGES
    // =================================================

    let pagesHtml = "";

    for (
      let pageIndex = 0;
      pageIndex < pageCount;
      pageIndex++
    ) {
      let stickers = "";

      for (
        let index = 0;
        index < STICKERS_PER_PAGE;
        index++
      ) {
        const playerIndex =
          pageIndex *
            STICKERS_PER_PAGE +
          index;

        const player =
          players?.[playerIndex];

        // Do not render empty cards on the last page.
        if (!player) {
          continue;
        }

        const column =
          index % COLUMNS;

        const row =
          Math.floor(
            index / COLUMNS
          );

        const left =
          LEFT_MARGIN +
          column *
            (STICKER_WIDTH + GAP);

        const top =
          TOP_MARGIN +
          row *
            (STICKER_HEIGHT + GAP);

        const esc =
          (value?: string) =>
            String(value || "")
              .replace(
                /&/g,
                "&amp;"
              )
              .replace(
                /</g,
                "&lt;"
              )
              .replace(
                />/g,
                "&gt;"
              )
              .replace(
                /"/g,
                "&quot;"
              )
              .replace(
                /'/g,
                "&#039;"
              );

        const playerNumber =
          esc(player.number);

        const playerName =
          esc(player.playerName);

        const topSize =
          esc(player.topSize);

        const bottomSize =
          esc(player.bottomSize);

        const joggerSize =
          esc(player.joggerSize);

        const jerseyStyle =
          esc(player.jerseyStyle);

        const material =
          esc(player.material);

        const hood =
          esc(player.hood);

        stickers += `
          <div
            class="sticker"
            style="
              left:${left}mm;
              top:${top}mm;
            "
          >

            <img
              class="left-logo"
              src="/logo/ze-logo.png?v=1"
              alt=""
            />

            <div class="team-name">
              ${safeTeamName}
            </div>

            <div class="sticker-details">
              <div>${playerNumber}</div>
              <div>${playerName}</div>
              <div>TOP: ${topSize}</div>
              <div>BOTTOM: ${bottomSize}</div>
              <div>JOGGER: ${joggerSize}</div>
              <div>${jerseyStyle}</div>
              <div>${material}</div>
              <div>${hood}</div>
            </div>

            <div class="social-block">

              <div class="social-row">
                <svg
                  class="social-svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M14.2 8.1V6.8c0-.7.4-1.1 1.1-1.1h1.8V3.2c-.3 0-1.2-.2-2.2-.2-2.4 0-4 1.5-4 4.2v.9H8.3v2.8h2.6v9h3.3v-9h2.5l.4-2.8h-2.9Z"
                    fill="#111111"
                  />
                </svg>

                <span>
                  @zashamsportswear
                </span>
              </div>

              <div class="social-row">
                <svg
                  class="social-svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect
                    x="3.3"
                    y="3.3"
                    width="17.4"
                    height="17.4"
                    rx="5.2"
                    fill="none"
                    stroke="#111111"
                    stroke-width="1.9"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4.1"
                    fill="none"
                    stroke="#111111"
                    stroke-width="1.9"
                  />
                  <circle
                    cx="17.45"
                    cy="6.55"
                    r="1.25"
                    fill="#111111"
                  />
                </svg>

                <span>
                  @zashamenterprises
                </span>
              </div>

            </div>

            <div class="email-above-website">
              info@zashamenterprises.com
            </div>

            <div class="website">
              www.zashamenterprises.com
            </div>

          </div>
        `;
      }

      pagesHtml += `
        <div class="a4-page">
          ${stickers}
        </div>
      `;
    }

    // =================================================
    // PRINT DOCUMENT
    // =================================================

    printWindow.document.write(`
      <!DOCTYPE html>

      <html>

        <head>

          <meta charset="UTF-8" />

          <title>Sticker PDF</title>

          <style>

            /* =========================================
               GLOBAL RESET
            ========================================= */

            *,
            *::before,
            *::after {
              box-sizing: border-box;
            }

            html,
            body {

              margin: 0 !important;
              padding: 0 !important;

              width: 210mm;
              height: 297mm;

              background: #ffffff;
            }

            /* =========================================
               A4 PRINT SETTINGS
            ========================================= */

            @page {

              size: A4 portrait;

              margin: 0 !important;
            }

            body {

              -webkit-print-color-adjust: exact !important;

              print-color-adjust: exact !important;
            }

            /* =========================================
               A4 PAGE
            ========================================= */

            .a4-page {

              position: relative;

              width: 210mm;
              height: 297mm;

              margin: 0;
              padding: 0;

              background: #ffffff;

              overflow: visible;

              break-after: page;
              page-break-after: always;
            }

            .a4-page:last-child {
              break-after: auto;
              page-break-after: auto;
            }

            /* =========================================
               STICKER
            ========================================= */

            .sticker {

              position: absolute;

              width: 60mm;
              height: 87.963mm;

              margin: 0;
              padding: 0;

              background: #ffffff;

              border: 1mm solid #000000;

              box-sizing: border-box;

              overflow: visible;
            }

            /* =========================================
               LEFT LOGO
            ========================================= */

            .left-logo {

              position: absolute;

              top: 0mm;
              left: 0mm;

              width: 16.65mm;
              height: 16.65mm;

              object-fit: contain;

              object-position: center;

              display: block;

              margin: 0;
              padding: 0;

              z-index: 10;
            }

            /* =========================================
               TEAM NAME
            ========================================= */

            .team-name {

              position: absolute;

              top: ${TEAM_NAME_TOP}mm;

              left: 0mm;

              width: 100%;

              font-family:
                "Sportzan",
                Arial,
                sans-serif;

              font-size: 21.3px;

              line-height: 1.1;

              font-weight: 400;

              font-style: italic;

              color: #111111;

              text-align: center;

              text-transform: uppercase;

              /*
                Full team name show hoga.
                Ellipsis nahi hoga.
              */

              white-space: nowrap;

              overflow: visible;

              text-overflow: clip;

              margin: 0;

              padding: 0;

              z-index: 10;
            }

            /* =========================================
               PLAYER DETAILS
            ========================================= */

            .sticker-details {
  position: absolute;

  /* existing position same */
  top: calc(
    ${TEAM_NAME_TOP}mm
    + 22.2px
    + 1mm
  );

  left: 0mm;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: "Sportzan", Arial, sans-serif !important;
  font-size: 15px;
  line-height: 1;
  font-weight: 400;
  font-style: italic;

  color: #111111;
  text-align: center;
  white-space: nowrap;

  z-index: 10;
}

            .sticker-details > div + div {
              margin-top: 1mm;
            }

            .email-above-website {
              position: absolute;
              left: 0;
              bottom: calc(1mm + ${WEBSITE_FONT_SIZE}px + 1mm);
              width: 100%;
              text-align: center;
              font-family: Arial, sans-serif;
              font-size: ${SOCIAL_FONT_SIZE}px;
              line-height: 1;
              font-style: normal;
              font-weight: 400;
              color: #111111;
              white-space: nowrap;
              z-index: 20;
            }

            /* =========================================
               SOCIAL / CONTACT
            ========================================= */

            .social-block {
              position: absolute;
              top: ${SOCIAL_TOP}mm;
              right: ${SOCIAL_RIGHT}mm;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              font-family: Arial, sans-serif;
              font-size: ${SOCIAL_FONT_SIZE}px;
              line-height: 1;
              font-style: normal;
              font-weight: 500;
              color: #111111;
              white-space: nowrap;
              z-index: 20;
            }

            .social-svg {
              width: 3.2mm;
              height: 3.2mm;
              flex: 0 0 3.2mm;
              display: block;
            }

            .social-row {
              display: flex;
              align-items: center;
              gap: 1.2mm;
            }

            .social-row + .social-row {
              margin-top: ${SOCIAL_GAP}mm;
            }

            .social-icon {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 3.2mm;
              height: 3.2mm;
              font-family: Arial, sans-serif;
              font-size: 10.9px;
              font-weight: 700;
            }

            .website {
              position: absolute;
              left: 0;
              bottom: 1mm;
              width: 100%;
              text-align: center;
              font-family: Arial, sans-serif;
              font-size: ${WEBSITE_FONT_SIZE}px;
              line-height: 1;
              font-style: normal;
              font-weight: 400;
              color: #111111;
              white-space: nowrap;
              z-index: 20;
            }

            /* =========================================
               PRINT
            ========================================= */

            @media print {

              html,
              body {

                width: 210mm !important;

                height: 297mm !important;

                margin: 0 !important;

                padding: 0 !important;
              }

              .a4-page {

                width: 210mm !important;

                height: 297mm !important;

                margin: 0 !important;

                padding: 0 !important;
              }

              .sticker {

                overflow: visible !important;
              }

            }

          </style>

        </head>

        <body>

          ${pagesHtml}

          <script>

            window.addEventListener(
              "load",
              function () {

                setTimeout(
                  function () {

                    window.focus();

                    window.print();

                  },
                  500
                );

              }
            );

            window.addEventListener(
              "afterprint",
              function () {

                setTimeout(
                  function () {

                    window.close();

                  },
                  300
                );

              }
            );

          </script>

        </body>

      </html>
    `);

    printWindow.document.close();
  };

  // ====================================================
  // PREVIEW
  // ====================================================

  return (

    <div className="space-y-6">

      {/* ================================================
          HEADER
      ================================================ */}

      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
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
            Blank Sticker Size Test
          </p>

          <p
            className="
              mt-2
              text-sm
              text-white/50
            "
          >
            Sticker: 60 × 87.963 mm
          </p>

          <p
            className="
              mt-1
              text-xs
              text-white/30
            "
          >
            1mm outline • 1mm external gap • 3 × 3
          </p>

        </div>



      </div>

      {/* ================================================
          A4 PREVIEW
      ================================================ */}

      <div
        className="
          overflow-auto
          rounded-2xl
          border
          border-white/10
          bg-neutral-800
          p-5
        "
      >

        <div className="space-y-8">

          {Array.from({
            length: pageCount,
          }).map(
            (_, pageIndex) => (

              <div
                key={pageIndex}
                className="space-y-3"
              >

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.15em]
                    text-white/40
                  "
                >
                  Page {pageIndex + 1}
                </p>

                <div
                  className="
                    mx-auto
                    overflow-visible
                    bg-white
                    shadow-2xl
                  "
                  style={{
                    width: "210mm",
                    height: "297mm",
                    margin: 0,
                    padding: 0,
                  }}
                >

                  <div
                    style={{
                      position: "relative",
                      width: "210mm",
                      height: "297mm",
                      margin: 0,
                      padding: 0,
                      background: "#ffffff",
                      overflow: "visible",
                    }}
                  >

                    {Array.from({
                      length:
                        STICKERS_PER_PAGE,
                    }).map(
                      (_, index) => {

                        const playerIndex =
                          pageIndex *
                            STICKERS_PER_PAGE +
                          index;

                        const player =
                          players?.[
                            playerIndex
                          ];

                        if (!player) {
                          return null;
                        }

                        const column =
                          index % COLUMNS;

                        const row =
                          Math.floor(
                            index / COLUMNS
                          );

                        const left =
                          LEFT_MARGIN +
                          column *
                            (STICKER_WIDTH +
                              GAP);

                        const top =
                          TOP_MARGIN +
                          row *
                            (STICKER_HEIGHT +
                              GAP);

                        return (
                          <div
                            key={`${player.number}-${player.playerName}-${playerIndex}`}
                            style={{
                              position:
                                "absolute",
                              left:
                                `${left}mm`,
                              top:
                                `${top}mm`,
                              width:
                                `${STICKER_WIDTH}mm`,
                              height:
                                `${STICKER_HEIGHT}mm`,
                              margin: 0,
                              padding: 0,
                              background:
                                "#ffffff",
                              border:
                                `${OUTLINE}mm solid #000000`,
                              boxSizing:
                                "border-box",
                              overflow:
                                "visible",
                            }}
                          >

                            <img
                              src="/logo/ze-logo.png?v=1"
                              alt="Zasham Enterprises"
                              style={{
                                position:
                                  "absolute",
                                top:
                                  `${LEFT_LOGO_TOP}mm`,
                                left:
                                  `${LEFT_LOGO_LEFT}mm`,
                                width:
                                  `${LEFT_LOGO_SIZE}mm`,
                                height:
                                  `${LEFT_LOGO_SIZE}mm`,
                                objectFit:
                                  "contain",
                                objectPosition:
                                  "center",
                                display:
                                  "block",
                                margin: 0,
                                padding: 0,
                                zIndex: 10,
                              }}
                            />

                            <div
                              style={{
                                position:
                                  "absolute",
                                top:
                                  `${TEAM_NAME_TOP}mm`,
                                left:
                                  "0mm",
                                width:
                                  "100%",
                                fontFamily:
                                  "Sportzan, Arial, sans-serif",
                                fontSize:
                                  "21.3px",
                                lineHeight:
                                  1.1,
                                fontWeight:
                                  400,
                                fontStyle:
                                  "italic",
                                color:
                                  "#111111",
                                textAlign:
                                  "center",
                                textTransform:
                                  "uppercase",
                                whiteSpace:
                                  "nowrap",
                                overflow:
                                  "visible",
                                textOverflow:
                                  "clip",
                                margin: 0,
                                padding: 0,
                                zIndex: 10,
                              }}
                            >
                              {teamName?.trim() ||
                                "TEAM NAME"}
                            </div>

                            <div
                              style={{
                                position:
                                  "absolute",
                                top:
                                  `calc(${TEAM_NAME_TOP}mm + 22.2px + 1mm)`,
                                left: 0,
                                width: "100%",
                                display:
                                  "flex",
                                flexDirection:
                                  "column",
                                alignItems:
                                  "center",
                                fontFamily:
                                  "Sportzan, Arial, sans-serif",
                                fontSize:
                                  "21px",
                                lineHeight: 1,
                                fontWeight:
                                  400,
                                fontStyle:
                                  "italic",
                                color:
                                  "#111111",
                                textAlign:
                                  "center",
                                whiteSpace:
                                  "nowrap",
                                zIndex: 10,
                              }}
                            >
                              <div>
                                {player.number ||
                                  ""}
                              </div>

                              <div
                                style={{
                                  marginTop:
                                    "1mm",
                                }}
                              >
                                {player.playerName ||
                                  ""}
                              </div>

                              <div
                                style={{
                                  marginTop:
                                    "1mm",
                                }}
                              >
                                TOP:{" "}
                                {player.topSize ||
                                  ""}
                              </div>

                              <div
                                style={{
                                  marginTop:
                                    "1mm",
                                }}
                              >
                                BOTTOM:{" "}
                                {player.bottomSize ||
                                  ""}
                              </div>

                              <div
                                style={{
                                  marginTop:
                                    "1mm",
                                }}
                              >
                                JOGGER:{" "}
                                {player.joggerSize ||
                                  ""}
                              </div>

                              <div
                                style={{
                                  marginTop:
                                    "1mm",
                                }}
                              >
                                {player.jerseyStyle ||
                                  ""}
                              </div>

                              <div
                                style={{
                                  marginTop:
                                    "1mm",
                                }}
                              >
                                {player.material ||
                                  ""}
                              </div>

                              <div
                                style={{
                                  marginTop:
                                    "1mm",
                                }}
                              >
                                {player.hood ||
                                  ""}
                              </div>
                            </div>

                            <div
                              style={{
                                position:
                                  "absolute",
                                top:
                                  `${SOCIAL_TOP}mm`,
                                right:
                                  `${SOCIAL_RIGHT}mm`,
                                display:
                                  "flex",
                                flexDirection:
                                  "column",
                                alignItems:
                                  "flex-start",
                                fontFamily:
                                  "Arial, sans-serif",
                                fontSize:
                                  `${SOCIAL_FONT_SIZE}px`,
                                lineHeight:
                                  1,
                                fontStyle:
                                  "normal",
                                fontWeight:
                                  500,
                                color:
                                  "#111111",
                                whiteSpace:
                                  "nowrap",
                                zIndex: 20,
                              }}
                            >

                              <div
                                style={{
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  gap:
                                    "1.2mm",
                                }}
                              >
                                <svg
                                  viewBox="0 0 24 24"
                                  width="3.2mm"
                                  height="3.2mm"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M14.2 8.1V6.8c0-.7.4-1.1 1.1-1.1h1.8V3.2c-.3 0-1.2-.2-2.2-.2-2.4 0-4 1.5-4 4.2v.9H8.3v2.8h2.6v9h3.3v-9h2.5l.4-2.8h-2.9Z"
                                    fill="#111111"
                                  />
                                </svg>

                                <span>
                                  @zashamsportswear
                                </span>
                              </div>

                              <div
                                style={{
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  gap:
                                    "1.2mm",
                                  marginTop:
                                    "1mm",
                                }}
                              >
                                <svg
                                  viewBox="0 0 24 24"
                                  width="3.2mm"
                                  height="3.2mm"
                                  aria-hidden="true"
                                >
                                  <rect
                                    x="3.3"
                                    y="3.3"
                                    width="17.4"
                                    height="17.4"
                                    rx="5.2"
                                    fill="none"
                                    stroke="#111111"
                                    strokeWidth="1.9"
                                  />
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="4.1"
                                    fill="none"
                                    stroke="#111111"
                                    strokeWidth="1.9"
                                  />
                                  <circle
                                    cx="17.45"
                                    cy="6.55"
                                    r="1.25"
                                    fill="#111111"
                                  />
                                </svg>

                                <span>
                                  @zashamenterprises
                                </span>
                              </div>

                            </div>

                            <div
                              style={{
                                position:
                                  "absolute",
                                left: 0,
                                bottom:
                                  "calc(1mm + 12px + 1mm)",
                                width: "100%",
                                textAlign:
                                  "center",
                                fontFamily:
                                  "Arial, sans-serif",
                                fontSize:
                                  `${SOCIAL_FONT_SIZE}px`,
                                lineHeight: 1,
                                fontStyle:
                                  "normal",
                                fontWeight:
                                  400,
                                color:
                                  "#111111",
                                whiteSpace:
                                  "nowrap",
                                zIndex: 20,
                              }}
                            >
                              info@zashamenterprises.com
                            </div>

                            <div
                              style={{
                                position:
                                  "absolute",
                                left: 0,
                                bottom:
                                  "1mm",
                                width: "100%",
                                textAlign:
                                  "center",
                                fontFamily:
                                  "Arial, sans-serif",
                                fontSize:
                                  `${WEBSITE_FONT_SIZE}px`,
                                lineHeight: 1,
                                fontStyle:
                                  "normal",
                                fontWeight:
                                  400,
                                color:
                                  "#111111",
                                whiteSpace:
                                  "nowrap",
                                zIndex: 20,
                              }}
                            >
                              www.zashamenterprises.com
                            </div>

                          </div>
                        );
                      }
                    )}

                  </div>

                </div>
              </div>
            )
          )}

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-3
              pt-2
            "
          >
            <button
              type="button"
              onClick={handlePrint}
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-white/10
              "
            >
              🖨 Print All Pages
            </button>

            <button
              type="button"
              onClick={handlePrint}
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
              ⬇ Download PDF
            </button>

            <button
              type="button"
              onClick={handleSaveOrder}
              className="
                rounded-xl
                border
                border-yellow-500/40
                bg-yellow-500/10
                px-5
                py-3
                text-sm
                font-semibold
                text-yellow-400
                transition
                hover:bg-yellow-500/20
              "
            >
              💾 Save Order
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}