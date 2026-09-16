import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spartanFont = localFont({
  src: '../../public/fonts/LeagueSpartan-VariableFont_wght.ttf',
  variable: '--font-spartan',
  display: 'swap',
});

const porceleinaFont = localFont({
  src: '../../public/fonts/porceleina_DEMO.otf',
  variable: '--font-porceleina',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FAF5FF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Palabras Que Suman | Dejá un mensaje. Llevate otro.',
  description:
    'Conectando mujeres líderes con niñas y jóvenes de todo el mundo mediante el intercambio de mensajes inspiradores y señaladores coleccionables digitales. Iniciativa de Fundación Género 360 y APEP Mujeres que Suman.',
  keywords: [
    'Palabras Que Suman',
    'Fundación Género 360',
    'APEP Mujeres que Suman',
    'Liderazgo Femenino',
    'Empoderamiento de Niñas',
    'Activación Comunitaria',
    'Educación STEM',
    'Niñas del Mundo',
  ],
  authors: [{ name: 'Fundación Género 360 & APEP' }],
  openGraph: {
    title: 'Palabras Que Suman | Dejá un mensaje. Llevate otro.',
    description:
      'Inspirá a una niña y llevate un señalador digital con palabras que transforman el mundo.',
    type: 'website',
    locale: 'es_PY',
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${sansFont.variable} ${spartanFont.variable} ${porceleinaFont.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FAF8F5] text-slate-800 selection:bg-rose-200 selection:text-rose-950 font-sans">
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
