/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co'],
    unoptimized: true,
  },
  // Enable hybrid rendering
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig; 