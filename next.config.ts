import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  reactCompiler: true,
  allowedDevOrigins: ["192.168.1.236", "http://localhost:3000"],
};

export default nextConfig;
