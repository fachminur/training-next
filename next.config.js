/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },

  env: {
    GOOGLE_CLIENT_ID: '',
    GOOGLE_CLIENT_SECRET: '',
    GOOGLE_API_KEY: '',
    NEXTAUTH_SECRET: ' eeddddndnfnfnfnfnnfnffn',
    NEXTAUTH_URL: 'http://localhost:3000',
    BASE_URL: 'http://localhost:1215',
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'flowbite.com', 'localhost'],
  },
};

module.exports = nextConfig;
