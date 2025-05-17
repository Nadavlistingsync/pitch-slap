/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  // Ignore test files during build
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.optimization.splitChunks.maxSize = 30000;
    }
    
    // Ignore test files and PDFs
    config.module.rules.push({
      test: /\.(test|spec)\.(js|jsx|ts|tsx)$/,
      use: 'ignore-loader'
    });
    
    config.module.rules.push({
      test: /\.pdf$/,
      use: 'ignore-loader'
    });

    // Add fallback for fs module
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    return config;
  },
  // Disable static optimization for API routes
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse'],
  },
};

module.exports = nextConfig; 