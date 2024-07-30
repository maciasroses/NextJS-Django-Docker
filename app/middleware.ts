import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";

acceptLanguage.languages(languages);

export function middleware(request: NextRequest) {
  let lng;
  const cookie = request.cookies.get(cookieName);
  if (cookie) {
    lng = acceptLanguage.get(cookie.value);
  }
  if (!lng) lng = acceptLanguage.get(request.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  const session = request.cookies.get("jwt")?.value;
  const pathname = request.nextUrl.pathname;
  const publicRoutes = [
    "/",
    `/${lng}`,
    "/signup",
    `/${lng}/signup`,
    "/login",
    `/${lng}/login`,
  ];

  if (!session && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(`/${lng}/login`, request.url));
  }

  if (
    session &&
    (pathname === `/${lng}/login` || pathname === `/${lng}/signup`)
  ) {
    return NextResponse.redirect(new URL(`/${lng}/home`, request.url));
  }

  if (
    !languages.some((loc) => pathname.startsWith(`/${loc}`)) &&
    !pathname.startsWith("/_next")
  ) {
    // console.log("pathname", pathname);
    const splitPath = pathname.split("/");
    const pathWithoutUnkownLang = `/${splitPath.slice(2).join("/")}`;
    // console.log("pathWithoutUnkownLang", pathWithoutUnkownLang);
    return NextResponse.redirect(
      new URL(`/${lng}${pathname}`, request.url) // BEFORE WAS pathname INSTEAD OF pathWithoutUnkownLang
    );
  }

  if (request.headers.has("referer")) {
    const referer = request.headers.get("referer");
    const refererUrl = referer ? new URL(referer) : null;
    const lngInReferer =
      refererUrl?.pathname &&
      languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/signup",
    "/login",
    "/home/:path*",
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};
