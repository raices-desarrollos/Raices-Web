import { Fraunces, Montserrat } from 'next/font/google';
import './globals.css';
import './cinematic.css';
import { BASE, SITE_URL, brand, project } from './content/site';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollEffects from './components/ScrollEffects';

// Titulares editoriales. El wordmark del logo sigue siendo Montserrat y no se reemplaza.
const display = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-fraunces',
});

const body = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-montserrat',
});

const defaultTitle = `${brand.name} · ${brand.claim.replace(/\.$/, '')}`;
const description = `${brand.name} desarrolla edificios con verde integrado desde el proyecto e identidad propia en Buenos Aires. Primer proyecto: ${project.name}, ${project.address}, ${project.neighborhood}, ${project.city}.`;

export const metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: defaultTitle,
    template: `%s · ${brand.name}`,
  },
  description,
  applicationName: brand.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: '/',
    siteName: brand.name,
    title: defaultTitle,
    description,
    images: [{ url: brand.ogImage, width: 1200, height: 630, alt: `Logo de ${brand.name}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description,
    images: [brand.ogImage],
  },
  icons: {
    icon: [
      { url: `${BASE}/favicon.ico`, sizes: 'any' },
      { url: `${BASE}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: `${BASE}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' }],
    shortcut: `${BASE}/favicon.ico`,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#0A0D0B',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;try{var seen=sessionStorage.getItem('raices-intro-seen');var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;d.dataset.intro=(seen||rm)?'seen':'playing';}catch(e){d.dataset.intro='seen';}})();",
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
        <ScrollEffects />
      </body>
    </html>
  );
}
