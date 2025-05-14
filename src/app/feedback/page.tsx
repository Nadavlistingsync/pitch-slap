'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeedbackPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    // Simulate getting feedback messages
    const feedbackMessages = [
      "Your market size slide is way too optimistic. No way you're capturing 10% of a $100B market in 3 years.",
      "Your unit economics don't make sense. How are you going to achieve 80% margins with that cost structure?",
      "The team slide is strong though. Good mix of technical and business experience.",
      "Your go-to-market strategy needs work. You can't just 'build it and they will come'.",
      "The competitive landscape slide is missing key players. Do your homework next time.",
    ];

    setMessages(feedbackMessages);

    // Simulate message delivery
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev >= feedbackMessages.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Mobile-like Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-t-2xl shadow-lg p-4 mb-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-10 h-10 bg-[#ff4154]/10 rounded-full flex items-center justify-center"
              >
                <span className="text-lg font-bold text-[#ff4154]">VC</span>
              </motion.div>
              <div>
                <h2 className="font-semibold text-gray-900">VC Feedback</h2>
                <p className="text-sm text-gray-500">Typing...</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Messages Container */}
          <div className="bg-white rounded-b-2xl shadow-lg p-4 min-h-[400px] relative overflow-hidden">
            <AnimatePresence mode="popLayout">
              {messages.slice(0, currentMessageIndex + 1).map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="mb-4"
                >
                  <div className="flex items-start gap-3">
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 bg-[#ff4154]/10 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <span className="text-sm font-bold text-[#ff4154]">VC</span>
                    </motion.div>
                    <div className="bg-gray-100 rounded-2xl p-4 max-w-[80%]">
                      <p className="text-gray-800">{message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {currentMessageIndex < messages.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-3 mt-4"
              >
                <div className="w-8 h-8 bg-[#ff4154]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-[#ff4154]">VC</span>
                </div>
                <div className="bg-gray-100 rounded-2xl p-4">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Floating Elements */}
            <div className="absolute top-1/4 left-10 w-24 h-24 bg-[#ff4154]/10 rounded-full blur-2xl animate-float" />
            <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[#a78bfa]/10 rounded-full blur-2xl animate-float-delayed" />
          </div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex justify-end gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Start Over
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/select')}
              className="px-6 py-3 bg-[#ff4154] text-white rounded-full font-medium hover:bg-[#ff6b6b] transition-colors group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Another Review
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff4154] to-[#ff6b6b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 