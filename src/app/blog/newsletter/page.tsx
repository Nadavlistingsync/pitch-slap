'use client';

import { useState } from 'react';
import { FiMail, FiCheck, FiAlertCircle } from 'react-icons/fi';

interface NewsletterOption {
  id: string;
  title: string;
  description: string;
  frequency: string;
}

const newsletterOptions: NewsletterOption[] = [
  {
    id: 'weekly',
    title: 'Weekly Digest',
    description: 'Get a curated selection of the best articles delivered to your inbox every week.',
    frequency: 'Weekly',
  },
  {
    id: 'monthly',
    title: 'Monthly Roundup',
    description: 'Stay updated with our monthly summary of the most important insights and trends.',
    frequency: 'Monthly',
  },
  {
    id: 'instant',
    title: 'Instant Updates',
    description: 'Be the first to know when we publish new articles and exclusive content.',
    frequency: 'As published',
  },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>('weekly');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Subscribe to Our Newsletter
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Stay updated with the latest insights, tips, and guides for creating winning pitch decks
          </p>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="mt-8 p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-3">
              <FiCheck className="w-6 h-6 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold text-green-500">Successfully Subscribed!</h3>
                <p className="mt-1 text-gray-400">
                  Thank you for subscribing to our newsletter. We'll keep you updated with the latest content.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Subscription Form */}
        {!isSuccess && (
          <form
            onSubmit={handleSubmit}
            className="mt-12 space-y-8"
          >
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="mt-2 relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg bg-white/5 border border-gray-700 px-4 py-2 pl-10 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
                  placeholder="you@example.com"
                />
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Newsletter Options */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">
                Choose Your Subscription Type
              </label>
              <div className="space-y-4">
                {newsletterOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`relative rounded-lg border p-4 cursor-pointer transition-colors ${
                      selectedOption === option.id
                        ? 'bg-pink-500/10 border-pink-500/20'
                        : 'bg-white/5 border-gray-700 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    <input
                      type="radio"
                      name="newsletter-type"
                      value={option.id}
                      checked={selectedOption === option.id}
                      onChange={() => setSelectedOption(option.id)}
                      className="sr-only"
                    />
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedOption === option.id
                              ? 'border-pink-500'
                              : 'border-gray-600'
                          }`}
                        >
                          {selectedOption === option.id && (
                            <div className="w-3 h-3 rounded-full bg-pink-500" />
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{option.title}</h3>
                        <p className="mt-1 text-sm text-gray-400">{option.description}</p>
                        <span className="mt-2 inline-block text-xs text-gray-500">
                          Frequency: {option.frequency}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-center gap-3">
                  <FiAlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-red-500">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-pink-500 px-6 py-3 text-white font-medium hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Subscribing...</span>
                </div>
              ) : (
                'Subscribe to Newsletter'
              )}
            </button>

            {/* Privacy Notice */}
            <p className="text-center text-sm text-gray-500">
              By subscribing, you agree to our{' '}
              <a href="/privacy" className="text-pink-500 hover:text-pink-400">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/terms" className="text-pink-500 hover:text-pink-400">
                Terms of Service
              </a>
              . You can unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </div>
  );
} 