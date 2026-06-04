/** @type {import('next').NextConfig} */
const nextConfig = {
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
      }
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
      {
        source: "/resume",
        destination: "/en/resume",
        permanent: false,
      },
      {
        source: "/edit",
        destination: "/en/edit",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
