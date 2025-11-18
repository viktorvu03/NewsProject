import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // cho phép các host ảnh bên ngoài mà app dùng (unsplash, placeholder, và backend CDN)
    domains: [
      "images.unsplash.com",
      "via.placeholder.com",
      "hiepkieim.inplay.vn",
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
