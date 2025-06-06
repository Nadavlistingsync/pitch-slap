import { Metadata } from 'next';
import Image from 'next/image';
import { FiUsers, FiAward, FiTrendingUp, FiHeart } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'About Us - PitchDeck',
  description: 'Learn about our mission to help startups create better pitch decks and secure funding faster.',
};

const stats = [
  {
    icon: FiUsers,
    value: '500+',
    label: 'Startups Helped',
  },
  {
    icon: FiAward,
    value: '95%',
    label: 'Success Rate',
  },
  {
    icon: FiTrendingUp,
    value: '$50M+',
    label: 'Funds Raised',
  },
  {
    icon: FiHeart,
    value: '100%',
    label: 'Founder Satisfaction',
  },
];

const team = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    image: 'https://placehold.co/400x400',
    bio: 'Former VC with 10+ years of experience in early-stage investments.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Head of Product',
    image: 'https://placehold.co/400x400',
    bio: 'Product leader with a passion for building tools that help startups succeed.',
  },
  {
    name: 'Emily Thompson',
    role: 'Lead VC Network',
    image: 'https://placehold.co/400x400',
    bio: 'Connects startups with the right investors and mentors.',
  },
  {
    name: 'David Kim',
    role: 'Head of Design',
    image: 'https://placehold.co/400x400',
    bio: 'Award-winning designer focused on creating beautiful pitch decks.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our Mission
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            We're on a mission to help startups create better pitch decks and secure funding faster.
            Our platform connects founders with experienced VCs who provide honest, actionable feedback.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center"
            >
              <stat.icon className="mx-auto h-8 w-8 text-pink-500" />
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="mt-4 text-gray-400">
                PitchDeck was born out of a simple observation: too many great startups were failing
                to secure funding because their pitch decks weren't effectively communicating their
                vision and potential.
              </p>
              <p className="mt-4 text-gray-400">
                Our founder, Sarah Chen, spent years as a VC seeing countless pitch decks that missed
                the mark. She realized that with the right feedback and guidance, these startups could
                significantly improve their chances of success.
              </p>
              <p className="mt-4 text-gray-400">
                Today, we're proud to have helped hundreds of startups refine their pitch decks and
                secure the funding they need to grow and succeed.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://placehold.co/800x600"
                alt="Our office"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center">Meet Our Team</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="text-center"
              >
                <div className="relative h-48 w-48 mx-auto rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
                <p className="text-pink-500">{member.role}</p>
                <p className="mt-2 text-sm text-gray-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center">Our Values</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg bg-white/5 backdrop-blur-lg p-6">
              <h3 className="text-xl font-semibold">Honesty</h3>
              <p className="mt-2 text-gray-400">
                We believe in providing honest, direct feedback that helps founders improve their
                pitch decks and increase their chances of success.
              </p>
            </div>
            <div className="rounded-lg bg-white/5 backdrop-blur-lg p-6">
              <h3 className="text-xl font-semibold">Empathy</h3>
              <p className="mt-2 text-gray-400">
                We understand the challenges founders face and provide feedback with empathy and
                constructive guidance.
              </p>
            </div>
            <div className="rounded-lg bg-white/5 backdrop-blur-lg p-6">
              <h3 className="text-xl font-semibold">Excellence</h3>
              <p className="mt-2 text-gray-400">
                We're committed to excellence in everything we do, from the quality of our feedback
                to the tools we build.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 