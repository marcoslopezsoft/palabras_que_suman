import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display, Caveat } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serifFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const handwrittenFont = Caveat({
  subsets: ['latin'],
  variable: '--font-handwritten',
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
  description: 'Conectando mujeres líderes con niñas y jóvenes de Paraguay mediante el intercambio de mensajes inspiradores y señaladores coleccionables digitales. Iniciativa de Fundación Género 360 y APEP Mujeres que Suman.',
  keywords: [
    'Palabras Que Suman',
    'Fundación Género 360',
    'APEP Mujeres que Suman',
    'Liderazgo Femenino Paraguay',
    'Empoderamiento de Niñas',
    'Activación Comunitaria',
    'Educación STEM Paraguay',
  ],
  authors: [{ name: 'Fundación Género 360 & APEP' }],
  openGraph: {
    title: 'Palabras Que Suman | Dejá un mensaje. Llevate otro.',
    description: 'Inspirá a una niña y llevate un señalador digital con palabras que transforman el Paraguay.',
    type: 'website',
    locale: 'es_PY',
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
      className={`${sansFont.variable} ${serifFont.variable} ${handwrittenFont.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FAF8F5] text-slate-800 selection:bg-rose-200 selection:text-rose-950 font-sans">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
