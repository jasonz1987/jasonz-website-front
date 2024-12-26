/** @type {import('next').NextConfig} */

const nextConfig = {
    async rewrites() {
        return [
            // {
            //     source: '/api/:path*',
            //     destination: 'https://backend.jason-z.com/api/:path*',
            //     basePath: false
            // },
        ]
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
                    { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
                ],
            },
        ]
    },
}

module.exports = nextConfig
