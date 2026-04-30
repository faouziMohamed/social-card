import type { NextConfig } from "next";

const CORS_HEADERS = [
  { key: "Access-Control-Allow-Origin", value: "*" },
  { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS" },
  { key: "Access-Control-Allow-Headers", value: "Content-Type" },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: "/api/og/:path*",
        headers: CORS_HEADERS,
      },
    ];
  },
};

export default nextConfig;
