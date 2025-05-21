'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { useToast } from '../components/ToastContext';

const plans = [
  {
    name: 'Starter',
    price: 49,
    description: 'Perfect for early-stage startups',
    features: [
      '1 Pitch Deck Review',
      'Basic Feedback',
      '24h Response Time',
      'Email Support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: 149,
    description: 'For startups ready to scale',
    features: [
      '3 Pitch Deck Reviews',
      'Detailed Feedback',
      '12h Response Time',
      'Priority Support',
      'VC Network Access',
      'Pitch Deck Templates',
    ],
    cta: 'Get Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 499,
    description: 'For established companies',
    features: [
      '10 Pitch Deck Reviews',
      'Premium Feedback',
      '4h Response Time',
      '24/7 Support',
      'VC Network Access',
      'Pitch Deck Templates',
      '1-on-1 Consultation',
      'Custom Branding',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const { showToast } = useToast();

  const handlePlanSelect = (plan: string) => {
    showToast(`Selected ${plan} plan`, 'success');
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
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-gray-400"
          >
            Choose the perfect plan for your startup
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex items-center justify-center space-x-4"
          >
            <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual
              <span className="ml-2 text-xs text-pink-500">Save 20%</span>
            </span>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative rounded-2xl bg-white/5 backdrop-blur-lg p-8 ${
                plan.popular ? 'ring-2 ring-pink-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex rounded-full bg-pink-500 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-400">{plan.description}</p>
                <p className="mt-4">
                  <span className="text-4xl font-bold">
                    ${isAnnual ? plan.price * 0.8 : plan.price}
                  </span>
                  <span className="text-gray-400">/month</span>
                </p>
                {isAnnual && (
                  <p className="mt-1 text-sm text-gray-400">
                    Billed annually (${plan.price * 0.8 * 12})
                  </p>
                )}
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <FiCheck className="h-5 w-5 text-pink-500" />
                    <span className="ml-3 text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanSelect(plan.name)}
                className={`mt-8 w-full rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-pink-500 text-white hover:bg-pink-600'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="rounded-lg bg-white/5 backdrop-blur-lg p-6">
              <h3 className="text-lg font-semibold">What's included in a pitch deck review?</h3>
              <p className="mt-2 text-gray-400">
                Each review includes detailed feedback on your pitch deck's structure, content, design,
                and overall effectiveness. You'll receive actionable suggestions to improve your
                chances of securing funding.
              </p>
            </div>
            <div className="rounded-lg bg-white/5 backdrop-blur-lg p-6">
              <h3 className="text-lg font-semibold">How long does it take to get feedback?</h3>
              <p className="mt-2 text-gray-400">
                Response times vary by plan. Starter plans receive feedback within 24 hours, Pro plans
                within 12 hours, and Enterprise plans within 4 hours.
              </p>
            </div>
            <div className="rounded-lg bg-white/5 backdrop-blur-lg p-6">
              <h3 className="text-lg font-semibold">Can I upgrade or downgrade my plan?</h3>
              <p className="mt-2 text-gray-400">
                Yes, you can change your plan at any time. When upgrading, you'll be prorated for the
                remaining time. When downgrading, the new rate will apply at the start of your next
                billing cycle.
              </p>
            </div>
            <div className="rounded-lg bg-white/5 backdrop-blur-lg p-6">
              <h3 className="text-lg font-semibold">What payment methods do you accept?</h3>
              <p className="mt-2 text-gray-400">
                We accept all major credit cards, PayPal, and bank transfers for annual plans. For
                Enterprise plans, we also offer custom payment terms.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 