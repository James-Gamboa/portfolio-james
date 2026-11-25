import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { getLocale, middleware } from "./middleware";

const withHeader = (value) => ({
  headers: { get: () => value },
});

describe("getLocale", () => {
  it("defaults to en without an Accept-Language header", () => {
    expect(getLocale(withHeader(null))).toBe("en");
  });

  it("picks es for Spanish variants", () => {
    expect(getLocale(withHeader("es-CR,es;q=0.9,en;q=0.5"))).toBe("es");
  });

  it("picks en when English is preferred", () => {
    expect(getLocale(withHeader("en-US,en;q=0.9,es;q=0.4"))).toBe("en");
  });

  it("falls back to en for the wildcard", () => {
    expect(getLocale(withHeader("*"))).toBe("en");
  });

  it("falls back to en for malformed values", () => {
    expect(getLocale(withHeader(";;;q=,,"))).toBe("en");
  });

  it("falls back to en for unsupported languages", () => {
    expect(getLocale(withHeader("fr-FR,de;q=0.8"))).toBe("en");
  });
});

describe("middleware", () => {
  const run = (path, acceptLanguage) =>
    middleware(
      new NextRequest(`http://localhost:3000${path}`, {
        headers: acceptLanguage ? { "accept-language": acceptLanguage } : {},
      }),
    );

  it("redirects unprefixed paths to the negotiated locale", () => {
    const response = run("/foo", "es");
    expect(response.status).toBe(307);
    expect(new URL(response.headers.get("location")).pathname).toBe("/es/foo");
  });

  it("redirects to en when negotiation falls back", () => {
    const response = run("/foo", "*");
    expect(new URL(response.headers.get("location")).pathname).toBe("/en/foo");
  });

  it("lets locale-prefixed paths through", () => {
    expect(run("/es/curriculum-vitae").headers.get("location")).toBeNull();
    expect(run("/en").headers.get("location")).toBeNull();
  });

  it("skips paths whose last segment has an extension", () => {
    expect(run("/robots.txt").headers.get("location")).toBeNull();
    expect(run("/images/me.webp").headers.get("location")).toBeNull();
  });
});
