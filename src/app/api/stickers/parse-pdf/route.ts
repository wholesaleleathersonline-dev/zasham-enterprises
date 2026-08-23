import { NextResponse } from "next/server";
import { extractText, getDocumentProxy } from "unpdf";

export const runtime = "nodejs";

type Player = {
  number: string;
  playerName: string;
  topSize: string;
  bottomSize: string;
  joggerSize: string;
};

const SIZE_PATTERN =
  /^(XS|S|M|L|XL|2XL|3XL|4XL|5XL|6XL|YXS|YS|YM|YL|YXL)$/i;

const isSize = (value: string) => {
  return SIZE_PATTERN.test(value.trim());
};

const normalizeText = (value: string) => {
  return value
    .replace(/\s+/g, " ")
    .trim();
};

const cleanPlayerName = (value: string) => {
  return normalizeText(value)
    .replace(/--/g, " ")
    .trim();
};

// ==========================================
// EXTRACT TEAM NAME
// ==========================================

const extractTeamName = (lines: string[]) => {
  const teamLine = lines.find((line) =>
    /^team\s*:/i.test(line)
  );

  if (!teamLine) {
    return "";
  }

  return teamLine
    .replace(/^team\s*:/i, "")
    .trim();
};

// ==========================================
// EXTRACT JOGGER SIZE USING PDF COLUMN
// ==========================================

const extractJoggerSizesByPlayerNumber = async (
  pdf: any
): Promise<Map<string, string>> => {
  const joggerMap = new Map<string, string>();

  for (
    let pageNumber = 1;
    pageNumber <= pdf.numPages;
    pageNumber++
  ) {
    const page =
      await pdf.getPage(pageNumber);

    const content =
      await page.getTextContent();

    const items =
      (content.items || []) as any[];

    // ----------------------------------------
    // FIND JOGGER HEADER X POSITION
    // ----------------------------------------

    const joggerHeader =
      items.find(
        (item) =>
          String(item.str)
            .trim()
            .toLowerCase() ===
          "jogger"
      );

    if (!joggerHeader) {
      console.log(
        "JOGGER HEADER NOT FOUND:",
        pageNumber
      );

      continue;
    }

    const joggerX =
      Number(
        joggerHeader.transform?.[4]
      );

    if (!Number.isFinite(joggerX)) {
      continue;
    }

    console.log(
      "JOGGER X:",
      pageNumber,
      joggerX
    );

    // ----------------------------------------
    // FIND PLAYER ROW NUMBERS
    // ----------------------------------------

    const rowNumbers =
      items.filter((item) => {
        const text =
          String(item.str).trim();

        const x =
          Number(
            item.transform?.[4]
          );

        return (
          /^\d{1,3}$/.test(text) &&
          x >= 40 &&
          x <= 60
        );
      });

    // ----------------------------------------
    // FIND JOGGER FOR EACH ROW
    // ----------------------------------------

    for (const rowItem of rowNumbers) {
      const playerNumber =
        String(rowItem.str).trim();

      const rowY =
        Number(
          rowItem.transform?.[5]
        );

      if (!Number.isFinite(rowY)) {
        continue;
      }

      // Find item in the same row
      // and inside Jogger column.
      const joggerItem =
        items.find((item) => {
          const text =
            String(item.str).trim();

          const x =
            Number(
              item.transform?.[4]
            );

          const y =
            Number(
              item.transform?.[5]
            );

          if (
            !Number.isFinite(x) ||
            !Number.isFinite(y)
          ) {
            return false;
          }

          return (
            Math.abs(y - rowY) < 2 &&
            Math.abs(x - joggerX) < 5
          );
        });

      if (!joggerItem) {
        joggerMap.set(
          playerNumber,
          ""
        );

        continue;
      }

      const value =
        String(
          joggerItem.str
        ).trim();

      if (
        value === "-" ||
        value === "--"
      ) {
        joggerMap.set(
          playerNumber,
          ""
        );
      } else if (
        isSize(value)
      ) {
        joggerMap.set(
          playerNumber,
          value
        );
      }
    }
  }

  console.log(
    "========== JOGGER MAP =========="
  );

  console.log(
    Object.fromEntries(
      joggerMap
    )
  );

  console.log(
    "================================"
  );

  return joggerMap;
};

// ==========================================
// GET PLAYER ROW NUMBER
//
// PDF format:
//
// 1 2 Donnie Compression No Sleeve M - ...
// ^
// row number
//
// 2 13 J. Paul Compression No Sleeve L L ...
// ^
// row number
// ==========================================

