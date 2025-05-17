/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const path = require('path');

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
    outputFileTracingExcludes: {
      '**/test/**': true,
      '**/tools/**': true,
      '**/scripts/**': true,
    },
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
      new webpack.DefinePlugin({
        'process.env.NEXT_PHASE': JSON.stringify(process.env.NEXT_PHASE),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      })
    );

    // Add a plugin to handle missing files
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /\.\/test\/data\/.*\.pdf$/,
        path.resolve(__dirname, 'src/lib/mock-pdf.js')
      )
    );

    // Add a rule to handle PDF files
    config.module.rules.push({
      test: /\.pdf$/,
      use: [
        {
          loader: 'ignore-loader',
        },
      ],
    });

    // Add a rule to handle test files
    config.module.rules.push({
      test: /test\/.*$/,
      use: [
        {
          loader: 'ignore-loader',
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig; 