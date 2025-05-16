import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Suspense } from 'react';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pitch-slap-nadavlistingsync-nadavlistingsyncs-projects.vercel.app'),
  title: 'PitchDeck Roaster - Get Brutally Honest VC Feedback',
  description: 'Upload your pitch deck and get brutally honest feedback from real VCs. No sugar coating, just straight talk to help you raise your next round.',
  keywords: 'pitch deck, VC feedback, startup funding, investor feedback, pitch deck review',
  openGraph: {
    title: 'PitchDeck Roaster - Get Brutally Honest VC Feedback',
    description: 'Upload your pitch deck and get brutally honest feedback from real VCs. No sugar coating, just straight talk to help you raise your next round.',
    type: 'website',
    locale: 'en_US',
    siteName: 'PitchDeck Roaster',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PitchDeck Roaster - Get Brutally Honest VC Feedback',
    description: 'Upload your pitch deck and get brutally honest feedback from real VCs. No sugar coating, just straight talk to help you raise your next round.',
  },
};

const logPerformance = () => {
  if (typeof window !== 'undefined') {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log(`Page Load Time: ${loadTime}ms`);
    
    const resources = window.performance.getEntriesByType('resource');
    resources.forEach(resource => {
      console.log(`${resource.name}: ${resource.duration}ms`);
    });
  }
};

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold gradient-text">
              PitchDeck Roaster
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/roast" className="nav-link">
                Get Roasted
              </Link>
              <Link href="/ego-dump" className="nav-link">
                Ego Dump
              </Link>
              <Link href="/feedback" className="nav-link">
                Feedback
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <Navbar />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff4154]" />
        </div>}>
          <main className="pt-16">
            {children}
          </main>
        </Suspense>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', ${logPerformance.toString()});
          `
        }} />
      </body>
    </html>
  );
} 