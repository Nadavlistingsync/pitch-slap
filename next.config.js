/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['pitch-slap-nadavlistingsync-nadavlistingsyncs-projects.vercel.app'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['framer-motion'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  }
};

module.exports = nextConfig; 