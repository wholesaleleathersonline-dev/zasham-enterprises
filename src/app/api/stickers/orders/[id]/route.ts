import { NextResponse } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// ==========================================
// GET — Sticker Order
//
// Supports BOTH:
//
// /api/admin/stickers/orders/UUID
//
// AND
//
// /api/admin/stickers/orders/ZE-NKE6AS
//
// ==========================================
export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const orderCode = id?.trim();

    if (!orderCode) {
      return NextResponse.json(
        {
          success: false,
          error: "Order code is required.",
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // ==========================================
    // FIND ORDER BY ORDER CODE
    // Case-insensitive
    // ==========================================

  const searchCode = orderCode
  .trim()
  .replace(/\s+/g, "");

const {
  data: order,
  error: orderError,
} = await supabase
  .from("sticker_orders")
  .select(`
    id,
    order_code,
    team_name,
    file_name,
    total_players,
    created_at
  `)
  .ilike(
    "order_code",
    `%${searchCode}%`
  )
  .limit(1)
  .maybeSingle();

    if (orderError) {
      console.error(
        "Order fetch error:",
        orderError
      );

      return NextResponse.json(
        {
          success: false,
          error: orderError.message,
        },
        { status: 500 }
      );
    }

   if (!order) {
  return NextResponse.json(
    {
      success: false,
      error: `Order "${orderCode}" not found in sticker_orders.`,
      searchedCode: searchCode,
    },
    { status: 404 }
  );
}

    // ==========================================
    // GET ALL PLAYERS
    // ==========================================

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
        bottom_size,
        jogger_size,
        created_at
      `)
      .eq("order_id", order.id)
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
          error: playersError.message,
        },
        { status: 500 }
      );
    }

    // ==========================================
    // RETURN COMPLETE ORDER
    // ==========================================

    return NextResponse.json({
      success: true,

      order: {
        id: order.id,

        orderCode:
          order.order_code,

        teamName:
          order.team_name,

        fileName:
          order.file_name,

        totalPlayers:
          players?.length ??
          order.total_players,

        createdAt:
          order.created_at,

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

            joggerSize:
              player.jogger_size || "",
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

    if (!id?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Order ID or Order Code is required.",
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // ========================================
    // FIND ORDER BY ID OR CODE
    // ========================================

    let order: any = null;

    const byId = await supabase
      .from("sticker_orders")
      .select("id, order_code")
      .eq("id", id)
      .maybeSingle();

    if (byId.data) {
      order = byId.data;
    } else {
      const byCode = await supabase
        .from("sticker_orders")
        .select("id, order_code")
        .eq(
          "order_code",
          id.trim().toUpperCase()
        )
        .maybeSingle();

      order = byCode.data;
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

    // ========================================
    // DELETE PLAYERS
    // ========================================

    const {
      error: playersDeleteError,
    } = await supabase
      .from("sticker_order_players")
      .delete()
      .eq("order_id", order.id);

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

    // ========================================
    // DELETE ORDER
    // ========================================

    const {
      error: orderDeleteError,
    } = await supabase
      .from("sticker_orders")
      .delete()
      .eq("id", order.id);

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

    return NextResponse.json({
      success: true,
      message:
        `Order ${order.order_code} deleted successfully.`,
    });
  } catch (error) {
    console.error(
      "Sticker order DELETE error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}