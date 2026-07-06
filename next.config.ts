import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://digitalizate-api:3031/api/:path*",
      },
    ];
  },
};

export default nextConfig;
