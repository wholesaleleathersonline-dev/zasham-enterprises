import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zbxrkbtynxklfhgboecg.supabase.co",
      },
    ],
  },
};

export default nextConfig;