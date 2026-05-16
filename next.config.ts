import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ssl.pstatic.net" },
      { protocol: "https", hostname: "blogfiles.pstatic.net" },
      { protocol: "https", hostname: "postfiles.pstatic.net" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/info/blog",
        destination: "/info/recommended-guides",
        permanent: true,
      },
      {
        source: "/cal/cal/calculator",
        destination: "/cal/calculator",
        permanent: true,
      },
      {
        source: "/cal/cal/fire",
        destination: "/cal/fire",
        permanent: true,
      },
      {
        source: "/cal/cal/capital-gains",
        destination: "/cal/capital-gains",
        permanent: true,
      },
      {
        source: "/cal/cal/retirement-tax",
        destination: "/cal/retirement-tax",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;