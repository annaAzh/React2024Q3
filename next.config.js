import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')],
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
