import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "d2gwgwt9a7yxle.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "andri-creative-developer.vercel.app",
      },
      {
        protocol: "https",
        hostname: "backend-ts-lemon.vercel.app",
      },
      {
        protocol: "http",
        hostname: "backend-ts-lemon.vercel.app",
      },
      {
        protocol: "https",
        hostname: "glints.com",
      },
      {
        protocol: "http",
        hostname: "www.shutterstock.com",
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
      {
        protocol: "https",
        hostname: "iad.microlink.io",
      },
    ],
  },
};

export default nextConfig;
