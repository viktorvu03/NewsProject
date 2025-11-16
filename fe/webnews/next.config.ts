import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // cách đơn giản
    domains: ["images.unsplash.com"],

    // hoặc dùng remotePatterns (chi tiết hơn)
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "images.unsplash.com",
    //     port: "",
    //     pathname: "/**",
    //   },
    // ],
  },

  /* config options here */
};

export default nextConfig;
