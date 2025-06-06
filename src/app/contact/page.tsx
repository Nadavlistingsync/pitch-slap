import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-lg p-8">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-lg bg-white/10 border border-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-lg bg-white/10 border border-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="mt-1 block w-full rounded-lg bg-white/10 border border-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-lg bg-white/10 border border-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="rounded-2xl bg-white/5 backdrop-blur-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FiMail className="w-6 h-6 text-pink-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium">Email</h3>
                    <p className="text-gray-400">contact@pitchdeck.com</p>
                    <p className="text-gray-400">support@pitchdeck.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FiPhone className="w-6 h-6 text-pink-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium">Phone</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                    <p className="text-gray-400">Mon-Fri, 9am-6pm PST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FiMapPin className="w-6 h-6 text-pink-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium">Office</h3>
                    <p className="text-gray-400">
                      123 Startup Street
                      <br />
                      San Francisco, CA 94107
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 backdrop-blur-lg p-8">
              <h2 className="text-2xl font-bold mb-6">FAQ</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">How quickly will I get a response?</h3>
                  <p className="text-gray-400">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Do you offer custom solutions?</h3>
                  <p className="text-gray-400">
                    Yes, we offer custom solutions for enterprise clients. Contact us to discuss your
                    specific needs.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Can I schedule a demo?</h3>
                  <p className="text-gray-400">
                    Absolutely! We'd be happy to show you how our platform works. Just let us know
                    your preferred time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 