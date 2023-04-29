/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /** ? CONFIGURACION NECESARIA PARA PODER AÑADIR IMAGENES DE OTRO DOMINIO QUE NO SEA EL DE NUESTRA APP */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/PokeAPI/sprites/master/sprites/pokemon/**',
      },
    ],
  }
}

module.exports = nextConfig
