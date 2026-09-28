/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Domain change ke baad trailing slash ya routing issues ko resolve karne ke liye
  trailingSlash: false,
};

module.exports = nextConfig;