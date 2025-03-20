/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: process.env.NEXT_PUBLIC_STRAPI_API_URL?.includes('https') ? 'https' : 'http',
        hostname: process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('https://', '').replace('http://', '').split('/')[0] || 'localhost',
        port: '',
        pathname: '/uploads/**',
      }
    ],
  },
  // Optimizaciones para producción
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
