/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'genuine-presence-df48c40f5e.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
