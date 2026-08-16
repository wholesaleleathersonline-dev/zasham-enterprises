import { NextResponse } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Order ID is required.",
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get order
    const { data: order, error: orderError } =
      await supabase
        .from("sticker_orders")
        .select(`
          id,
          order_code,
          team_name,
          file_name,
          total_players,
          created_at
        `)
        .eq("id", id)
        .single();

    if (orderError || !order) {
      console.error("Order fetch error:", orderError);

      return NextResponse.json(
        {
          success: false,
          error: "Sticker order not found.",
        },
        { status: 404 }
      );
    }

    // Get players
    const { data: players, error: playersError } =
      await supabase
        .from("sticker_order_players")
        .select(`
          id,
          player_number,
          player_name,
          top_size,
          bottom_size
        `)
        .eq("order_id", id)
        .order("created_at", {
          ascending: true,
        });

    if (playersError) {
      console.error(
        "Players fetch error:",
        playersError
      );

      return NextResponse.json(
        {
          success: false,
          error: "Failed to load player data.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,

      order: {
        id: order.id,
        orderCode: order.order_code,
        teamName: order.team_name,
        fileName: order.file_name,
        totalPlayers: order.total_players,
        createdAt: order.created_at,

        players: (players || []).map((player) => ({
          id: player.id,
          number: player.player_number || "",
          playerName: player.player_name || "",
          topSize: player.top_size || "",
          bottomSize: player.bottom_size || "",
        })),
      },
    });
  } catch (error) {
    console.error(
      "Sticker order detail API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load sticker order.",
      },
      { status: 500 }
    );
  }
}