import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ssl.pstatic.net" },
    ],
  },
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
      {
        source: "/finance/cma/cma-계좌-단점은-뭐가-있을까-2",
        destination: "/finance/cma/cma-계좌-단점은-뭐가-있을까",
        permanent: true,
      },
      {
        source: "/finance/cma/cma-계좌-금리-높은-증권사는-어디일까-2",
        destination: "/finance/cma/cma-계좌-금리-높은-증권사는-어디일까",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;