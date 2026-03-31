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
};

export default nextConfig;
