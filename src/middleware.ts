import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // For client-side authentication, we'll let the client-side code handle the redirects
  // The actual authentication check will be done in the dashboard layout
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
