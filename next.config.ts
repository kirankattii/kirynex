import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production-safe configuration for Next.js 16+ App Router
  
  // Security: Remove X-Powered-By header
  poweredByHeader: false,

  // Performance: Enable compression
  // Note: Vercel automatically handles compression, but this ensures it's enabled
  compress: true,

  // Optional: Remove console logs in production builds
  // Uncomment if you want to strip console.log/info/warn in production
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === "production" ? {
  //     exclude: ["error"],
  //   } : false,
  // },
};

export default nextConfig;
