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
  webpack: (config, { isServer, dev }) => {
    // Exclude test files and tools directory from build
    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      include: [
        /test/,
        /tools/,
        /scripts/,
      ],
      use: 'ignore-loader',
    });

    // Add environment variable to indicate build environment
    config.plugins.push(
      new config.webpack.DefinePlugin({
        'process.env.NEXT_PHASE': JSON.stringify(process.env.NEXT_PHASE),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      })
    );

    return config;
  },
}

module.exports = nextConfig 