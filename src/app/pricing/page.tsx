import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - PitchDeck Roaster',
  description: 'Choose the perfect plan for your pitch deck roasting needs.',
};

interface PricingTier {
  name: string;
  price: string;
  features: string[];
  description: string;
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Basic Roast',
    price: '$99',
    description: 'Perfect for early-stage startups',
    features: [
      'One-time pitch deck review',
      'Basic feedback on key slides',
      '24-hour turnaround',
      'Email support',
    ],
  },
  {
    name: 'Professional Roast',
    price: '$299',
    description: 'For startups ready to raise',
    highlighted: true,
    features: [
      'Comprehensive pitch deck review',
      'Detailed feedback on all slides',
      '12-hour turnaround',
      'Priority support',
      'Follow-up consultation',
      'Investor-ready checklist',
    ],
  },
  {
    name: 'VC Package',
    price: '$999',
    description: 'For serious fundraising rounds',
    features: [
      'Full pitch deck transformation',
      'Multiple review iterations',
      '6-hour turnaround',
      '24/7 priority support',
      'VC introduction service',
      'Pitch practice session',
      'Custom investor deck template',
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-300">
            Choose the perfect plan for your pitch deck roasting needs
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-lg shadow-lg divide-y divide-gray-700 ${
                tier.highlighted
                  ? 'border-2 border-blue-500 bg-gray-800'
                  : 'bg-gray-900'
              }`}
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-white">{tier.name}</h2>
                <p className="mt-4 text-gray-300">{tier.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                </p>
                <button
                  className={`mt-8 block w-full bg-blue-500 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-600 ${
                    tier.highlighted ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  Get started
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-300 tracking-wide uppercase">
                  What&apos;s included
                </h3>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p className="text-gray-600">You won&apos;t be charged until you confirm your plan.</p>
      </div>
    </div>
  );
} 