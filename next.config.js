/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['placehold.co'],
    unoptimized: true,
  },
};

module.exports = nextConfig; 