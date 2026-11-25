import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";

const locales = ["en", "es"];
const defaultLocale = "en";

export function getLocale(request) {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  try {
    const languages = new Negotiator({
      headers: { "accept-language": acceptLanguage },
    }).languages();
    return match(languages, locales, defaultLocale);
  } catch {
    // Malformed or wildcard-only values (e.g. "*") are not valid BCP 47 tags.
    return defaultLocale;
  }
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Root files and assets (robots.txt, sitemap.xml, llms.txt, manifest, icons,
  // images, fonts...) are served as-is: anything whose last segment has an
  // extension is never locale-redirected.
  if (/\.[a-z0-9]+$/i.test(pathname)) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static and _next/image (framework assets)
     * - any path whose last segment has a file extension
     */
    "/((?!api|_next/static|_next/image|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
