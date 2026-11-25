import { ImageResponse } from "next/og";
import { LOCATION, ROLE_HEADLINE, SITE_NAME } from "@/lib/seo";

export const alt = "James Guevara Gamboa — Frontend & Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STACK = "Next.js · React · TypeScript · Strapi · Shopify · WordPress";

const COPY = {
  en: { remote: "Open to remote" },
  es: { remote: "Disponible para trabajo remoto" },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export default async function Image({ params }) {
  const { lang } = await params;
  const locale = lang === "es" ? "es" : "en";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#000000",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(248,107,223,0.35) 0%, rgba(107,107,248,0.18) 40%, rgba(0,0,0,0) 70%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 30,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          james-gamboa.vercel.app
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 48,
              fontWeight: 700,
              color: "#c9c9ff",
            }}
          >
            {ROLE_HEADLINE[locale]}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 32,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {STACK}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 30,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <div style={{ display: "flex" }}>{LOCATION[locale]}</div>
          <div style={{ display: "flex" }}>{COPY[locale].remote}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
