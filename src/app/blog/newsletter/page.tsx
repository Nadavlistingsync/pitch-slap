import { FiMail } from 'react-icons/fi';

const newsletterOptions = [
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

        {/* Subscription Form */}
        <form className="mt-12 space-y-8" action="#" method="POST">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="mt-2 relative">
              <input
                type="email"
                id="email"
                name="email"
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
                  className="relative rounded-lg border p-4 bg-white/5 border-gray-700"
                >
                  <input
                    type="radio"
                    name="newsletter-type"
                    value={option.id}
                    defaultChecked={option.id === 'weekly'}
                    className="mr-2"
                  />
                  <span className="font-medium text-white">{option.title}</span>
                  <span className="ml-2 text-sm text-gray-400">{option.description}</span>
                  <span className="ml-2 inline-block text-xs text-gray-500">
                    Frequency: {option.frequency}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-pink-500 px-6 py-3 text-white font-medium hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Subscribe to Newsletter
          </button>

          {/* Privacy Notice */}
          <p className="text-center text-sm text-gray-500">
            By subscribing, you agree to our{' '}
            <a href="#" className="text-pink-500 hover:text-pink-400">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="#" className="text-pink-500 hover:text-pink-400">
              Terms of Service
            </a>
            . You can unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  );
} 