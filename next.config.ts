import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'infocar.dgt.es',
                port: '',
                pathname: '/etraffic/data/camaras/**',
            },
            {
                protocol: 'https',
                hostname: 'meteocercedilla.com',
                port: '',
                pathname: '/webcams/**',
            },
        ],
    },
};

export default nextConfig;
