import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import FeedbackBubble from './components/FeedbackBubble';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {children}
        <FeedbackBubble />
      </body>
    </html>
  );
} 