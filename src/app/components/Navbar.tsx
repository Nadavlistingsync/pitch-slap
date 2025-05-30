'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useToast } from './ToastContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { showToast } = useToast();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Add logout logic here
    showToast('Successfully logged out', 'success');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              PitchDeck
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/feedback" className="text-gray-300 hover:text-white transition-colors" onClick={() => console.log('Clicked Feedback link')}>
              Feedback
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors" onClick={() => console.log('Clicked Pricing link')}>
              Pricing
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors" onClick={() => console.log('Clicked About link')}>
              About
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-white transition-colors" onClick={() => console.log('Clicked Blog link')}>
              Blog
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors" onClick={() => console.log('Clicked Contact link')}>
              Contact
            </Link>
            <Link href="/ego-dump" className="text-gray-300 hover:text-white transition-colors" onClick={() => console.log('Clicked Ego Dump link')}>
              Ego Dump
            </Link>
          </div>

          {/* Profile Button */}
          <div className="hidden md:block relative">
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <FiUser className="w-5 h-5" />
              <span>Profile</span>
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-1"
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center space-x-2"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/feedback"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={() => console.log('Clicked Feedback link (mobile)')}
              >
                Feedback
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={() => console.log('Clicked Pricing link (mobile)')}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={() => console.log('Clicked About link (mobile)')}
              >
                About
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={() => console.log('Clicked Blog link (mobile)')}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={() => console.log('Clicked Contact link (mobile)')}
              >
                Contact
              </Link>
              <Link
                href="/ego-dump"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={() => console.log('Clicked Ego Dump link (mobile)')}
              >
                Ego Dump
              </Link>
              <Link
                href="/profile"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={() => console.log('Clicked Profile link (mobile)')}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md flex items-center space-x-2"
              >
                <FiLogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 