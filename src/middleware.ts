import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // In mock mode, skip auth
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return;
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|icons|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
