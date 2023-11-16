/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["http://localhost:3000"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
