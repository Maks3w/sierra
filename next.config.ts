import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'infocar.dgt.es',
                port: '',
                pathname: '/etraffic/data/camaras/**',
            },
            {
                protocol: 'https',
                hostname: 'infocar.dgt.es',
                port: '',
                pathname: '/etraffic/img/**',
            },
            {
                protocol: 'https',
                hostname: 'meteocercedilla.com',
                port: '',
                pathname: '/webcams/**',
            },
            {
                protocol: 'https',
                hostname: 'meteosierra.com',
                port: '',
                pathname: '/weewx/puerto/**',
            },
            {
                protocol: 'https',
                hostname: 'puertonavacerrada.com',
                port: '',
                pathname: '/webcam/**',
            },
            {
                protocol: 'https',
                hostname: 'valdesqui.es',
                port: '',
                pathname: '/~cam/**',
            },
          {
            protocol: 'https',
            hostname: 'www.ventamarcelino.com',
            port: '',
            pathname: '/meteo/**',
          },
        ],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/Navacerrada',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
