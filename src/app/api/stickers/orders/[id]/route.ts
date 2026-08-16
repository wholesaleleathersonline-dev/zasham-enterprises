import { NextResponse } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// ==========================================
// GET — Sticker Order Detail
// ==========================================

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
      console.error(
        "Order fetch error:",
        orderError
      );

      return NextResponse.json(
        {
          success: false,
          error: "Sticker order not found.",
        },
        { status: 404 }
      );
    }

    // Get players
    const {
      data: players,
      error: playersError,
    } = await supabase
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

        players: (players || []).map(
          (player) => ({
            id: player.id,
            number:
              player.player_number || "",
            playerName:
              player.player_name || "",
            topSize:
              player.top_size || "",
            bottomSize:
              player.bottom_size || "",
          })
        ),
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

// ==========================================
// DELETE — Sticker Order
// ==========================================

export async function DELETE(
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

    // ----------------------------------------
    // Check order exists
    // ----------------------------------------

    const {
      data: order,
      error: orderCheckError,
    } = await supabase
      .from("sticker_orders")
      .select("id, order_code")
      .eq("id", id)
      .maybeSingle();

    if (orderCheckError) {
      console.error(
        "Order check error:",
        orderCheckError
      );

      return NextResponse.json(
        {
          success: false,
          error: "Failed to check sticker order.",
        },
        { status: 500 }
      );
    }

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: "Sticker order not found.",
        },
        { status: 404 }
      );
    }

    // ----------------------------------------
    // Delete players first
    // ----------------------------------------

    const {
      error: playersDeleteError,
    } = await supabase
      .from("sticker_order_players")
      .delete()
      .eq("order_id", id);

    if (playersDeleteError) {
      console.error(
        "Players delete error:",
        playersDeleteError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Failed to delete sticker players.",
        },
        { status: 500 }
      );
    }

    // ----------------------------------------
    // Delete order
    // ----------------------------------------

    const {
      error: orderDeleteError,
    } = await supabase
      .from("sticker_orders")
      .delete()
      .eq("id", id);

    if (orderDeleteError) {
      console.error(
        "Order delete error:",
        orderDeleteError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Failed to delete sticker order.",
        },
        { status: 500 }
      );
    }

    // ----------------------------------------
    // Success
    // ----------------------------------------

    return NextResponse.json({
      success: true,
      message: `Order ${order.order_code} deleted successfully.`,
    });
  } catch (error) {
    console.error(
      "Sticker order delete API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while deleting the order.",
      },
      { status: 500 }
    );
  }
}