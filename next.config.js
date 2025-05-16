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
    serverActions: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/api/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-cache, no-store, must-revalidate',
        },
      ],
    },
  ],
  webpack: (config, { isServer }) => {
    // Exclude tools directory from build
    config.module.rules.push({
      test: /\.ts$/,
      include: /tools/,
      use: 'ignore-loader',
    });
    return config;
  },
}

module.exports = nextConfig 