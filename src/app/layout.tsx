import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pitch Slap - Transform Your Pitch Deck with AI',
  description: 'Upload your pitch deck and let our AI-powered platform enhance your presentation with professional design suggestions and custom branding options.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 