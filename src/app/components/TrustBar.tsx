'use client';

import Image from 'next/image';

const trustItems = [
  {
    title: '500+',
    description: 'Pitch Decks Roasted',
    icon: '🔥'
  },
  {
    title: '50+',
    description: 'Active VCs',
    icon: '👨‍💼'
  },
  {
    title: '95%',
    description: 'Founder Satisfaction',
    icon: '😊'
  },
  {
    title: '24h',
    description: 'Average Response Time',
    icon: '⚡'
  }
];

const logos = [
  {
    name: 'Y Combinator',
    logo: 'https://via.placeholder.com/120x40?text=YC'
  },
  {
    name: 'TechCrunch',
    logo: 'https://via.placeholder.com/120x40?text=TC'
  },
  {
    name: 'Product Hunt',
    logo: 'https://via.placeholder.com/120x40?text=PH'
  },
  {
    name: 'AngelList',
    logo: 'https://via.placeholder.com/120x40?text=AL'
  }
];

export default function TrustBar() {
  return (
    <div className="w-full">
      {/* Trust Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {trustItems.map((item, index) => (
          <div
            key={item.title}
            className="text-center"
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <div className="text-3xl font-bold text-white mb-1">{item.title}</div>
            <div className="text-gray-400">{item.description}</div>
          </div>
        ))}
      </div>

      {/* Featured In */}
      <div className="text-center mb-8">
        <h3 className="text-xl text-gray-400 mb-6">
          Featured In
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {logos.map((logo, index) => (
            <div
              key={logo.name}
              className="relative h-10 w-32 grayscale hover:grayscale-0 transition-all"
            >
              <Image
                src={logo.logo}
                alt={logo.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-gray-300">SSL Secure</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-sm text-gray-300">Data Protected</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-sm text-gray-300">Trusted by VCs</span>
        </div>
      </div>
    </div>
  );
} 