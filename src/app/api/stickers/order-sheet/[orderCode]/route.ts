import { NextResponse } from "next/server";
import { supabase } from "../../../../../lib/supabase/client";

type RouteContext = {
  params: Promise<{
    orderCode: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { orderCode } = await context.params;

    const code = decodeURIComponent(
      orderCode || ""
    ).trim();

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          error: "Order code is required.",
        },
        { status: 400 }
      );
    }

    console.log(
      "STICKER FETCH ORDER CODE:",
      code
    );

    // ==========================================
    // CUSTOMER ORIGINAL ORDER SHEET
    // ==========================================

    const {
      data: order,
      error: orderError,
    } = await supabase
      .from("order_sheets")
      .select("*")
      .eq("order_code", code)
      .single();

    console.log(
      "ORDER RESULT:",
      order
    );

    if (orderError) {
      console.error(
        "ORDER SHEET ERROR:",
        orderError
      );

      return NextResponse.json(
        {
          success: false,
          error: orderError.message,
          code,
        },
        { status: 404 }
      );
    }

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: `Order "${code}" was not found.`,
        },
        { status: 404 }
      );
    }

    // ==========================================
    // CUSTOMER ORIGINAL PLAYERS
    // ==========================================

    const {
      data: players,
      error: playersError,
    } = await supabase
      .from("order_sheet_players")
      .select("*")
      .eq("order_sheet_id", order.id)
      .order("created_at", {
        ascending: true,
      });

    console.log(
      "PLAYERS RESULT:",
      players?.length || 0
    );

    if (playersError) {
      console.error(
        "PLAYERS ERROR:",
        playersError
      );

      return NextResponse.json(
        {
          success: false,
          error: playersError.message,
        },
        { status: 500 }
      );
    }

    // ==========================================
    // FINAL STICKER DATA
    // ==========================================

    return NextResponse.json({
      success: true,

      order: {
        orderCode:
          order.order_code,

        teamName:
          order.team_name || "",

        totalPlayers:
          players?.length || 0,

       players: (players || []).map(
  (player) => ({
    id: player.id,

    number:
      player.player_number?.toString() || "",

    playerName:
      player.player_name || "",

    topSize:
      player.top_size || "",

    bottomSize:
      player.bottom_size || "",

    joggerSize:
      player.jogger_size || "",

    jerseyStyle:
      player.top_style || "",

    material:
      player.material || "",

    hood:
      player.hood || "",
  })
),
      },
    });
  } catch (error) {
    console.error(
      "STICKER ORDER SHEET ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch customer order sheet.",
      },
      { status: 500 }
    );
  }
}