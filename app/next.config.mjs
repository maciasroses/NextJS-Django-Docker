/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.brides.com",
      },
    ],
  },
};

export default nextConfig;
