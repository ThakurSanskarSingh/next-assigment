import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'BlogPlatform - Modern Next.js Blog',
    template: '%s | BlogPlatform'
  },
  description: 'A modern blog platform built with Next.js, featuring server components, static generation, and modern web development practices.',
  keywords: ['blog', 'nextjs', 'react', 'typescript', 'web development'],
 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
