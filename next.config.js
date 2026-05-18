/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avoid broken webpack vendor-chunks for GSAP on the server bundle
  serverExternalPackages: ["gsap", "lenis"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.polkacr.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        port: "",
        pathname: "/**",
      },
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
