'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { useToast } from '../components/ToastContext';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add your form submission logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      showToast('Message sent successfully!', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      showToast('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-gray-400"
          >
            Have questions? We'd love to hear from you.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-white/5 backdrop-blur-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.subject}
                  onChange={handleChange}
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
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-lg bg-white/10 border border-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FiSend className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
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
          </motion.div>
        </div>
      </div>
    </div>
  );
} 