import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  if (
    req.nextUrl.pathname.startsWith("/api/get-url") ||
    req.nextUrl.pathname.startsWith("/")
  ) {
    return;
  }
  const slug = req.nextUrl.pathname.split("/").pop();

  const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);
  if (slugFetch.status === 404) {
    return NextResponse.redirect(req.nextUrl.origin);
  }
  const data = await slugFetch.json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
};
