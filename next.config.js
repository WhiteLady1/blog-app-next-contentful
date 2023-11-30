/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  images: {
    domains: ['images.ctfassets.net'],
  },
};

module.exports = withNextIntl(nextConfig);
