import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/assets/**',
        search: '',
      },
    ],
    remotePatterns:[
      {
        hostname: 'utfs.io',
        pathname: '/f/**',
        search: '',
      },
    ]
  },
};

export default nextConfig;
