import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "AI texture provider is not connected yet.",
    },
    {
      status: 503,
    }
  );
}