const getRowNumber = (line: string) => {
  const match = line.match(
    /^\s*(\d{1,3})\s+/
  );

  return match?.[1] || "";
};

// ==========================================
// PARSE PLAYER ROW
// ==========================================

const parsePlayerLine = (
  line: string
): Player | null => {
  const rowNumber =
    getRowNumber(line);

  if (!rowNumber) {
    return null;
  }

  const tokens = line
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  if (tokens.length < 6) {
    return null;
  }

  // ----------------------------------------
  // First token = PDF row number
  // Second token = jersey/player number
  // ----------------------------------------

  const rawNumber =
    tokens[1] || "";

  if (!rawNumber) {
    return null;
  }

  const playerNumber =
    rawNumber
      .replace(/[()#]/g, "")
      .trim();

  // ----------------------------------------
  // Find "Compression"
  //
  // Everything between jersey number
  // and Compression = PLAYER NAME
  // ----------------------------------------

  const materialIndex =
    tokens.findIndex(
      (token, index) =>
        index >= 2 &&
        token.toLowerCase() ===
          "compression"
    );

  if (materialIndex === -1) {
    console.log(
      "Could not find material:",
      line
    );

    return null;
  }

  // ----------------------------------------
  // PLAYER NAME
  // ----------------------------------------

  const playerName =
    cleanPlayerName(
      tokens
        .slice(
          2,
          materialIndex
        )
        .join(" ")
    );

  if (!playerName) {
    return null;
  }

  // ========================================
  // AFTER MATERIAL
  // ========================================

  let index =
    materialIndex + 1;

  // ========================================
  // TOP STYLE
  // ========================================

  // No Sleeve
  if (
    tokens[index]?.toLowerCase() ===
      "no" &&
    tokens[index + 1]
      ?.toLowerCase() ===
      "sleeve"
  ) {
    index += 2;
  }

  // Long Sleeve
  else if (
    tokens[index]?.toLowerCase() ===
      "long" &&
    tokens[index + 1]
      ?.toLowerCase() ===
      "sleeve"
  ) {
    index += 2;
  }

  // ========================================
  // TOP SIZE
  // ========================================

  let topSize = "";

  if (
    tokens[index] &&
    isSize(tokens[index])
  ) {
    topSize =
      tokens[index].trim();

    index++;
  }

  // ========================================
  // FIND SHORTS COLUMN
  //
  // IMPORTANT:
  //
  // We use "Shorts" as the divider.
  //
  // Anything BEFORE Shorts:
  //     Bottom
  //
  // Anything AFTER Shorts:
  //     Jogger
  //
  // This fixes the case where Bottom
  // is blank but Jogger has a size.
  // ========================================

  const shortsIndex =
    tokens.findIndex(
      (token, i) =>
        i > index &&
        token.toLowerCase() ===
          "shorts"
    );

  // ========================================
  // BOTTOM SIZE
  // ========================================

  let bottomSize = "";

  if (
    shortsIndex !== -1
  ) {
    // Search ONLY between Top and Shorts.
    //
    // Example:
    //
    // XL - Regular Shorts
    //
    // There is no size here,
    // so Bottom remains blank.
    //
    // Example:
    //
    // XL L Regular Shorts
    //
    // L = Bottom.

    for (
      let i = index;
      i < shortsIndex;
      i++
    ) {
      const token =
        tokens[i];

      if (isSize(token)) {
        bottomSize =
          token.trim();

        break;
      }
    }
  } else {
    // --------------------------------------
    // FALLBACK
    //
    // If Shorts cannot be found,
    // preserve the old behavior.
    // --------------------------------------

    if (
      tokens[index] &&
      isSize(tokens[index])
    ) {
      bottomSize =
        tokens[index].trim();

      index++;
    }
  }

  // ========================================
  // JOGGER SIZE
  //
  // Jogger is specifically AFTER Shorts.
  // ========================================

  let joggerSize = "";

  if (
    shortsIndex !== -1
  ) {
    for (
      let i =
        shortsIndex + 1;
      i < tokens.length;
      i++
    ) {
      const token =
        tokens[i];

      const normalized =
        token.toLowerCase();

      // Stop when Hood section begins.
      if (
        normalized ===
          "hood"
      ) {
        break;
      }

      // Ignore separators.
      if (
        token === "-" ||
        token === "--"
      ) {
        continue;
      }

      // First size after Shorts
      // is Jogger size.
      if (isSize(token)) {
        joggerSize =
          token.trim();

        break;
      }
    }
  }

  // ========================================
  // RESULT
  // ========================================

  const player: Player = {
    number: playerNumber,
    playerName,
    topSize,
    bottomSize,
    joggerSize,
  };

  console.log(
    "PARSED PLAYER:",
    player
  );

  return player;
};

// ==========================================
// POST
// ==========================================

export async function POST(
  request: Request
) {
  try {
    const formData =
      await request.formData();

    const file =
      formData.get("file");

    // ======================================
    // VALIDATE FILE
    // ======================================

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "PDF file is required.",
        },
        { status: 400 }
      );
    }

    if (
      file.type !==
        "application/pdf" &&
      !file.name
        .toLowerCase()
        .endsWith(".pdf")
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Only PDF files are allowed.",
        },
        { status: 400 }
      );
    }

    // ======================================
    // READ PDF
    // ======================================

    const buffer =
      new Uint8Array(
        await file.arrayBuffer()
      );

    console.log(
      "========== STICKER PDF =========="
    );

    console.log(
      "FILE:",
      file.name
    );

    console.log(
      "SIZE:",
      buffer.length
    );

    // ======================================
    // OPEN PDF
    // ======================================

    const pdf =
      await getDocumentProxy(
        buffer
      );

      const joggerMap =
  await extractJoggerSizesByPlayerNumber(
    pdf
  );


    console.log(
      "PDF PAGES:",
      pdf.numPages
    );

    // ======================================
    // EXTRACT TEXT
    // ======================================

    const extracted =
      await extractText(pdf, {
        mergePages: true,
      });

    const text =
      extracted.text
        .replace(/\r/g, "")
        .trim();

    console.log(
      "========== EXTRACTED PDF TEXT =========="
    );

    console.log(text);

    console.log(
      "========================================"
    );

    // ======================================
    // LINES
    // ======================================

    const lines =
      text
        .split("\n")
        .map((line) =>
          line.trim()
        )
        .filter(Boolean);

    // ======================================
    // TEAM NAME
    // ======================================

    const teamName =
      extractTeamName(lines);

    console.log(
      "TEAM NAME:",
      teamName
    );

    // ======================================
    // FIND PLAYER ROWS
    //
    // KEEPING THE WORKING 31-PLAYER LOGIC
    // ======================================

    const players: Player[] = [];

    for (const line of lines) {
      const rowNumber =
        getRowNumber(line);

      if (!rowNumber) {
        continue;
      }

      const player =
        parsePlayerLine(line);

      if (!player) {
        console.log(
          "FAILED PLAYER ROW:",
          line
        );

        continue;
      }

      players.push(player);
    }

    // ======================================
    // REMOVE DUPLICATE ROWS
    // ======================================

    const uniquePlayers: Player[] =
      [];

      

    const seenRows =
      new Set<string>();

    for (const player of players) {
      const key =
        `${player.number}-${player.playerName}`;

      if (
        seenRows.has(key)
      ) {
        continue;
      }

      seenRows.add(key);

      uniquePlayers.push(
        player
      );
    }

    for (const player of players) {
  const key =
    `${player.number}-${player.playerName}`;

  if (
    seenRows.has(key)
  ) {
    continue;
  }

  seenRows.add(key);

  uniquePlayers.push(
    player
  );
}

    // ======================================
    // LOG FINAL RESULT
    // ======================================

    console.log(
      "========== FINAL PLAYERS =========="
    );

    console.log(
      "TEAM:",
      teamName
    );

    console.log(
      "TOTAL PLAYERS:",
      uniquePlayers.length
    );

    console.log(
      JSON.stringify(
        uniquePlayers,
        null,
        2
      )
    );

    console.log(
      "==================================="
    );

    // ======================================
    // SAFETY
    // ======================================

    if (
      uniquePlayers.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No players could be detected from the PDF.",
          debug: {
            lines,
          },
        },
        { status: 422 }
      );
    }

    // ======================================
    // RESULT
    // ======================================

    return NextResponse.json({
      success: true,

      fileName:
        file.name,

      teamName:
        teamName ||
        "Unknown Team",

      totalPlayers:
        uniquePlayers.length,

      players:
        uniquePlayers,
    });

  } catch (error) {
    console.error(
      "Sticker PDF parser error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to process PDF.",
      },
      { status: 500 }
    );
  }
}