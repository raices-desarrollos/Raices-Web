/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/Raices-Web' : '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  ...(basePath && { basePath, assetPrefix: basePath }),
};

export default nextConfig;
