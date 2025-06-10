import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastProvider } from './components/ToastContext';
import { UIProvider } from '../lib/UIContext';
import ErrorBoundary from './components/ErrorBoundary';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pitch-slap-nadavlistingsync-nadavlistingsyncs-projects.vercel.app'),
  title: 'PitchDeck - Create Beautiful Presentations',
  description: 'Create, collaborate, and present beautiful pitch decks with ease.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#1a1a1a] text-white`}>
        <ErrorBoundary>
          <UIProvider>
            <ToastProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </ToastProvider>
          </UIProvider>
        </ErrorBoundary>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', ${logPerformance.toString()});
          `
        }} />
      </body>
    </html>
  );
} 