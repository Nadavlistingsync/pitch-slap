'use client';

import { useState, useEffect } from 'react';
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
  tags: string[];
}

// Simulated blog posts data
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
    tags: ['Pitch Deck', 'Investor Relations', 'Startup Funding', 'Presentation Skills'],
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
    tags: ['Pitch Deck', 'Guides', 'Startup Funding', 'Investor Relations'],
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
    tags: ['Presentation Skills', 'Pitch Deck', 'Public Speaking', 'Investor Relations'],
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
    tags: ['Investor Relations', 'Psychology', 'Pitch Deck', 'Startup Funding'],
  },
];

// Get all unique tags
const allTags = Array.from(
  new Set(posts.flatMap((post) => post.tags))
).sort();

export default function TagPage({ params }: { params: { slug: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const tag = decodeURIComponent(params.slug);
  const filteredPosts = posts.filter((post) => {
    const matchesTag = post.tags.includes(tag);
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

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
            #{tag}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-gray-400"
          >
            {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} tagged with "{tag}"
          </motion.p>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-white/5 border border-gray-700 px-4 py-2 pl-10 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        {/* Related Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-xl font-semibold mb-4">Related Tags</h2>
          <div className="flex flex-wrap gap-2">
            {allTags
              .filter((t) => t !== tag)
              .map((relatedTag) => (
                <Link
                  key={relatedTag}
                  href={`/blog/tag/${encodeURIComponent(relatedTag)}`}
                  className="px-4 py-2 rounded-full bg-white/5 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                >
                  #{relatedTag}
                </Link>
              ))}
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

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <h3 className="text-xl font-semibold text-white">No articles found</h3>
            <p className="mt-2 text-gray-400">
              Try adjusting your search or browse other tags
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
} 