import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";

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

export async function POST(request: Request) {
  let parser: PDFParse | null = null;

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

    if (file.type !== "application/pdf") {
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

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    parser = new PDFParse({
      data: buffer,
    });

    const result = await parser.getText();

    const text = result.text
      .replace(/\r/g, "")
      .trim();

    console.log("========== PDF TEXT ==========");
    console.log(text);
    console.log("==============================");

    // ---------------------------------------
    // TEAM NAME
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
    // FIND PLAYER TABLE HEADER
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
      normalizedHeader.includes(
        "material"
      );

    const hasTopStyle =
      normalizedHeader.includes(
        "topstyle"
      );

    const format =
      hasMaterial || hasTopStyle
        ? "DETAILED"
        : "STANDARD";

    console.log(
      "DETECTED FORMAT:",
      format
    );

    // ---------------------------------------
    // PARSE PLAYERS
    // ---------------------------------------

    const players: Player[] = [];

    for (
      let i = headerIndex + 1;
      i < lines.length;
      i++
    ) {
      const line = lines[i];

      // -------------------------------------
      // STOP AT OTHER SECTIONS
      // -------------------------------------

      if (
        /^total\b/i.test(line) ||
        /^subtotal\b/i.test(line) ||
        /^notes?\b/i.test(line)
      ) {
        break;
      }

      // -------------------------------------
      // MATCH ROW
      // -------------------------------------

      /*
       * Expected:
       *
       * 1 25 HAMID -- YXL S --
       * 4 7 M ESSA -- XS YL --
       */

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
          "ROW HAS NO DATA:",
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
            "STANDARD ROW SKIPPED - NO SIZE:",
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
          cleanPlayerName(
            tokens
              .slice(0, topIndex)
              .join(" ")
          );

        if (!playerName) {
          console.log(
            "STANDARD ROW SKIPPED - NO PLAYER:",
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

      /*
       * IMPORTANT:
       *
       * Do NOT use the first size.
       *
       * Example:
       *
       * 7 M ESSA -- XS YL --
       *
       * "M" is technically a valid size,
       * but it is part of the player name.
       *
       * Therefore:
       *
       * LAST valid size = Bottom
       * SECOND-LAST valid size = Top
       */

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

      // -------------------------------------
      // NEED AT LEAST TOP + BOTTOM
      // -------------------------------------

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
       * Everything before Top size is
       * player information.
       *
       * Remove placeholders:
       *
       * --
       * -
       * DriFit
       */

      const nameTokens =
        tokens
          .slice(0, topIndex)
          .filter((token) => {
            const value =
              token
                .trim()
                .toLowerCase();

            return (
              value !== "" &&
              value !== "--" &&
              value !== "-" &&
              value !== "drifit"
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
      // CREATE PLAYER
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
    // FINAL DEBUG
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
  } finally {
    if (parser) {
      try {
        await parser.destroy();
      } catch (error) {
        console.error(
          "PDF parser destroy error:",
          error
        );
      }
    }
  }
}