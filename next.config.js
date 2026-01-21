/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  // Keep an explicit (empty) turbopack config so Next.js doesn't error
  // when a project provides a custom webpack configuration.
  turbopack: {},
  webpack(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@styles': path.join(__dirname, 'src', 'styles'),
    };
    return config;
  },
};

module.exports = nextConfig;
