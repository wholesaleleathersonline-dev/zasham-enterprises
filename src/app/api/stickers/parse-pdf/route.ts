import { NextResponse } from "next/server";
import { extractText, getDocumentProxy } from "unpdf";

export const runtime = "nodejs";

type Player = {
  number: string;
  playerName: string;
  topSize: string;
  bottomSize: string;
};

const SIZE_PATTERN =
  /^(XS|S|M|L|XL|2XL|3XL|4XL|5XL|6XL|YXS|YS|YM|YL|YXL)$/i;

const normalizeHeader = (value: string) => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
};

const isSize = (value: string) => {
  return SIZE_PATTERN.test(value.trim());
};

const cleanPlayerName = (value: string) => {
  return value
    .replace(/--/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// ---------------------------------------
// CLEAN PLAYER NAME
// ---------------------------------------

const extractCleanPlayerName = (
  tokens: string[],
  topIndex: number
) => {
  const attributes = new Set([
    "drifit",
    "compression",
    "shorts",
    "short",
    "sleeve",
    "sleeves",
    "full",
    "material",
    "style",

    "nosleeve",
    "shortsleeve",
    "fullsleeve",
    "fullsleeves",
    "compressionshorts",
  ]);

  const nameTokens: string[] = [];

  for (let i = 0; i < topIndex; i++) {
    const token = tokens[i].trim();

    const normalized = token
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    // Attribute starts here.
    if (
      token === "-" ||
      token === "--" ||
      attributes.has(normalized)
    ) {
      break;
    }

    nameTokens.push(token);
  }

  return cleanPlayerName(
    nameTokens.join(" ")
  );
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    // ---------------------------------------
    // VALIDATE FILE
    // ---------------------------------------

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "PDF file is required.",
        },
        { status: 400 }
      );
    }

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Only PDF files are allowed.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------
    // READ PDF
    // ---------------------------------------

    const buffer = new Uint8Array(
      await file.arrayBuffer()
    );

    console.log("========== STICKER PDF ==========");
    console.log("FILE:", file.name);
    console.log("SIZE:", buffer.length);

    // ---------------------------------------
    // OPEN PDF
    // ---------------------------------------

    const pdf = await getDocumentProxy(buffer);

    console.log("PDF PAGES:", pdf.numPages);

    // ---------------------------------------
    // EXTRACT TEXT
    // ---------------------------------------

    const extracted = await extractText(pdf, {
      mergePages: true,
    });

    const text = extracted.text
      .replace(/\r/g, "")
      .trim();

    console.log("========== PDF TEXT ==========");
    console.log(text);
    console.log("==============================");

    // ---------------------------------------
    // TEAM
    // ---------------------------------------

    const teamMatch = text.match(
      /Team:\s*(.+)/i
    );

    const teamName = teamMatch
      ? teamMatch[1]
          .trim()
          .split("\n")[0]
          .trim()
      : "";

    // ---------------------------------------
    // ORDER CODE
    // ---------------------------------------

    const orderCodeMatch = text.match(
      /Order\s*Code:\s*([A-Z0-9-]+)/i
    );

    const orderCode = orderCodeMatch
      ? orderCodeMatch[1].trim()
      : "";

    // ---------------------------------------
    // LINES
    // ---------------------------------------

    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    // ---------------------------------------
    // FIND TABLE HEADER
    // ---------------------------------------

    const headerIndex = lines.findIndex(
      (line) => {
        const normalized =
          normalizeHeader(line);

        return (
          normalized.includes("player") &&
          normalized.includes("top") &&
          normalized.includes("bottom")
        );
      }
    );

    console.log(
      "HEADER INDEX:",
      headerIndex
    );

    if (headerIndex === -1) {
      return NextResponse.json({
        success: true,
        fileName: file.name,
        teamName,
        orderCode,
        players: [],
        totalPlayers: 0,
        error:
          "Player table header could not be detected.",
      });
    }

    const headerLine =
      lines[headerIndex];

    console.log(
      "HEADER:",
      headerLine
    );

    // ---------------------------------------
    // DETECT FORMAT
    // ---------------------------------------

    const normalizedHeader =
      normalizeHeader(headerLine);

    const hasMaterial =
      normalizedHeader.includes("material");

    const hasTopStyle =
      normalizedHeader.includes("topstyle");

    const format =
      hasMaterial || hasTopStyle
        ? "DETAILED"
        : "STANDARD";

    console.log(
      "DETECTED FORMAT:",
      format
    );

    // ---------------------------------------
    // PLAYERS
    // ---------------------------------------

    const players: Player[] = [];

    // ---------------------------------------
    // PARSE ROWS
    // ---------------------------------------

    for (
      let i = headerIndex + 1;
      i < lines.length;
      i++
    ) {
      const line = lines[i];

      // Stop at totals / notes
      if (
        /^total\b/i.test(line) ||
        /^subtotal\b/i.test(line) ||
        /^notes?\b/i.test(line)
      ) {
        break;
      }

      // -------------------------------------
      // ROW MATCH
      // -------------------------------------

      const rowMatch = line.match(
        /^(\d+)\s+(\S+)(?:\s+(.*))?$/
      );

      if (!rowMatch) {
        console.log(
          "ROW NOT MATCHED:",
          line
        );

        continue;
      }

      const rowNumber =
        rowMatch[1];

      const playerNumber =
        rowMatch[2];

      const remaining =
        (rowMatch[3] || "").trim();

      if (!remaining) {
        console.log(
          "ROW EMPTY:",
          line
        );

        continue;
      }

      // =====================================
      // STANDARD FORMAT
      // =====================================

      if (format === "STANDARD") {
        const tokens =
          remaining.split(/\s+/);

        const sizeIndexes: number[] = [];

        tokens.forEach(
          (token, index) => {
            if (isSize(token)) {
              sizeIndexes.push(index);
            }
          }
        );

        if (
          sizeIndexes.length === 0
        ) {
          console.log(
            "STANDARD ROW SKIPPED:",
            line
          );

          continue;
        }

        const topIndex =
          sizeIndexes[0];

        const bottomIndex =
          sizeIndexes[1];

        const topSize =
          tokens[topIndex];

        const bottomSize =
          bottomIndex !== undefined
            ? tokens[bottomIndex]
            : "";

        const playerName =
          extractCleanPlayerName(
            tokens,
            topIndex
          );

        if (!playerName) {
          console.log(
            "STANDARD EMPTY NAME:",
            line
          );

          continue;
        }

        const player: Player = {
          number: playerNumber,
          playerName,
          topSize,
          bottomSize,
        };

        players.push(player);

        console.log(
          "STANDARD PLAYER:",
          player
        );

        continue;
      }

      // =====================================
      // DETAILED FORMAT
      // =====================================

      const tokens =
        remaining.split(/\s+/);

      console.log(
        "DETAILED TOKENS:",
        tokens
      );

      // -------------------------------------
      // FIND ALL SIZE VALUES
      // -------------------------------------

      const sizeIndexes: number[] = [];

      tokens.forEach(
        (token, index) => {
          if (isSize(token)) {
            sizeIndexes.push(index);
          }
        }
      );

      console.log(
        "SIZE INDEXES:",
        sizeIndexes
      );

      if (
        sizeIndexes.length < 2
      ) {
        console.log(
          "DETAILED ROW SKIPPED - LESS THAN 2 SIZES:",
          line
        );

        continue;
      }

      // -------------------------------------
      // LAST TWO SIZES
      // -------------------------------------

      const topIndex =
        sizeIndexes[
          sizeIndexes.length - 2
        ];

      const bottomIndex =
        sizeIndexes[
          sizeIndexes.length - 1
        ];

      const topSize =
        tokens[topIndex];

      const bottomSize =
        tokens[bottomIndex];

      // -------------------------------------
      // PLAYER NAME
      // -------------------------------------

      /*
       * We find the first known attribute.
       *
       * Examples:
       *
       * HAMID DriFit No Sleeve M L
       * -> HAMID
       *
       * HAMID Compression Shorts M L
       * -> HAMID
       *
       * ALI Compression Shorts L 8
       * -> ALI
       *
       * M ESSA -- XS YL --
       * -> M ESSA
       *
       * SSGT TAZ DriFit No Sleeve M M
       * -> SSGT TAZ
       */

      const attributeWords = new Set([
        "drifit",
        "compression",
        "shorts",
        "short",
        "sleeve",
        "sleeves",
        "full",
        "material",
        "style",

        "nosleeve",
        "shortsleeve",
        "fullsleeve",
        "fullsleeves",
        "compressionshorts",
      ]);

      let nameEndIndex = topIndex;

      for (
        let j = 0;
        j < topIndex;
        j++
      ) {
        const token = tokens[j]
          .trim();

        const normalized = token
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");

        if (
          token === "-" ||
          token === "--" ||
          attributeWords.has(normalized)
        ) {
          nameEndIndex = j;
          break;
        }
      }

      const nameTokens =
        tokens
          .slice(0, nameEndIndex)
          .filter((token) => {
            const value =
              token.trim();

            return (
              value !== "" &&
              value !== "--" &&
              value !== "-"
            );
          });

      const playerName =
        cleanPlayerName(
          nameTokens.join(" ")
        );

      if (!playerName) {
        console.log(
          "DETAILED ROW SKIPPED - EMPTY NAME:",
          line
        );

        continue;
      }

      // -------------------------------------
      // SAVE PLAYER
      // -------------------------------------

      const player: Player = {
        number: playerNumber,
        playerName,
        topSize,
        bottomSize,
      };

      players.push(player);

      console.log(
        "DETAILED PLAYER:",
        player
      );
    }

    // ---------------------------------------
    // FINAL LOG
    // ---------------------------------------

    console.log(
      "========== PLAYERS =========="
    );

    players.forEach(
      (player, index) => {
        console.log(
          `${index + 1}.`,
          player
        );
      }
    );

    console.log(
      "TOTAL PLAYERS:",
      players.length
    );

    console.log(
      "============================="
    );

    // ---------------------------------------
    // RESPONSE
    // ---------------------------------------

    return NextResponse.json({
      success: true,
      fileName: file.name,
      teamName,
      orderCode,
      players,
      totalPlayers: players.length,
      format,
    });
  } catch (error) {
    console.error(
      "STICKER PDF PARSER ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to read PDF.",
      },
      { status: 500 }
    );
  }
}