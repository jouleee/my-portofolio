import type { Metadata } from 'next';
import { Space_Grotesk, Syne } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/portfolio/theme-provider';
import LenisProvider from '@/components/portfolio/lenis-provider';
import CustomCursor from '@/components/portfolio/custom-cursor';
import { Toaster } from 'sonner';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Joel | Portofolio',
  description: 'Personal portfolio of Joel - Lead Software Engineer & Full Stack Architect',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Joel | Portofolio',
    description: 'Personal portfolio of Joel - Lead Software Engineer & Full Stack Architect',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${syne.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full font-sans antialiased bg-background text-foreground selection:bg-sky-500/20 selection:text-sky-300">
        <ThemeProvider>
          <LenisProvider>
            <CustomCursor />
            {children}
            <Toaster position="bottom-right" richColors />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
