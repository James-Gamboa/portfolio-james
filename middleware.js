import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";

const locales = ["en", "es"];
const defaultLocale = "en";

function getLocale(request) {
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const languages = new Negotiator({
      headers: { "accept-language": acceptLanguage },
    }).languages();
    return match(languages, locales, defaultLocale);
  }
  return defaultLocale;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
