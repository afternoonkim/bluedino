import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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