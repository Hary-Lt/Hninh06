/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Giữ lại bùa hộ mệnh này
  },
  images: {
    unoptimized: true, // Giữ lại dòng này để ảnh load mượt
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc", // Cấp quyền cho ảnh của Đại ca
      },
    ],
  },
};

export default nextConfig;
