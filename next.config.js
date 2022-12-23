/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "https://eki-market.web.app",
  },
};

module.exports = nextConfig;
