/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "https://eki-market.web.app/assets/",
  },
};

module.exports = nextConfig;
