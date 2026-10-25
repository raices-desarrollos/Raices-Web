/** @type {import('next').NextConfig} */

// Única fuente de verdad para el basePath: NEXT_PUBLIC_BASE_PATH.
// En GitHub Pages el workflow define `/Raices-Web`. Sin la variable, el sitio
// se sirve desde la raíz (dominio propio o desarrollo local).
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Cada ruta se exporta como carpeta con index.html (/proyectos/ceibo-vidal/index.html):
  // es lo que un hosting estático como GitHub Pages resuelve sin configuración.
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath && { basePath, assetPrefix: basePath }),
};

export default nextConfig;
