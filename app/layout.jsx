import './globals.css';

export const metadata = {
  title: 'Raíces Desarrolladores | Desarrollo inmobiliario con naturaleza urbana',
  description:
    'Raíces Desarrolladores crea edificios que expanden naturaleza a través de la ciudad. Primer proyecto: Ceibo Vidal, Vidal 3849.',
  icons: {
    icon: [{ url: '/assets/favicon-rounded.svg', type: 'image/svg+xml' }],
    apple: '/assets/images/raices_logo.png?v=2',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200;300;400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
