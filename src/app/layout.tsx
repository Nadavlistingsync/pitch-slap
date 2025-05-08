import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Pitch Slap - Get Roasted. Get Funded.',
  description: 'Upload your pitch deck and get brutally honest feedback from AI-powered VCs. Transform your pitch and increase your chances of getting funded.',
  openGraph: {
    title: 'Pitch Slap - Get Roasted. Get Funded.',
    description: 'Get brutally honest feedback on your pitch deck from AI-powered VCs.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pitch Slap - Get Roasted. Get Funded.',
    description: 'Get brutally honest feedback on your pitch deck from AI-powered VCs.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans antialiased bg-gray-50">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
} 