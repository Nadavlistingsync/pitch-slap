'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiClock, FiUser, FiTag } from 'react-icons/fi';

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

const posts: BlogPost[] = [
  {
    id: '1',
    title: '10 Common Pitch Deck Mistakes That Turn Off Investors',
    excerpt: 'Learn about the most common mistakes founders make in their pitch decks and how to avoid them to increase your chances of securing funding.',
    author: {
      name: 'Sarah Chen',
      avatar: '/team/sarah.jpg',
    },
    date: '2024-03-15',
    readTime: '5 min read',
    category: 'Pitch Deck Tips',
    image: '/blog/pitch-deck-mistakes.jpg',
  },
  {
    id: '2',
    title: 'The Ultimate Guide to Creating a Winning Pitch Deck',
    excerpt: 'A comprehensive guide that walks you through the process of creating a pitch deck that will impress investors and help you raise your next round.',
    author: {
      name: 'Michael Rodriguez',
      avatar: '/team/michael.jpg',
    },
    date: '2024-03-10',
    readTime: '8 min read',
    category: 'Guides',
    image: '/blog/winning-pitch-deck.jpg',
  },
  {
    id: '3',
    title: 'How to Present Your Pitch Deck Like a Pro',
    excerpt: 'Master the art of presenting your pitch deck with these proven techniques and tips from successful founders and investors.',
    author: {
      name: 'Emily Thompson',
      avatar: '/team/emily.jpg',
    },
    date: '2024-03-05',
    readTime: '6 min read',
    category: 'Presentation Skills',
    image: '/blog/present-like-pro.jpg',
  },
  {
    id: '4',
    title: 'The Psychology of Investor Decision Making',
    excerpt: 'Understand how investors think and make decisions, and learn how to tailor your pitch deck to appeal to their psychology.',
    author: {
      name: 'David Kim',
      avatar: '/team/david.jpg',
    },
    date: '2024-02-28',
    readTime: '7 min read',
    category: 'Investor Insights',
    image: '/blog/investor-psychology.jpg',
  },
];

const categories = [
  'All',
  'Pitch Deck Tips',
  'Guides',
  'Presentation Skills',
  'Investor Insights',
  'Success Stories',
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-gray-400"
          >
            Insights, tips, and guides to help you create better pitch decks
          </motion.p>
        </div>

        {/* Search and Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg bg-white/5 border border-gray-700 px-4 py-2 pl-10 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-pink-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
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
            </motion.article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-24 rounded-2xl bg-white/5 backdrop-blur-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold">Subscribe to Our Newsletter</h2>
          <p className="mt-2 text-gray-400">
            Get the latest pitch deck tips and insights delivered to your inbox
          </p>
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg bg-white/10 border border-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
              />
              <button className="px-6 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 