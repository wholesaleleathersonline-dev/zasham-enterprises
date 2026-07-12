


import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if needed
 const {
  data: { user },
} = await supabase.auth.getUser();
console.log("Proxy User:", user?.email ?? "No User");

const pathname = request.nextUrl.pathname;

// Protected admin routes
const isProtectedAdminRoute =
  pathname.startsWith("/admin/dashboard") ||
  pathname.startsWith("/admin/products") ||
  pathname.startsWith("/admin/categories") ||
  pathname.startsWith("/admin/media") ||
  pathname.startsWith("/admin/settings");

// Login page
const isLoginRoute = pathname.startsWith("/admin/login");

// User not logged in
if (!user && isProtectedAdminRoute) {
  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";

  return NextResponse.redirect(url);
}

// User already logged in
if (user && isLoginRoute) {
  const url = request.nextUrl.clone();
  url.pathname = "/admin/dashboard";

  return NextResponse.redirect(url);
}

return response;
}