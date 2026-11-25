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
          background: "#0a0f1c",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(56,189,248,0.22) 0%, rgba(56,189,248,0.08) 40%, rgba(10,15,28,0) 70%)",
          color: "#e5e7eb",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 30,
            color: "#93a3c0",
          }}
        >
          james-gamboa.vercel.app
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: "-0.02em",
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
              color: "#38bdf8",
            }}
          >
            {ROLE_HEADLINE[locale]}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 32,
              color: "#9ca3af",
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
            color: "#93a3c0",
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
