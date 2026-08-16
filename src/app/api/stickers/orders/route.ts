import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("sticker_orders")
      .select(`
        id,
        order_code,
        team_name,
        file_name,
        total_players,
        created_at
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Sticker orders fetch error:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orders: data || [],
    });
  } catch (error) {
    console.error("Sticker orders API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch sticker orders.",
      },
      { status: 500 }
    );
  }
}