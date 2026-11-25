const isDev = process.env.NODE_ENV !== "production";

// Pragmatic CSP: Next.js injects inline bootstrap scripts, so 'unsafe-inline'
// is required for scripts (no nonce pipeline). Fonts are self-hosted by
// next/font and remote images go through the /_next/image optimizer, so no
// third-party origins are needed besides the image host.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://i.postimg.cc",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "X-Frame-Options", value: "DENY" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Avoid broken webpack vendor-chunks for GSAP on the server bundle
  serverExternalPackages: ["gsap", "lenis"],
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: true },
      { source: "/resume", destination: "/en/resume", permanent: true },
      {
        source: "/curriculum-vitae",
        destination: "/es/curriculum-vitae",
        permanent: true,
      },
      // One canonical resume URL per locale: /en/resume and
      // /es/curriculum-vitae. The other spelling redirects permanently.
      {
        source: "/en/curriculum-vitae",
        destination: "/en/resume",
        permanent: true,
      },
      {
        source: "/es/resume",
        destination: "/es/curriculum-vitae",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
