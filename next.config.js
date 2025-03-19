/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        port: "",  
        pathname: "/**", 
      },
    ],
  },
};

module.exports = nextConfig;