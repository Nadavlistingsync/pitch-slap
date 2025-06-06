'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiUser, FiTag, FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi';

interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: string;
  image: string;
}

// Simulated author data
const authors: { [key: string]: Author } = {
  'sarah-chen': {
    slug: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Pitch Deck Expert',
    bio: 'Sarah is a seasoned pitch deck expert with over 10 years of experience helping startups raise funding. She has worked with hundreds of founders to create compelling pitch decks that have helped them secure millions in funding.',
    avatar: 'https://placehold.co/400x400',
    social: {
      twitter: 'https://twitter.com/sarahchen',
      linkedin: 'https://linkedin.com/in/sarahchen',
    },
    stats: {
      posts: 45,
      followers: 12000,
      following: 500,
    },
  },
  'michael-rodriguez': {
    slug: 'michael-rodriguez',
    name: 'Michael Rodriguez',
    role: 'Startup Advisor',
    bio: 'Michael is a startup advisor and former VC who has helped numerous startups refine their pitch decks and secure funding. He brings a unique perspective from both the founder and investor sides.',
    avatar: 'https://placehold.co/400x400',
    social: {
      twitter: 'https://twitter.com/michaelrodriguez',
      linkedin: 'https://linkedin.com/in/michaelrodriguez',
      github: 'https://github.com/michaelrodriguez',
    },
    stats: {
      posts: 32,
      followers: 8500,
      following: 300,
    },
  },
};

// Simulated blog posts data
const posts: BlogPost[] = [
  {
    id: '1',
    title: '10 Common Pitch Deck Mistakes That Turn Off Investors',
    excerpt: 'Learn about the most common mistakes founders make in their pitch decks and how to avoid them to increase your chances of securing funding.',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://placehold.co/400x400',
    },
    date: '2024-03-15',
    readTime: '5 min read',
    category: 'Pitch Deck Tips',
    image: 'https://placehold.co/800x600',
  },
  {
    id: '2',
    title: 'The Ultimate Guide to Creating a Winning Pitch Deck',
    excerpt: 'A comprehensive guide that walks you through the process of creating a pitch deck that will impress investors and help you raise your next round.',
    author: {
      name: 'Michael Rodriguez',
      avatar: 'https://placehold.co/400x400',
    },
    date: '2024-03-10',
    readTime: '8 min read',
    category: 'Guides',
    image: 'https://placehold.co/800x600',
  },
  {
    id: '3',
    title: 'How to Present Your Pitch Deck Like a Pro',
    excerpt: 'Master the art of presenting your pitch deck with these proven techniques and tips from successful founders and investors.',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://placehold.co/400x400',
    },
    date: '2024-03-05',
    readTime: '6 min read',
    category: 'Presentation Skills',
    image: 'https://placehold.co/800x600',
  },
  {
    id: '4',
    title: 'The Psychology of Investor Decision Making',
    excerpt: 'Understand how investors think and make decisions, and learn how to tailor your pitch deck to appeal to their psychology.',
    author: {
      name: 'Michael Rodriguez',
      avatar: 'https://placehold.co/400x400',
    },
    date: '2024-02-28',
    readTime: '7 min read',
    category: 'Investor Insights',
    image: 'https://placehold.co/800x600',
  },
];

export default function AuthorPage({ params }: { params: { slug: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const author = authors[params.slug];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Author not found</h1>
          <p className="mt-2 text-gray-400">
            The author you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/blog"
            className="mt-4 inline-block px-6 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const authorPosts = posts.filter((post) => post.author.name === author.name);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Author Profile */}
        <div className="text-center mb-16">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="rounded-full object-cover"
              unoptimized
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            {author.name}
          </h1>
          <p className="text-xl text-gray-400 mb-6">{author.role}</p>
          <p className="max-w-2xl mx-auto text-gray-400 mb-8">{author.bio}</p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {author.social.twitter && (
              <a
                href={author.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiTwitter className="w-6 h-6" />
              </a>
            )}
            {author.social.linkedin && (
              <a
                href={author.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiLinkedin className="w-6 h-6" />
              </a>
            )}
            {author.social.github && (
              <a
                href={author.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiGithub className="w-6 h-6" />
              </a>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{author.stats.posts}</div>
              <div className="text-sm text-gray-400">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{author.stats.followers}</div>
              <div className="text-sm text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{author.stats.following}</div>
              <div className="text-sm text-gray-400">Following</div>
            </div>
          </div>
        </div>

        {/* Author's Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Articles by {author.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authorPosts.map((post, index) => (
              <div
                key={post.id}
                className="rounded-2xl bg-white/5 backdrop-blur-lg overflow-hidden"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                      <FiTag className="w-4 h-4" />
                      <span>{post.category}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 hover:text-pink-500 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm text-gray-300">{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <FiClock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiUser className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 