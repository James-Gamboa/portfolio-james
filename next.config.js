/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "test-strapi-2025-db88eb53771f.herokuapp.com",
        pathname: "/uploads/**",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: false,
}

module.exports = nextConfig;
