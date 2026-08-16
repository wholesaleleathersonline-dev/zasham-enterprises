import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";

type Player = {
  number: string;
  playerName: string;
  topSize: string;
  bottomSize: string;
};

type SaveOrderRequest = {
  orderCode: string;
  teamName: string;
  fileName?: string;
  players: Player[];
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const body = (await request.json()) as SaveOrderRequest;

    const {
      orderCode,
      teamName,
      fileName,
      players,
    } = body;

    // -----------------------------
    // Validation
    // -----------------------------

    if (!orderCode?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Order code is required.",
        },
        { status: 400 }
      );
    }

    if (!teamName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Team name is required.",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(players) || players.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No players found.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // Check duplicate order
    // -----------------------------

    const { data: existingOrder, error: existingError } =
      await supabase
        .from("sticker_orders")
        .select("id")
        .eq("order_code", orderCode.trim())
        .maybeSingle();

    if (existingError) {
      console.error("Duplicate check error:", existingError);

      return NextResponse.json(
        {
          success: false,
          error: "Failed to check existing order.",
        },
        { status: 500 }
      );
    }

    if (existingOrder) {
      return NextResponse.json(
        {
          success: false,
          duplicate: true,
          error: `Order ${orderCode.trim()} already exists.`,
        },
        { status: 409 }
      );
    }

    // -----------------------------
    // Create sticker order
    // -----------------------------

    const { data: order, error: orderError } =
      await supabase
        .from("sticker_orders")
        .insert({
          order_code: orderCode.trim(),
          team_name: teamName.trim(),
          file_name: fileName?.trim() || null,
          total_players: players.length,
        })
        .select("id, order_code")
        .single();

    if (orderError || !order) {
      console.error("Order insert error:", orderError);

      return NextResponse.json(
        {
          success: false,
          error:
            orderError?.message ||
            "Failed to save sticker order.",
        },
        { status: 500 }
      );
    }

    // -----------------------------
    // Prepare player records
    // -----------------------------

    const playerRows = players.map((player) => ({
      order_id: order.id,
      player_number: player.number?.trim() || null,
      player_name: player.playerName?.trim() || "",
      top_size: player.topSize?.trim() || null,
      bottom_size: player.bottomSize?.trim() || null,
    }));

    // -----------------------------
    // Save players
    // -----------------------------

    const { error: playersError } = await supabase
      .from("sticker_order_players")
      .insert(playerRows);

    if (playersError) {
      console.error(
        "Player insert error:",
        playersError
      );

      // Remove order if player insert fails
      await supabase
        .from("sticker_orders")
        .delete()
        .eq("id", order.id);

      return NextResponse.json(
        {
          success: false,
          error:
            playersError.message ||
            "Failed to save player data.",
        },
        { status: 500 }
      );
    }

    // -----------------------------
    // Success
    // -----------------------------

    return NextResponse.json({
      success: true,
      message: "Sticker order saved successfully.",
      orderId: order.id,
      orderCode: order.order_code,
      totalPlayers: players.length,
    });
  } catch (error) {
    console.error("Save sticker order error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while saving the order.",
      },
      { status: 500 }
    );
  }
}