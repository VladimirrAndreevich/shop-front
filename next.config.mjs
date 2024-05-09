/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
    ],
  },
  env: {
    API_URL_IMAGES: process.env.REACT_APP_API_URL_IMAGES,
    API_URL_BACKEND: process.env.REACT_APP_API_URL,
  },
};

module.exports = nextConfig;
