/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV !== "production" ? undefined : "export", 
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
