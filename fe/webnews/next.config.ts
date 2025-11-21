import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // cho phép các host ảnh bên ngoài mà app dùng (unsplash, placeholder, và backend CDN)
    domains: [
      "hiepkiem.inplay.vn",
      "images.unsplash.com",
      "cdn.24hmoney.vn",
      "dhtn.ttxvn.org.vn",
    ],

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
