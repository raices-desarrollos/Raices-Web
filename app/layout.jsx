import localFont from 'next/font/local';
import { Montserrat } from 'next/font/google';
import './globals.css';
import './cinematic.css';
import './project.css';
import { BASE, SITE_URL, brand, seo, ui } from '@/content/shared';
import LogoIntro from './components/LogoIntro';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollEffects from './components/ScrollEffects';

// Titulares editoriales: M PLUS U (fuente oficial de marca). Variable 300–500, archivo local
// porque `next/font/google` no la incluye en su catálogo. No tiene itálica: el énfasis es
// cambio de peso y de color, nunca cursiva. El wordmark del logo sigue siendo Montserrat.
const MPlusU = localFont({
  src: './fonts/m-plus-u-latin.woff2',
  weight: '300 500',
  style: 'normal',
  display: 'swap',
  variable: '--font-mplus',
});

const body = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: seo.defaultTitle,
    template: `%s · ${brand.name}`,
  },
  description: seo.description,
  applicationName: brand.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: seo.locale,
    url: '/',
    siteName: brand.name,
    title: seo.defaultTitle,
    description: seo.description,
    images: [{ url: brand.ogImage, width: 1200, height: 630, alt: seo.ogImageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.defaultTitle,
    description: seo.description,
    images: [brand.ogImage],
  },
  icons: {
    icon: [
      { url: `${BASE}/favicon.ico?v=6`, sizes: 'any' },
      { url: `${BASE}/favicon-32x32.png?v=6`, sizes: '32x32', type: 'image/png' },
      { url: `${BASE}/icon-192.png?v=6`, sizes: '192x192', type: 'image/png' },
      { url: `${BASE}/icon-512.png?v=6`, sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: `${BASE}/apple-touch-icon.png?v=6`, sizes: '180x180', type: 'image/png' }],
    shortcut: `${BASE}/favicon.ico?v=6`,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#101210',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

/*
 * Decide antes del primer pintado si la intro se muestra. Corre inline (sin esperar a
 * hidratar) para que no haya parpadeo ni bloqueo de scroll: `playing` solo si la sesión es
 * nueva, la carga es la de la Home y el usuario no pidió movimiento reducido. En cualquier
 * otra ruta queda `seen`, de modo que aterrizar directo en /contacto nunca bloquea la página.
 */
const introGate = `(function(){var d=document.documentElement;try{var b=${JSON.stringify(BASE)};var p=location.pathname.replace(/index\\.html$/,'').replace(/\\/+$/,'');var seen=sessionStorage.getItem('raices-intro-seen');var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;d.dataset.intro=(p===b&&!seen&&!rm)?'playing':'seen';}catch(e){d.dataset.intro='seen';}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${MPlusU.variable} ${body.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGate }} />
        {/* La intro usa el logo completo: se precarga para que no espere la descarga del PNG. */}
        <link rel="preload" as="image" href={brand.logos.full.src} fetchPriority="high" />
      </head>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#contenido">
          {ui.skipToContent}
        </a>
        <LogoIntro />
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
        <ScrollEffects />
      </body>
    </html>
  );
}
