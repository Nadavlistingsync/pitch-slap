import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
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
      <body className={`${inter.variable} font-sans`}>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
} 