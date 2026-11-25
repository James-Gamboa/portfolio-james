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
