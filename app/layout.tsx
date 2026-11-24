import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500'],
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400'],
});

export const metadata: Metadata = {
  title: 'Abir Ahosan Ratul — Aspiring Network Engineer',
  description: 'Portfolio of Abir Ahosan Ratul — CSE student and aspiring Network Engineer.',
  openGraph: {
    title: 'Abir Ahosan Ratul — Aspiring Network Engineer',
    description: 'Portfolio of Abir Ahosan Ratul — CSE student and aspiring Network Engineer.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="bg-bg-base text-ink-primary font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
