import localFont from 'next/font/local';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { BASE, SITE_URL, brand, project } from './content/site';

// M PLUS U (display) no está en el catálogo de next/font/google todavía, así que
// se sirve local desde app/fonts (variable, latin, 300–500). Montserrat sí va por Google.
const display = localFont({
  src: './fonts/m-plus-u-latin.woff2',
  weight: '300 500',
  style: 'normal',
  display: 'swap',
  variable: '--font-mplus',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
});

const body = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-montserrat',
});

const title = `${brand.name} · ${brand.claim.replace(/\.$/, '')}`;
const description = `${brand.name} desarrolla edificios con verde integrado desde el proyecto e identidad propia. Primer proyecto: ${project.name}, ${project.address}, ${project.neighborhood}, ${project.city}. Unidades de 1, 2 y 3 ambientes, entrega prevista para ${project.deliveryYear}.`;

export const metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title,
  description,
  applicationName: brand.name,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: `${SITE_URL}/`,
    siteName: brand.name,
    title,
    description,
    images: [{ url: brand.ogImage, width: 1200, height: 630, alt: `Logo de ${brand.name}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [brand.ogImage],
  },
  icons: {
    icon: [
      { url: `${BASE}/assets/brand/favicon-32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${BASE}/assets/brand/favicon-192.png`, sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: `${BASE}/assets/brand/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' }],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#21201E',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
