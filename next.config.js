/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",      // static export untuk GitHub Pages
  trailingSlash: true,
  images: { unoptimized: true },
}

module.exports = nextConfig
