import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["backend-ts-lemon.vercel.app", "localhost"],
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
      {
        protocol: "https",
        hostname: "www.dropbox.com",
      },
      {
        protocol: "https",
        hostname: "dl.dropboxusercontent.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
