/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/eliftech/image/upload/**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://eliftech-test-7b91po5g9-zaimak-andrii.vercel.app/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
