'use client';

import Link from 'next/link';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const categories = [
  { name: 'All', href: '/blog' },
  { name: 'Pitch Deck Tips', href: '/blog/category/pitch-deck-tips' },
  { name: 'Guides', href: '/blog/category/guides' },
  { name: 'Presentation Skills', href: '/blog/category/presentation-skills' },
  { name: 'Investor Insights', href: '/blog/category/investor-insights' },
  { name: 'Success Stories', href: '/blog/category/success-stories' },
];

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#1a1a1a]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-white">
              PitchDeck
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            {/* Search and Mobile Menu */}
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-64 rounded-lg bg-white/5 border border-gray-700 px-4 py-2 pl-10 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-300 hover:text-white"
              >
                {isMobileMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/50 backdrop-blur-lg border-b border-gray-800">
            <div className="px-4 py-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full rounded-lg bg-white/5 border border-gray-700 px-4 py-2 pl-10 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <nav className="flex flex-col space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-lg border-t border-gray-800 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">About</h3>
              <p className="text-gray-400">
                PitchDeck helps founders create better pitch decks and connect with investors.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.slice(1).map((category) => (
                  <li key={category.name}>
                    <Link
                      href={category.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to get the latest pitch deck tips and insights.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-lg bg-white/5 border border-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
                />
                <button className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} PitchDeck. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 