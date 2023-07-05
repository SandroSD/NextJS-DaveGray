/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/SandroSD/Test-Blogposts-Davegray-Tutorial/main/images/**'
      }
    ]
  }
}

module.exports = nextConfig
