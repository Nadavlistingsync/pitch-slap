'use client';

import { useRouter } from 'next/navigation';
import VCPrompts from './components/VCPrompts';
import { ArrowRight, Star, Zap } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center py-32 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_50%)]" />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="hero-heading mb-6">
            Get Brutally Honest<br />
            <span className="gradient-text">VC Feedback</span>
          </h1>
          <p className="hero-subheading mx-auto">
            Upload your pitch deck and get straight talk from real VCs. No sugar coating, just actionable insights to help you raise your next round.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => router.push('/select')}
              className="btn-primary group"
            >
              Get Roasted
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => router.push('/ego-dump')}
              className="btn-primary bg-gray-800 hover:bg-gray-700"
            >
              Ego Dump
              <Zap className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </section>

      {/* Features */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 gradient-text">
            Why Choose PitchDeck Roaster?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="w-8 h-8 text-indigo-500" />,
                title: "Expert VCs",
                description: "Get feedback from experienced investors who know what works"
              },
              {
                icon: <Zap className="w-8 h-8 text-purple-500" />,
                title: "Brutal Honesty",
                description: "No sugar coating - just straight talk to help you improve"
              },
              {
                icon: <ArrowRight className="w-8 h-8 text-pink-500" />,
                title: "Actionable Insights",
                description: "Practical feedback you can implement immediately"
              }
            ].map((feature, index) => (
              <div key={index} className="card hover-lift">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VCs Section */}
      <section className="py-20 px-4 relative border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 gradient-text">
            Top VCs in Paris & NYC
          </h2>
          <VCPrompts />
        </div>
      </section>

      {/* Floating Feedback + Share */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 items-end z-50">
        <button 
          onClick={() => router.push('/feedback')}
          className="glass px-4 py-2 rounded-full text-sm font-semibold shadow-soft hover-lift"
        >
          💬 Feedback
        </button>
        <button 
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'PitchDeck Roaster',
                text: 'Get brutally honest feedback on your pitch deck from real VCs!',
                url: window.location.href,
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }
          }}
          className="glass px-4 py-2 rounded-full text-sm font-semibold shadow-soft hover-lift"
        >
          🔗 Share
        </button>
      </div>
    </main>
  );
} 