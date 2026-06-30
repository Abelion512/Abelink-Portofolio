import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.75"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "7000",
      },
      {
        protocol: "http",
        hostname: "192.168.1.75",
        port: "7000",
      },
    ],
    unoptimized: true,
  },

  experimental: {
    // Cache Server Component fetch during HMR — faster dev refreshes
    serverComponentsHmrCache: true,
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
