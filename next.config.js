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
  webpack: (config, { isServer }) => {
    // Handle PDF files
    config.module.rules.push({
      test: /\.pdf$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/pdfs/[name][ext]'
      }
    });

    // Exclude test files and test data
    config.module.rules.push({
      test: /\.(test|spec)\.(js|jsx|ts|tsx)$/,
      loader: 'ignore-loader',
    });

    // Exclude test data directory
    config.module.rules.push({
      test: /test\/data\/.*\.pdf$/,
      loader: 'ignore-loader',
    });

    // Ignore test files during build
    config.module.rules.push({
      test: /\.(test|spec)\.(js|jsx|ts|tsx)$/,
      use: 'ignore-loader',
    });

    // Add fallback for missing files
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    // Ignore test files during build
    config.module.rules.push({
      test: /test\/data\/.*$/,
      loader: 'ignore-loader',
    });

    return config;
  },
};

module.exports = nextConfig; 