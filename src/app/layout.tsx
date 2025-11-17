import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BuatProduct - Launch Your Product for Free',
  description: 'Launch your product, get discovered by early adopters, and grow your user base. Free forever, no hidden fees.',
  keywords: ['product launch', 'SaaS', 'startup', 'indie hackers', 'product hunt alternative', 'free launch'],
  authors: [{ name: 'BuatProduct' }],
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'BuatProduct - Launch Your Product for Free',
    description: 'Launch your product, get discovered by early adopters, and grow your user base',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuatProduct - Launch Your Product for Free',
    description: 'Launch your product, get discovered by early adopters, and grow your user base',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
