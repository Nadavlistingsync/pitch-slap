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
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'static/pdfs/',
            publicPath: '/_next/static/pdfs/',
          },
        },
      ],
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

    return config;
  },
};

module.exports = nextConfig; 