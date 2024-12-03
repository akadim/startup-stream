import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const publicRoutes = ["/", "/login", "/api/auth/callback/github", "/studio"];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const isPublicRoute = publicRoutes.some((route) => pathname === route);
  const session = await auth();

  if (
    isPublicRoute ||
    (pathname.startsWith("/startup") && pathname !== "/startup/create")
  ) {
    return NextResponse.next();
  }

  if (!session) {
    const redirectUrl = new URL("/", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
