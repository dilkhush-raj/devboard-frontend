import {NextResponse} from "next/server";
export function middleware(request) {
  const hasVisited = true;

  if (hasVisited) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/welcome", request.url));
}

export const config = {
  matcher: "/",
};
