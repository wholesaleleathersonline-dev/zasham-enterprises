import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./src/lib/supabase/proxy";


console.log("PROXY IS RUNNING");

export async function proxy(request: NextRequest) {
   return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};